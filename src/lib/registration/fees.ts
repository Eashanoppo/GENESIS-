import { ParticipantType, MemberType } from "@/types/registration";

export interface FeeCalculationInput {
  participantType: ParticipantType;
  memberType?: MemberType | null;
  position?: string | null;
  packageSelected: boolean;
}

export interface FeeBreakdown {
  registrationFee: number;
  packageFee: number;
  totalAmount: number;
}

export function getBoardFee(position?: string | null): number {
  if (!position) return 300;

  const normalized = position.trim().toLowerCase();

  if (normalized.includes("ipp") || normalized.includes("immediate past")) {
    return Number(process.env.FEE_BOARD_IPP) || 1000;
  }
  if (normalized.includes("president") && !normalized.includes("vice")) {
    return Number(process.env.FEE_BOARD_PRESIDENT) || 500;
  }
  if (normalized.includes("vice president") || normalized.includes("vp")) {
    return Number(process.env.FEE_BOARD_VICE_PRESIDENT) || 500;
  }
  if (normalized.includes("joint secretary")) {
    return Number(process.env.FEE_BOARD_JOINT_SECRETARY) || 500;
  }
  if (normalized.includes("secretary")) {
    return Number(process.env.FEE_BOARD_SECRETARY) || 500;
  }
  if (normalized.includes("treasurer")) {
    return Number(process.env.FEE_BOARD_TREASURER) || 300;
  }
  if (normalized.includes("director")) {
    return Number(process.env.FEE_BOARD_DIRECTORS) || 300;
  }

  // Default / Other board position
  return Number(process.env.FEE_BOARD_OTHER) || 300;
}

export function calculateRegistrationFees(input: FeeCalculationInput): FeeBreakdown {
  const optionalPackageFee = input.packageSelected
    ? Number(process.env.FEE_OPTIONAL_PACKAGE) || 100
    : 0;

  let baseRegistrationFee = 0;

  if (input.participantType === "guest") {
    baseRegistrationFee = Number(process.env.FEE_GUEST) || 0;
  } else if (input.participantType === "club_member") {
    if (input.memberType === "general") {
      baseRegistrationFee = Number(process.env.FEE_GENERAL_MEMBER) || 100;
    } else if (input.memberType === "ex_rotaractor") {
      baseRegistrationFee = Number(process.env.FEE_EX_ROTARACTOR) || 1000;
    } else if (input.memberType === "board") {
      baseRegistrationFee = getBoardFee(input.position);
    }
  }

  return {
    registrationFee: baseRegistrationFee,
    packageFee: optionalPackageFee,
    totalAmount: baseRegistrationFee + optionalPackageFee,
  };
}
