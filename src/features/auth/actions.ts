"use server";

import { redirect } from "next/navigation";
import { authService } from "./services/authService";
import type { LoginCredentials } from "./types";

export async function loginAction(credentials: LoginCredentials) {
  try {
    const result = await authService.login(credentials);
    redirect("/");
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Login failed",
    };
  }
}

export async function logoutAction() {
  await authService.logout();
  redirect("/login");
}
