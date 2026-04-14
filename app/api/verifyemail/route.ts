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
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.verificationToken, otp))
      .limit(1);

    let result;
    
    return NextResponse.json({
      success: true,
      message:
        existingUser.length > 0
          ? true
          : false,
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
