import NextAuth, { Session } from "next-auth";
import { jwtDecode } from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

async function authenticate(provider: string, body: Object) {
  return await fetch(`${process.env.NEXT_PRIVATE_API_URL}/auth/${provider}/`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(`${process.env.NEXT_PRIVATE_API_URL}/auth/token/refresh/`, {
      method: "POST",
      body: JSON.stringify({ refresh: token.refresh }),
      headers: { "Content-Type": "application/json" },
    });

    const refreshedToken = await res.json();

    if (res.status !== 200) throw refreshedToken;

    const decoded: any = jwtDecode(refreshedToken.access);

    return {
      ...token,
      access: refreshedToken.access,
      access_expiration: decoded.exp * 1000,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: any = {
  // https://next-auth.js.org/configuration/providers/oauth
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      idToken: true,
    }),
    /* FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      idToken: false,
      authorization: "https://www.facebook.com/v17.0/dialog/oauth?scope=email",
      issuer: "https://www.facebook.com",
      jwks_endpoint: "https://www.facebook.com/.well-known/oauth/openid/jwks/",
    }), */
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(`${process.env.NEXT_PRIVATE_API_URL}/auth/login/`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          const token = await res.json();

          // if (res.status !== 200) throw user;

          // If no error and we have user data, return it
          if (res.ok && token) {
            const decoded: any = jwtDecode(token.access);
            token.access_expiration = decoded.exp * 1000;

            return token;
          }

          // Return null if user data could not be retrieved
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // async redirect({ url, baseUrl }: any) {
    //   return url.startsWith(baseUrl) ? Promise.resolve("/dashboard") : Promise.resolve(baseUrl);
    // },
    async signIn({ user, account, profile, email, credentials }: any) {
      try {
        let res: any;

        if (account.provider === "google") {
          res = await authenticate(account.provider, {
            access_token: account.access_token,
            id_token: account.id_token,
          });
        } else if (account.provider === "facebook") {
          res = await authenticate("facebook", {
            access_token: account.access_token,
            code: account.code,
          });
        } else if (account.provider === "credentials") {
          return true;
        } else {
          return false;
        }

        const token = await res.json();

        if (res.status !== 200) throw token;

        // If no error and we have user data, return it
        if (res.ok && token) {
          const decoded: any = jwtDecode(token.access);
          token.access_expiration = decoded.exp * 1000;

          user.access = token.access;
          user.access_expiration = token.access_expiration;
          user.refresh = token.refresh;
          user.role = token.user.user_type;
          user.user = token.user;

          return true;
        }

        // Return null if user data could not be retrieved
        return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({ token, user, account, profile, isNewUser, trigger, session }: any) {
      if (trigger === "update" && session.first_name && session.last_name) {
        token.user.first_name = session.first_name;
        token.user.last_name = session.last_name;
      }

      if (token && token.user) {
        token.role = token.user.user_type;
      }

      // initial signin
      if (user) {
        return user;
      }

      // Return previous token if the access token has not expired
      if (Date.now() < token.access_expiration) {
        return token;
      }

      // refresh token
      return refreshAccessToken(token);
    },
    async session({ session, user, token }: { session: Session; user: any; token: any }) {
      session.user = token.user;
      session.access = token.access;
      session.access_expiration = token.access_expiration;
      session.refresh = token.refresh;
      session.role = token.role;

      return session;
    },
    async redirect({ url, baseUrl }: any) {
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 3, // 3 hours (if user is inactive/idle for {maxAge}, they will be logged out)
  },
  events: {
    async signOut({ message }: any) {
      try {
        const res = await fetch(`${process.env.NEXT_PRIVATE_API_URL}/auth/logout/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (res.status !== 200) throw res;

        return null;
      } catch (error) {
        return null;
      }
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

export default NextAuth(authOptions);
