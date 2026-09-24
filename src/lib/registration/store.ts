import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { Registration, RegistrationSubmissionInput, PaymentStatus, AttendanceStatus } from "@/types/registration";
import { calculateRegistrationFees } from "./fees";
import { formatRegistrationId, generateFallbackRegistrationId } from "./id-generator";

// In-memory fallback repository for local testing before Supabase env vars are provided
const localStore: Registration[] = [
  {
    id: "demo-1",
    registration_id: "GEN-2026-00001",
    participant_type: "guest",
    name: "Tanvir Ahmed",
    student_id: "221-15-4890",
    email: "tanvir.guest@diu.edu.bd",
    contact_number: "01711223344",
    referral_source: "Facebook",
    payment_method: "bkash",
    transaction_id: "BK8921KL90",
    registration_fee: 0,
    package_selected: true,
    package_fee: 100,
    total_amount: 100,
    payment_status: "verified",
    attendance_status: "attended",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-2",
    registration_id: "GEN-2026-00002",
    participant_type: "club_member",
    member_type: "board",
    position: "Vice President",
    name: "Nusrat Jahan",
    student_id: "213-35-7761",
    email: "nusrat.vp@diu.edu.bd",
    contact_number: "01822334455",
    referral_source: "Rotaract Club",
    payment_method: "bank",
    transaction_id: "PB-2188-TX01",
    registration_fee: 500,
    package_selected: false,
    package_fee: 0,
    total_amount: 500,
    payment_status: "pending",
    attendance_status: "not_marked",
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function checkDuplicateRegistration(studentId: string, email: string, transactionId?: string | null) {
  const normStudentId = studentId.trim().toLowerCase();
  const normEmail = email.trim().toLowerCase();
  const normTxId = transactionId ? transactionId.trim().toLowerCase() : null;

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    if (supabase) {
      const { data: byStudent } = await supabase
        .from("registrations")
        .select("id, registration_id")
        .ilike("student_id", normStudentId)
        .maybeSingle();

      if (byStudent) {
        return { isDuplicate: true, reason: `A registration already exists with Student ID: ${studentId}` };
      }

      if (normTxId) {
        const { data: byTx } = await supabase
          .from("registrations")
          .select("id, registration_id")
          .ilike("transaction_id", normTxId)
          .maybeSingle();

        if (byTx) {
          return { isDuplicate: true, reason: `Transaction ID ${transactionId} has already been registered.` };
        }
      }

      return { isDuplicate: false };
    }
  }

  // Local fallback check
  const duplicate = localStore.find(
    (r) =>
      r.student_id.toLowerCase() === normStudentId ||
      r.email.toLowerCase() === normEmail ||
      (normTxId && r.transaction_id && r.transaction_id.toLowerCase() === normTxId)
  );

  if (duplicate) {
    if (duplicate.student_id.toLowerCase() === normStudentId) {
      return { isDuplicate: true, reason: `A registration already exists for Student ID: ${studentId}` };
    }
    if (normTxId && duplicate.transaction_id?.toLowerCase() === normTxId) {
      return { isDuplicate: true, reason: `Transaction ID "${transactionId}" is already used.` };
    }
    return { isDuplicate: true, reason: `A registration with this email already exists.` };
  }

  return { isDuplicate: false };
}

export async function createRegistrationRecord(input: RegistrationSubmissionInput): Promise<Registration> {
  const feeDetails = calculateRegistrationFees({
    participantType: input.participant_type,
    memberType: input.member_type,
    position: input.position,
    packageSelected: input.package_selected,
  });

  const now = new Date().toISOString();

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    if (supabase) {
      // Determine sequence
      const { count } = await supabase.from("registrations").select("*", { count: "exact", head: true });
      const nextSequence = (count ?? 0) + 1;
      const registrationId = formatRegistrationId(nextSequence);

      const newRecord = {
        registration_id: registrationId,
        participant_type: input.participant_type,
        member_type: input.member_type || null,
        position: input.position || null,
        position_custom: input.position_custom || null,
        name: input.name.trim(),
        student_id: input.student_id.trim(),
        department: input.department?.trim() || null,
        email: input.email.trim().toLowerCase(),
        contact_number: input.contact_number.trim(),
        club_name: input.club_name?.trim() || null,
        referral_source: input.referral_source,
        referral_other: input.referral_other?.trim() || null,
        payment_method: input.payment_method,
        transaction_id: input.transaction_id?.trim() || null,
        registration_fee: feeDetails.registrationFee,
        package_selected: input.package_selected,
        package_fee: feeDetails.packageFee,
        total_amount: feeDetails.totalAmount,
        payment_status: feeDetails.totalAmount === 0 ? "verified" : "pending",
        attendance_status: "not_marked",
        created_at: now,
        updated_at: now,
      };

      const { data, error } = await supabase.from("registrations").insert(newRecord).select().single();

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return data as Registration;
    }
  }

  // In-memory fallback
  const nextSeq = localStore.length + 1;
  const regId = formatRegistrationId(nextSeq);

  const fallbackRecord: Registration = {
    id: `local-${Date.now()}`,
    registration_id: regId,
    participant_type: input.participant_type,
    member_type: input.member_type || null,
    position: input.position || null,
    position_custom: input.position_custom || null,
    name: input.name.trim(),
    student_id: input.student_id.trim(),
    department: input.department?.trim() || null,
    email: input.email.trim().toLowerCase(),
    contact_number: input.contact_number.trim(),
    club_name: input.club_name?.trim() || null,
    referral_source: input.referral_source,
    referral_other: input.referral_other?.trim() || null,
    payment_method: input.payment_method,
    transaction_id: input.transaction_id?.trim() || null,
    registration_fee: feeDetails.registrationFee,
    package_selected: input.package_selected,
    package_fee: feeDetails.packageFee,
    total_amount: feeDetails.totalAmount,
    payment_status: feeDetails.totalAmount === 0 ? "verified" : "pending",
    attendance_status: "not_marked",
    created_at: now,
    updated_at: now,
  };

  localStore.unshift(fallbackRecord);
  return fallbackRecord;
}

