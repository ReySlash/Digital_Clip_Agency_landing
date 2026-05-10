/**
 * NextAuth Middleware Configuration
 * 
 * This middleware protects routes by checking if the user is authenticated.
 * It runs on every request to routes that match the matcher pattern.
 * 
 * How it works:
 * 1. The `auth` function from auth.ts checks the session cookie
 * 2. If valid, the request continues
 * 3. If invalid/missing, the user is redirected to the signIn page
 */

import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Auth.js middleware configuration
 * 
 * The `auth` function acts as middleware when exported as `middleware`.
 * It returns a response that either:
 * - Allows the request to proceed (authenticated)
 * - Redirects to the signIn page (unauthenticated)
 */
export default auth((req) => {
  // req.auth contains the session if the user is logged in
  const isLoggedIn = !!req.auth;
  
  // Get the pathname of the incoming request
  const pathname = req.nextUrl.pathname;

  // Define which paths are protected (admin routes)
  const isAdminRoute = pathname.startsWith("/admin");
  
  // The login page itself should be accessible without auth
  const isLoginPage = pathname === "/admin/login";

  if (isAdminRoute && !isLoggedIn && !isLoginPage) {
    // User is trying to access admin route but not logged in
    // Redirect to the signIn page defined in auth.ts (pages.signIn = "/admin/login")
    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    
    // Add callbackUrl so NextAuth redirects back here after login
    loginUrl.searchParams.set("callbackUrl", pathname);
    
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in and trying to access login page, redirect to admin
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
  }

  // Allow the request to proceed
  return NextResponse.next();
});

/**
 * Route Matcher Configuration
 * 
 * Specifies which routes this middleware should run on.
 * This pattern matches all routes except:
 * - API routes (api/*)
 * - Static files (_next/static/*, _next/image/*)
 * - Images and other static assets (favicon.ico, etc.)
 */
export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};