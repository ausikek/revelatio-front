import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      //eslint-disable-next-line
      async authorize(credentials, req) {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const user = await response.json();

        if (response.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session = token.user as any;
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};
