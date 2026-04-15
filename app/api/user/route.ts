import { db } from "@/app/db";
import { users } from "@/app/db/schema/schema";
import { sendMailJobs } from "@/lib/queue";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { env } from "@/lib/config";


export async function GET() {
  try {
    const data = await db.select().from(users);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error fetching users" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }


    // 1. Check if email already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    let result;

    if (existingUser.length > 0) {
      // 2. If exists, update that user
      result = await db
        .update(users)
        .set({
          verificationToken,
          lastLogin: new Date(),
          verificationTokenExpires: new Date(Date.now() + 30 * 60 * 1000),
          isActive: true,
          // updatedAt: new Date(), // add this only if your schema has updatedAt
        })
        .where(eq(users.email, email))
        .returning();
    } else {
      // 3. If not exists, insert new user
      result = await db
        .insert(users)
        .values({
          email,
          isActive: true,
          createdAt: new Date(),
          lastLogin: new Date(),
          verificationToken,
          verificationTokenExpires: new Date(Date.now() + 30 * 60 * 1000),
        })
        .returning();
    }
    const response = generateTokens(result[0].id);
    console.log(response,"generateTokens");
    // 4. Send mail after DB success
    await sendMailJobs(email, verificationToken);

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


const generateTokens = (id: string) => {
  const accessToken = jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id },  env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};