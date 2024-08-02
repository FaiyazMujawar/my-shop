import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@config/db';
import { Google } from '@config/env-vars';
import { getUserById } from '@utils/db/user';
import NextAuth from 'next-auth';
import GoogleAuthProvider from 'next-auth/providers/google';

const GoogleAuth = GoogleAuthProvider({
  clientId: Google.CLIENT_ID,
  clientSecret: Google.CLIENT_SECRET,
});

export const { handlers, signIn, auth } = NextAuth({
  callbacks: {
    jwt: async ({ token }) => {
      if (!token?.sub) return token;
      const user = await getUserById(token.sub);
      if (!user) return token;
      token.role = user.role;
      return token;
    },
    session: async ({ session, token }) => {
      session.user.role = token.role;
      return session;
    },
  },
  session: { strategy: 'jwt' },
  adapter: DrizzleAdapter(db),
  providers: [GoogleAuth],
});
