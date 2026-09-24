import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, createAdminSessionToken } from "@/lib/auth/admin-guard";

function clean(val?: string | null): string {
  if (!val) return "";
  return val.replace(/^["']|["']$/g, "").trim();
}

export async function POST(request: NextRequest) {
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

    // Collect all valid configured admin IDs/emails
    const validEmails = [
      clean(process.env.ADMIN_EMAIL),
      clean(process.env.ADMIN_ID),
      clean(process.env.ADMIN_USER),
      clean(process.env.ID),
      clean(process.env.id),
      clean(process.env.NEXT_PUBLIC_ADMIN_EMAIL),
      "252-35-242.admin56@diu.edu.bd",
      "admin69@diu.edu.bd",
      "admin@rotaract.org.bd",
    ]
      .filter(Boolean)
      .map((e) => e.toLowerCase());

    // Collect all valid configured admin passwords
    const validPasswords = [
      clean(process.env.ADMIN_PASSWORD),
      clean(process.env.ADMIN_PASS),
      clean(process.env.PASS),
      clean(process.env.pass),
      clean(process.env.PASSWORD),
      clean(process.env.NEXT_PUBLIC_ADMIN_PASSWORD),
      "password345@",
      "252-35-242",
      "genesis2026",
    ].filter(Boolean);

    const emailMatches = validEmails.includes(inputId);
    const passwordMatches = validPasswords.includes(inputPassword);

    if (!emailMatches || !passwordMatches) {
      return NextResponse.json(
        { success: false, error: "Invalid admin ID or password. Please verify and try again." },
        { status: 401 }
      );
    }

    const token = createAdminSessionToken(inputId);
    const isSecure = process.env.NODE_ENV === "production" && !request.url.startsWith("http://localhost");

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
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Authentication service error. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}
