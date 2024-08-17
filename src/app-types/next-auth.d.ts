import 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultSession['user'] {
    role: 'admin' | 'user';
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    uid: string;
    role: 'admin' | 'user';
  }
}
