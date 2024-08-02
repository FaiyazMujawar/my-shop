import { Google } from '@config/env-vars';
import NextAuth from 'next-auth';
import GoogleAuthProvider from 'next-auth/providers/google';

export const { handlers, signIn, auth } = NextAuth({
  providers: [
    GoogleAuthProvider({
      clientId: Google.CLIENT_ID,
      clientSecret: Google.CLIENT_SECRET,
    }),
  ],
});
