import NextAuth, { Account, Profile, User } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

interface SessionParams {
  session: Session;
  user: User | AdapterUser;
  token: JWT;
}

interface SignInParams {
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile;
}

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

  callbacks: {
    // Esse callback é chamado sempre que um token JWT é criado (ou seja, ao entrar/logar)
    // ou atualizado (ou seja, quando uma session é acessada no client)
    // Você pode controlar o que deve ser retornado ao client
    async session({ session, user, token }: SessionParams) {
      try {
        return {
          ...session,
          id: token.sub,
        };
      } catch {
        return {
          ...session,
          id: null,
        };
      }
    },

    // Esse callback controla se um usuário tem permissão para entrar (logar)
    async signIn({ user, account, profile }: SignInParams) {
      const { email } = user;

      try {
        return true;
      } catch (error) {
        console.log("DEU ERRO", error);
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
