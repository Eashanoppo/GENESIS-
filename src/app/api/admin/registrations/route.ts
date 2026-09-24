import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-guard";
import { getRegistrationsList } from "@/lib/registration/store";

export async function GET(request: NextRequest) {
  const isAuthorized = await verifyAdminSession();
  if (!isAuthorized) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || undefined;
  const participant_type = searchParams.get("participant_type") || undefined;
  const member_type = searchParams.get("member_type") || undefined;
  const payment_status = searchParams.get("payment_status") || undefined;
  const attendance_status = searchParams.get("attendance_status") || undefined;
  const package_selected = searchParams.get("package_selected") || undefined;

  const registrations = await getRegistrationsList({
    search,
    participant_type,
    member_type,
    payment_status,
    attendance_status,
    package_selected,
  });

  // Calculate statistics across all records
  const allRecords = await getRegistrationsList();
  const stats = {
    total: allRecords.length,
    guests: allRecords.filter((r) => r.participant_type === "guest").length,
    clubMembers: allRecords.filter((r) => r.participant_type === "club_member").length,
    generalMembers: allRecords.filter((r) => r.member_type === "general").length,
    boardMembers: allRecords.filter((r) => r.member_type === "board").length,
    exRotaractors: allRecords.filter((r) => r.member_type === "ex_rotaractor").length,
    pendingPayments: allRecords.filter((r) => r.payment_status === "pending").length,
    verifiedPayments: allRecords.filter((r) => r.payment_status === "verified").length,
    rejectedPayments: allRecords.filter((r) => r.payment_status === "rejected").length,
    attended: allRecords.filter((r) => r.attendance_status === "attended").length,
    optionalPackages: allRecords.filter((r) => r.package_selected).length,
    totalRevenue: allRecords.reduce((sum, r) => sum + (r.payment_status === "verified" ? r.total_amount : 0), 0),
  };

  return NextResponse.json({
    success: true,
    data: registrations,
    stats,
  });
}
