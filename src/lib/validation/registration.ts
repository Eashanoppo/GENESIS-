import { z } from "zod";

// Phone number regex for Bangladesh (+8801... or 01...)
const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;

export const GuestRegistrationSchema = z.object({
  participant_type: z.literal("guest"),
  name: z.string().trim().min(2, "Full name must be at least 2 characters"),
  student_id: z.string().trim().min(3, "Please provide your valid Student ID"),
  department: z.string().trim().min(2, "Please enter your department name (e.g. Software Engineering, CSE, BBA)"),
  email: z.string().trim().email("Please enter a valid email address"),
  contact_number: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid Bangladesh mobile number (e.g., 01712345678)"),
  referral_source: z.string().min(1, "Please tell us how you heard about GENESIS"),
  referral_other: z.string().optional(),
  package_selected: z.boolean().default(false),
  payment_method: z.enum(["bkash", "bank"]).default("bkash"),
  transaction_id: z.string().trim().optional(),
}).refine(
  (data) => {
    if (data.referral_source === "Other") {
      return Boolean(data.referral_other && data.referral_other.trim().length > 0);
    }
    return true;
  },
  {
    message: "Please specify how you heard about the program",
    path: ["referral_other"],
  }
).refine(
  (data) => {
    // If optional package is selected, transaction ID is required
    if (data.package_selected) {
      return Boolean(data.transaction_id && data.transaction_id.trim().length >= 4);
    }
    return true;
  },
  {
    message: "Transaction ID is required when selecting the optional package",
    path: ["transaction_id"],
  }
);

export const GeneralMemberSchema = z.object({
  participant_type: z.literal("club_member"),
  member_type: z.literal("general"),
  name: z.string().trim().min(2, "Full name must be at least 2 characters"),
  student_id: z.string().trim().min(3, "Please provide your Student ID"),
  department: z.string().trim().optional(),
  email: z.string().trim().email("Please enter a valid email address"),
  contact_number: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid Bangladesh mobile number"),
  referral_source: z.string().default("Rotaract Club"),
  payment_method: z.literal("bkash").default("bkash"),
  transaction_id: z
    .string()
    .trim()
    .min(4, "Please provide the bKash transaction ID / reference"),
  package_selected: z.boolean().default(false),
});

export const BoardMemberSchema = z.object({
  participant_type: z.literal("club_member"),
  member_type: z.literal("board"),
  position: z.string().min(1, "Please select your board position"),
  position_custom: z.string().optional(),
  name: z.string().trim().min(2, "Full name must be at least 2 characters"),
  student_id: z.string().trim().min(3, "Please provide your Student ID"),
  department: z.string().trim().optional(),
  email: z.string().trim().email("Please enter a valid email address"),
  contact_number: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid Bangladesh mobile number"),
  referral_source: z.string().default("Rotaract Club"),
  payment_method: z.enum(["bkash", "bank"]),
  transaction_id: z
    .string()
    .trim()
    .min(4, "Transaction ID or bank reference number is required"),
  package_selected: z.boolean().default(false),
}).refine(
  (data) => {
    if (data.position === "Other") {
      return Boolean(data.position_custom && data.position_custom.trim().length > 0);
    }
    return true;
  },
  {
    message: "Please enter your executive position title",
    path: ["position_custom"],
  }
);

export const ExRotaractorSchema = z.object({
  participant_type: z.literal("club_member"),
  member_type: z.literal("ex_rotaractor"),
  name: z.string().trim().min(2, "Full name must be at least 2 characters"),
  student_id: z.string().trim().min(2, "Student / Past Member ID is required"),
  department: z.string().trim().optional(),
  email: z.string().trim().email("Please enter a valid email address"),
  contact_number: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid mobile number"),
  club_name: z.string().trim().min(2, "Please enter your Rotaract club name"),
  referral_source: z.string().default("Rotaract Alumni"),
  payment_method: z.enum(["bkash", "bank"]),
  transaction_id: z
    .string()
    .trim()
    .min(4, "Payment Transaction ID is required"),
  package_selected: z.boolean().default(false),
});

export const RegistrationPayloadSchema = z.discriminatedUnion("participant_type", [
  GuestRegistrationSchema,
  z.discriminatedUnion("member_type", [
    GeneralMemberSchema,
    BoardMemberSchema,
    ExRotaractorSchema,
  ]),
]);

export type ValidatedRegistrationPayload = z.infer<typeof RegistrationPayloadSchema>;
