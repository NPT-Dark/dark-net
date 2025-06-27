import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "~/actions/user";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "email public_profile",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
        username: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const verifyData = await loginUser(credentials);
        if (verifyData) {
          return {
            id: verifyData?._id.toString(),
            email: verifyData?.email,
            displayName: verifyData?.displayName,
            username: verifyData?.username,
            profileImage: verifyData?.profileImage,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
    updateAge: 60 * 15,
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: any) {
      if (user) {
        token.userId = user.id.toString();
        token.displayName = user?.displayName || "";
        token.email = user?.email || "";
        token.profileImage = user?.profileImage || "";
        token.username = user?.username || "";
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (token?.userId) {
        session.user.id = token.userId;
        session.user.displayName = token.displayName;
        session.user.email = token.email;
        session.user.profileImage = token.profileImage;
        session.user.username = token.username;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
