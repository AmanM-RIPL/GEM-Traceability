import { db } from "@/app/db";
import { users } from "@/app/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email,otp } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }
    // const data = await db.select().from(users).where(email);

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.verificationToken, otp))
      .limit(1);

    let result;


    // 4. Send mail after DB success
    // await sendMailJobs(email, verificationToken);

    return NextResponse.json({
      success: true,
      message:
        existingUser.length > 0
          ? "User already exists, verification token updated"
          : "User created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error creating/updating user" },
      { status: 500 }
    );
  }
}
