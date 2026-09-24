import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
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

  // Map to structured Excel rows per PRD §53
  const rows = registrations.map((r) => ({
    "Registration ID": r.registration_id,
    "Registration Date": new Date(r.created_at).toLocaleString("en-GB"),
    Name: r.name,
    "Student ID": r.student_id,
    Department: r.department || "—",
    Email: r.email,
    "Contact Number": r.contact_number,
    "Participant Type": r.participant_type === "guest" ? "Guest" : "Club Member",
    "Member Type":
      r.member_type === "general"
        ? "General Member"
        : r.member_type === "board"
        ? "Board Member"
        : r.member_type === "ex_rotaractor"
        ? "Ex-Rotaractor"
        : "—",
    Position: r.position_custom || r.position || "—",
    "Club Name": r.club_name || "Rotaract Club of DIU",
    "Registration Fee (BDT)": r.registration_fee,
    "Optional Package": r.package_selected ? "Yes" : "No",
    "Package Amount (BDT)": r.package_fee,
    "Total Amount (BDT)": r.total_amount,
    "Payment Method": r.payment_method.toUpperCase(),
    "Transaction ID": r.transaction_id || "—",
    "Payment Status": r.payment_status.toUpperCase(),
    Attendance:
      r.attendance_status === "attended"
        ? "Attended"
        : r.attendance_status === "absent"
        ? "Absent"
        : "Not Marked",
    "Referral Source": r.referral_other ? `${r.referral_source} (${r.referral_other})` : r.referral_source,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

  // Auto-fit column widths
  const colWidths = Object.keys(rows[0] || {}).map((key) => ({
    wch: Math.max(key.length, 14),
  }));
  worksheet["!cols"] = colWidths;

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  const dateStr = new Date().toISOString().split("T")[0];
  const fileName = `GENESIS-Registrations-${dateStr}.xlsx`;

  return new NextResponse(excelBuffer, {
    status: 200,
    headers: {
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  });
}
