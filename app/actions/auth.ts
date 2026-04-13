// app/actions/auth.ts
"use server";

import { signIn } from "@/auth";

export async function signInWithGoogle() {
  await signIn("google", { callbackUrl: "/" ,redirectTo: "/dashboard", });
}

export async function signInWithApple() {
  await signIn("apple", { callbackUrl: "/" });
}