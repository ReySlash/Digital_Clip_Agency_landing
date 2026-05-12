"use server";
import { AuthError } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import {
  assertLoginAttemptAllowed,
  clearFailedLoginAttempts,
  recordFailedLoginAttempt,
} from "@/lib/login-abuse-protection";

async function getClientIp(): Promise<string> {
  const headerMap = await headers();
  return (
    headerMap.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerMap.get("x-real-ip") ??
    "unknown"
  );
}

export async function adminLoginAction(
  formData: FormData,
): Promise<void> {
  const ip = await getClientIp();
  const callbackUrl =
    (formData.get("callbackUrl") as string | null) ?? "/admin";
  const email =
    (formData.get("email") as string | null)?.toLowerCase() ?? "";

  try {
    assertLoginAttemptAllowed(ip, email);
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: callbackUrl,
    });
    clearFailedLoginAttempts(ip, email);
  } catch (error) {
    if ((error as { message?: string }).message === "RateLimited") {
      const loginUrl = new URL(
        "/admin/login",
        process.env.AUTH_URL ?? "http://localhost:3000",
      );
      loginUrl.searchParams.set("callbackUrl", callbackUrl);
      loginUrl.searchParams.set("error", "RateLimited");
      redirect(`${loginUrl.pathname}${loginUrl.search}`);
    }

    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        recordFailedLoginAttempt(ip, email);
      }
      const loginUrl = new URL(
        "/admin/login",
        process.env.AUTH_URL ?? "http://localhost:3000",
      );
      loginUrl.searchParams.set("callbackUrl", callbackUrl);
      loginUrl.searchParams.set("error", error.type);
      redirect(`${loginUrl.pathname}${loginUrl.search}`);
    }

    throw error;
  }
}
