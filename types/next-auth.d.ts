/**
 * NextAuth Type Augmentation
 * 
 * By default, NextAuth only knows about basic user fields (id, email, name).
 * We need to extend the types to include our custom `role` field from Prisma's User model.
 */

import { UserRole } from "@prisma/client";

/**
 * Augment the default NextAuth User type to include our role field.
 * This makes TypeScript aware that authenticated users have a `role` property.
 */
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  }
}

/**
 * Augment the Session type to include user role.
 * This allows us to access session.user.role in both client and server components.
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
    };
  }
}

/**
 * Augment the JWT type to include user id and role.
 * This is needed so the token payload properly carries our custom fields
 * when using JWT session strategy.
 */
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
  }
}