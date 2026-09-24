import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-guard";
import { getRegistrationById, updateRegistrationStatus } from "@/lib/registration/store";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuthorized = await verifyAdminSession();
  if (!isAuthorized) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const registration = await getRegistrationById(id);

  if (!registration) {
    return NextResponse.json({ success: false, error: "Registration not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: registration });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuthorized = await verifyAdminSession();
  if (!isAuthorized) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const updated = await updateRegistrationStatus(id, {
    payment_status: body.payment_status,
    attendance_status: body.attendance_status,
    payment_notes: body.payment_notes,
  });

  if (!updated) {
    return NextResponse.json({ success: false, error: "Registration not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: updated });
}
