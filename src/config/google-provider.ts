import GoogleAuthProvider from 'next-auth/providers/google';
import env from '~/env';

export default GoogleAuthProvider({
  clientId: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
});
