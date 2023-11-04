export { default } from "next-auth/middleware";

// Authenticated routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
