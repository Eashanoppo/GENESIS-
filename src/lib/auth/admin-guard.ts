import { cookies } from "next/headers";
import crypto from "node:crypto";

const ADMIN_COOKIE_NAME = "genesis_admin_session";

function cleanEnv(val?: string | null): string {
  if (!val) return "";
  return val.replace(/^["']|["']$/g, "").trim();
}

/**
 * Return all configured admin IDs / Emails from server environment variables.
 * Never includes hardcoded values or client-exposed NEXT_PUBLIC variables.
 */
export function getConfiguredAdminIds(): string[] {
  const envSources = [
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_ID,
    process.env.ADMIN_USER,
    process.env.ID,
  ];

  const valid = new Set<string>();
  for (const raw of envSources) {
    if (!raw) continue;
    // Support comma-separated IDs
    const items = raw.split(",").map((s) => cleanEnv(s).toLowerCase()).filter(Boolean);
    for (const item of items) {
      valid.add(item);
    }
  }

  return Array.from(valid);
}

/**
 * Return all configured admin passwords from server environment variables.
 * Never includes hardcoded values or client-exposed NEXT_PUBLIC variables.
 */
export function getConfiguredAdminPasswords(): string[] {
  const envSources = [
    process.env.ADMIN_PASSWORD,
    process.env.ADMIN_PASS,
    process.env.PASS,
    process.env.PASSWORD,
  ];

  const valid = new Set<string>();
  for (const raw of envSources) {
    if (!raw) continue;
    const clean = cleanEnv(raw);
    if (clean) valid.add(clean);
  }

  return Array.from(valid);
}

/**
 * Constant-time string comparison using SHA-256 digests
 * to prevent timing side-channel attacks.
 */
export function timingSafeEqualStrings(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Derive a robust HMAC secret key on the server.
 */
function getSessionSigningSecret(): string {
  const rawSecret =
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    (process.env.ADMIN_PASSWORD ? `genesis_adm_${process.env.ADMIN_PASSWORD}` : "fallback_diu_genesis_auth_secret_key_2026");

  return crypto.createHash("sha256").update(rawSecret).digest("hex");
}

interface AdminSessionPayload {
  sub: string;
  iat: number;
  exp: number;
}

/**
 * Create a secure HMAC-SHA256 signed session token.
 * Contains only admin identifier, timestamp, and expiration.
 * The administrator password is NEVER included in this token!
 */
export function createAdminSessionToken(adminId: string): string {
  const nowSec = Math.floor(Date.now() / 1000);
  const maxAgeSec = 7 * 24 * 60 * 60; // 7 days

  const payload: AdminSessionPayload = {
    sub: cleanEnv(adminId).toLowerCase(),
    iat: nowSec,
    exp: nowSec + maxAgeSec,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const secret = getSessionSigningSecret();
  const signature = crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url");

  return `${payloadB64}.${signature}`;
}

/**
 * Verify a session token string cryptographically without throwing.
 */
export function verifyAdminTokenString(token?: string | null): boolean {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payloadB64, signature] = parts;
  if (!payloadB64 || !signature) return false;

  try {
    const secret = getSessionSigningSecret();
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payloadB64)
      .digest("base64url");

    const sigBuf = Buffer.from(signature, "utf-8");
    const expBuf = Buffer.from(expectedSignature, "utf-8");

    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return false;
    }

    const payloadJson = Buffer.from(payloadB64, "base64url").toString("utf-8");
    const payload: AdminSessionPayload = JSON.parse(payloadJson);

    if (!payload.sub || typeof payload.sub !== "string") return false;
    if (!payload.exp || typeof payload.exp !== "number") return false;

    const nowSec = Math.floor(Date.now() / 1000);
    // Token expired
    if (payload.exp < nowSec) {
      return false;
    }
    // Clock skew allowance: 60s
    if (payload.iat && payload.iat > nowSec + 60) {
      return false;
    }

    // Verify sub is currently an authorized admin if any are configured
    const validIds = getConfiguredAdminIds();
    if (validIds.length > 0 && !validIds.includes(payload.sub.toLowerCase())) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Verify the current request's admin session cookie in Server Components / Route Handlers.
 */
export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return verifyAdminTokenString(sessionToken);
  } catch {
    return false;
  }
}

export { ADMIN_COOKIE_NAME };
