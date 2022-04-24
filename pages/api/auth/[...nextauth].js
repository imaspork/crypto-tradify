import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

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

      // USE THIS AREA TO FETCH USER ACCOUNT BASED ON EMAIL from mongodb : DDDD
      // is user in db? no? -> create db user
      // yes? return db user
      return token;
    },

    redirect: async (url, _baseUrl) => {
      if (url === "/profile") {
        return Promise.resolve("/");
      }
      return Promise.resolve("/");
    },
  },
});
