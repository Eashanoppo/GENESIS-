import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  getConfiguredAdminIds,
  getConfiguredAdminPasswords,
  timingSafeEqualStrings,
} from "@/lib/auth/admin-guard";

// In-memory rate limiting tracker for login attempts
interface RateLimitRecord {
  attempts: number;
  firstAttempt: number;
  lockedUntil: number;
}

const loginAttempts = new Map<string, RateLimitRecord>();

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS =
  process.env.NODE_ENV === "production" ? 15 * 60 * 1000 : 30 * 1000;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record) {
    return { allowed: true };
  }

  // Check if IP is currently locked out
  if (record.lockedUntil > now) {
    const retryAfter = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, retryAfterSeconds: retryAfter };
  }

  // If lockout window expired, reset record
  if (now - record.firstAttempt > LOCKOUT_WINDOW_MS) {
    loginAttempts.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

function recordFailedAttempt(ip: string) {
  const now = Date.now();
  const record = loginAttempts.get(ip) || {
    attempts: 0,
    firstAttempt: now,
    lockedUntil: 0,
  };

  record.attempts += 1;

  if (record.attempts >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_WINDOW_MS;
  }

  loginAttempts.set(ip, record);

  // Periodic cleanup of expired entries (cap map size to prevent unbounded memory growth)
  if (loginAttempts.size > 1000) {
    for (const [key, val] of loginAttempts.entries()) {
      if (val.lockedUntil < now && now - val.firstAttempt > LOCKOUT_WINDOW_MS) {
        loginAttempts.delete(key);
      }
    }
  }
}

function resetFailedAttempts(ip: string) {
  loginAttempts.delete(ip);
}

function clean(val?: string | null): string {
  if (!val) return "";
  return val.replace(/^["']|["']$/g, "").trim();
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);

  // 1. Rate Limiting Check
  const rateLimitStatus = checkRateLimit(clientIp);
  if (!rateLimitStatus.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `Too many failed login attempts. Please wait ${Math.ceil(
          (rateLimitStatus.retryAfterSeconds || 60) / 60
        )} minute(s) before trying again.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitStatus.retryAfterSeconds || 60),
        },
      }
    );
  }

  try {
    const body = await request.json();
    const inputId = clean(body.email || body.id || body.username).toLowerCase();
    const inputPassword = clean(body.password || body.pass);

    if (!inputId || !inputPassword) {
      return NextResponse.json(
        { success: false, error: "Please enter both Admin ID / Email and password." },
        { status: 400 }
      );
    }

    // 2. Load configured credentials strictly from server environment variables
    const validEmails = getConfiguredAdminIds();
    const validPasswords = getConfiguredAdminPasswords();

    if (validEmails.length === 0 || validPasswords.length === 0) {
      console.error(
        "[Admin Auth] Server configuration error: ADMIN_EMAIL or ADMIN_PASSWORD is missing in server environment."
      );
      return NextResponse.json(
        {
          success: false,
          error: "Admin credentials are not configured on the server. Please check environment variables.",
        },
        { status: 500 }
      );
    }

    // 3. Timing-safe verification against configured values
    const emailMatches = validEmails.some((email) => timingSafeEqualStrings(email, inputId));
    const passwordMatches = validPasswords.some((pass) => timingSafeEqualStrings(pass, inputPassword));

    if (!emailMatches || !passwordMatches) {
      recordFailedAttempt(clientIp);
      return NextResponse.json(
        { success: false, error: "Invalid admin ID or password. Please verify and try again." },
        { status: 401 }
      );
    }

    // 4. Successful login: reset rate limiter
    resetFailedAttempts(clientIp);

    // 5. Create secure session token (only contains id & timestamps; NEVER the password)
    const token = createAdminSessionToken(inputId);
    const isProduction = process.env.NODE_ENV === "production";
    const isLocalhost = request.url.startsWith("http://localhost") || request.url.startsWith("http://127.0.0.1");
    const isSecure = isProduction && !isLocalhost;

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "Authentication service error. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    expires: new Date(0),
    maxAge: 0,
    path: "/",
  });
  return response;
}
