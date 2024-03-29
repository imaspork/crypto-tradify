import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import checkUserEmail from "../../../util/checkUserEmail";

export default NextAuth({
  // Configure one or more authentication providers
  secret: "KLJASdklasdasdhjkashdasd",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  jwt: {
    encryption: true,
  },

  callbacks: {
    async jwt(token, account) {
      if (account?.accessToken) {
        token = {
          id: user.id,
          provider: account.provider,
          accessToken: account.accessToken,
        };
      }

      // if account has email, pass in email parameter to check db.

      return token;
    },
    async session(session, account) {
      if (account?.email) {
        const response = await checkUserEmail(account?.email);
        const isReturningUser = await response?.isReturningUser;

        if (isReturningUser === true) {
          session.isNew = false;
        } else {
          session.isNew = true;
        }
      }

      return session;
    },

    redirect: async (url, _baseUrl) => {
      if (url === "/profile") {
        return Promise.resolve("/");
      }
      return Promise.resolve("/");
    },
  },
});
