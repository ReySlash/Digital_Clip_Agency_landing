/**
 * Auth API Route Handler
 * 
 * This file exposes the NextAuth handlers (GET and POST) at:
 * - /api/auth/signin
 * - /api/auth/signout
 * - /api/auth/csrf
 * - /api/auth/providers
 * - etc.
 * 
 * The handlers are exported from auth.ts and handle all auth-related requests.
 */

import { handlers } from "@/auth";

// Export GET and POST handlers for all auth endpoints
export const { GET, POST } = handlers;