import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    role?: string;
  }

  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
