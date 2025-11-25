"use server";

import { signIn } from "@/lib/auth";

type LoginType = "google" | "github";

export async function handleRegister(provider: string) {
  await signIn(provider, { redirectTo: "/dashboard" });
}
