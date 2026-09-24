export type ParticipantType = 'guest' | 'club_member';

export type MemberType = 'general' | 'board' | 'ex_rotaractor';

export type BoardPosition =
  | 'IPP'
  | 'President'
  | 'Vice President'
  | 'Secretary'
  | 'Joint Secretary'
  | 'Treasurer'
  | 'Directors'
  | 'Other';

export type PaymentMethod = 'bkash' | 'bank';

export type PaymentStatus = 'pending' | 'verified' | 'rejected';

export type AttendanceStatus = 'not_marked' | 'attended' | 'absent';

export interface Registration {
  id: string;
  registration_id: string;
  participant_type: ParticipantType;
  member_type?: MemberType | null;
  position?: string | null;
  position_custom?: string | null;
  name: string;
  student_id: string;
  department?: string | null;
  email: string;
  contact_number: string;
  club_name?: string | null;
  referral_source: string;
  referral_other?: string | null;
  payment_method: PaymentMethod;
  transaction_id?: string | null;
  registration_fee: number;
  package_selected: boolean;
  package_fee: number;
  total_amount: number;
  payment_status: PaymentStatus;
  payment_notes?: string | null;
  attendance_status: AttendanceStatus;
  verified_by?: string | null;
  verified_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface RegistrationSubmissionInput {
  participant_type: ParticipantType;
  member_type?: MemberType;
  position?: string;
  position_custom?: string;
  name: string;
  student_id: string;
  department?: string;
  email: string;
  contact_number: string;
  club_name?: string;
  referral_source: string;
  referral_other?: string;
  payment_method: PaymentMethod;
  transaction_id?: string;
  package_selected: boolean;
}

export interface RegistrationSuccessResponse {
  success: true;
  registration_id: string;
  name: string;
  participant_type: ParticipantType;
  member_type?: MemberType | null;
  position?: string | null;
  total_amount: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
}
