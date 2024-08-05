import 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultSession['user'] {
    role: 'ADMIN' | 'USER';
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    uid: string;
    role: 'ADMIN' | 'USER';
  }
}
