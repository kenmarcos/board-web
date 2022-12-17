import NextAuth from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error("Failed to initialize GitHub authentication");
}

export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
