import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  authorizeCredentials,
  jwtCallback,
  sessionCallback,
} from "@/lib/auth-logic";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },

      async authorize(credentials) {
        return authorizeCredentials(credentials);
      },
    }),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/admin/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      return jwtCallback({
        token,
        user: user
          ? {
              id: user.id,
              role: user.role,
            }
          : null,
      });
    },

    async session({ session, token }) {
      return sessionCallback({ session, token });
    },
  },

  trustHost: true,
});
