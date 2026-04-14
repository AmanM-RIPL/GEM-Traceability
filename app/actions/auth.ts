// app/actions/auth.ts
"use server";

import { signIn ,signOut} from "@/auth";

export async function signInWithGoogle() {
  await signIn("google", { callbackUrl: "/" ,redirectTo: "/dashboard", });
}
export async function signOutWithGoogle() {
  await signOut({ redirectTo: "/login" });
}

export async function signInWithApple() {
  await signIn("apple", { callbackUrl: "/" });
}