import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    access: string;
    refresh: string;
    exp: number;
    access_expiration: string;
    user: User;
    role: string;
  }
}
