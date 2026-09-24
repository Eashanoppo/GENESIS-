import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "genesis_admin_session";

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return false;
  }

  // Verify against session token (format: timestamp:email:signature)
  try {
    const [timestamp, email] = Buffer.from(sessionToken, "base64").toString("utf-8").split(":");
    if (!timestamp || !email) return false;

    // Check expiry (e.g. 7 days)
    const tokenTime = parseInt(timestamp, 10);
    const now = Date.now();
    if (isNaN(tokenTime) || now - tokenTime > 7 * 24 * 60 * 60 * 1000) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function createAdminSessionToken(email: string): string {
  const payload = `${Date.now()}:${email}:${process.env.ADMIN_PASSWORD || "genesis2026"}`;
  return Buffer.from(payload).toString("base64");
}

export { ADMIN_COOKIE_NAME };
