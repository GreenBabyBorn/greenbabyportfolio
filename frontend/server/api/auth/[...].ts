// file: ~/server/api/auth/[...].ts
import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import jwt_decode from "jwt-decode";

async function refreshAccessToken(refreshToken: string) {
  try {
    console.warn("trying to post to refresh token");
    const refreshedTokens = await $fetch<{
      refresh_token: string;
      access_token: string;
    } | null>("http://localhost:3001/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    if (!refreshedTokens) {
      console.warn("No refreshed tokens");
      throw refreshedTokens;
    }
    console.warn("Refreshed tokens successfully");
    return {
      accessToken: refreshedTokens.access_token,
      // accessTokenExpires: Date.now() + refreshedTokens.data.expires,
      refreshToken: refreshedTokens.refresh_token,
    };
  } catch (error) {
    console.warn("Error refreshing token", error);
    return {
      refreshToken,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NuxtAuthHandler({
  secret: "your-secret-here",
  events: {
    async signOut({ token }) {
      console.log("qweqweqwe", token.accessToken);
      return await $fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          refresh_token: token.refreshToken,
        },
      });
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        console.warn("JWT callback", { token, user, account });
        return {
          // ...token,
          ...user,
        };
      }
      // Handle token refresh before it expires of 15 minutes
      const tokenExp: any = jwt_decode(token.accessToken as string);
      if (tokenExp.exp && Math.round(Date.now() / 1000) > tokenExp.exp) {
        console.warn("Token is expired. Getting a new");
        return refreshAccessToken(token.refreshToken as any);
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).user = {
        ...session.user,
        accessToken: token.accessToken,
      };

      return session;
    },
  },
  session: {},

  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page

    signIn: "/admin/login",
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          // placeholder: "(hint: jsmith)",
        },
        password: {
          label: "Password",
          type: "password",
          // placeholder: "(hint: hunter2)",
        },
      },

      async authorize(credentials: any) {
        try {
          const payload = {
            username: credentials.username,
            password: credentials.password,
          };
          const userTokens = await $fetch<{
            access_token: string;
            refresh_token: string;
          } | null>("http://localhost:3001/api/auth/signin", {
            method: "POST",
            body: payload,
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!userTokens) {
            throw createError({
              statusCode: 500,
              statusMessage: "Next auth failed",
            });
          }
          const user = {
            accessToken: userTokens.access_token,
            refreshToken: userTokens.refresh_token,
          };
          return user;
        } catch (error) {
          console.warn("Error logging in", error);
          return null;
        }
      },
    }),
  ],
});
