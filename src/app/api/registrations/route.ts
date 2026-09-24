import { NextRequest, NextResponse } from "next/server";
import { RegistrationPayloadSchema } from "@/lib/validation/registration";
import { checkDuplicateRegistration, createRegistrationRecord } from "@/lib/registration/store";
import { RegistrationSubmissionInput } from "@/types/registration";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Authoritative Server Validation with Zod
    const validationResult = RegistrationPayloadSchema.safeParse(body);

    if (!validationResult.success) {
      const issue = validationResult.error.issues[0];
      return NextResponse.json(
        {
          success: false,
          error: issue?.message || "Invalid registration submission",
          path: issue?.path.join("."),
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data as RegistrationSubmissionInput;

    // 2. Duplicate Registration Guard
    const duplicateCheck = await checkDuplicateRegistration(
      validData.student_id,
      validData.email,
      validData.transaction_id
    );

    if (duplicateCheck.isDuplicate) {
      return NextResponse.json(
        {
          success: false,
          error: duplicateCheck.reason,
        },
        { status: 409 }
      );
    }

    // 3. Create & Store Registration
    const created = await createRegistrationRecord(validData);

    return NextResponse.json(
      {
        success: true,
        registration_id: created.registration_id,
        name: created.name,
        participant_type: created.participant_type,
        member_type: created.member_type,
        position: created.position,
        total_amount: created.total_amount,
        payment_method: created.payment_method,
        payment_status: created.payment_status,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while processing your registration. Please try again.",
      },
      { status: 500 }
    );
  }
}
