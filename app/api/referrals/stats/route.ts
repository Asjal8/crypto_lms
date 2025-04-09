import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getReferralStats } from "@/services/referral.service";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const stats = await getReferralStats(session.user.id);

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Referral Stats API Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch referral stats",
      },
      { status: 500 }
    );
  }
}