export async function getRegistrationsList(filters?: {
  search?: string;
  participant_type?: string;
  member_type?: string;
  payment_status?: string;
  attendance_status?: string;
  package_selected?: string;
}): Promise<Registration[]> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    if (supabase) {
      let query = supabase.from("registrations").select("*").order("created_at", { ascending: false });

      if (filters?.participant_type && filters.participant_type !== "all") {
        query = query.eq("participant_type", filters.participant_type);
      }
      if (filters?.member_type && filters.member_type !== "all") {
        query = query.eq("member_type", filters.member_type);
      }
      if (filters?.payment_status && filters.payment_status !== "all") {
        query = query.eq("payment_status", filters.payment_status);
      }
      if (filters?.attendance_status && filters.attendance_status !== "all") {
        query = query.eq("attendance_status", filters.attendance_status);
      }
      if (filters?.package_selected && filters.package_selected !== "all") {
        query = query.eq("package_selected", filters.package_selected === "true");
      }

      const { data, error } = await query;
      if (!error && data) {
        if (filters?.search) {
          const s = filters.search.toLowerCase();
          return (data as Registration[]).filter(
            (r) =>
              r.name.toLowerCase().includes(s) ||
              r.student_id.toLowerCase().includes(s) ||
              r.email.toLowerCase().includes(s) ||
              r.registration_id.toLowerCase().includes(s) ||
              (r.transaction_id && r.transaction_id.toLowerCase().includes(s))
          );
        }
        return data as Registration[];
      }
    }
  }

  // Local store filtering
  let result = [...localStore];

  if (filters?.participant_type && filters.participant_type !== "all") {
    result = result.filter((r) => r.participant_type === filters.participant_type);
  }
  if (filters?.member_type && filters.member_type !== "all") {
    result = result.filter((r) => r.member_type === filters.member_type);
  }
  if (filters?.payment_status && filters.payment_status !== "all") {
    result = result.filter((r) => r.payment_status === filters.payment_status);
  }
  if (filters?.attendance_status && filters.attendance_status !== "all") {
    result = result.filter((r) => r.attendance_status === filters.attendance_status);
  }
  if (filters?.package_selected && filters.package_selected !== "all") {
    const isPack = filters.package_selected === "true";
    result = result.filter((r) => r.package_selected === isPack);
  }
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(
      (r) =>
        r.name.toLowerCase().includes(s) ||
        r.student_id.toLowerCase().includes(s) ||
        r.email.toLowerCase().includes(s) ||
        r.registration_id.toLowerCase().includes(s) ||
        (r.transaction_id && r.transaction_id.toLowerCase().includes(s))
    );
  }

  return result;
}

export async function getRegistrationById(id: string): Promise<Registration | null> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    if (supabase) {
      const { data } = await supabase
        .from("registrations")
        .select("*")
        .or(`id.eq.${id},registration_id.eq.${id}`)
        .maybeSingle();

      if (data) return data as Registration;
    }
  }

  const found = localStore.find((r) => r.id === id || r.registration_id === id);
  return found || null;
}

export async function updateRegistrationStatus(
  id: string,
  updates: {
    payment_status?: PaymentStatus;
    attendance_status?: AttendanceStatus;
    payment_notes?: string;
  }
): Promise<Registration | null> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("registrations")
        .update({
          ...updates,
          updated_at: now,
        })
        .or(`id.eq.${id},registration_id.eq.${id}`)
        .select()
        .single();

      if (!error && data) return data as Registration;
    }
  }

  const idx = localStore.findIndex((r) => r.id === id || r.registration_id === id);
  if (idx !== -1) {
    localStore[idx] = {
      ...localStore[idx],
      ...updates,
      updated_at: now,
    };
    return localStore[idx];
  }

  return null;
}
