import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.GOOGLE_CLIENT_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  jwt: {
    encryption: true,
  },
  secret: process.env.GOOGLE_CLIENT_SECRET,
  callbacks: {
    async jwt(token, account) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
        console.log(account);
      }
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
