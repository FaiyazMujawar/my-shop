'use client';

import { Button } from '@components/ui/button';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa6';

// TODO: use server component to signin with google

export default function SignInButton() {
  return (
    <Button onClick={() => signIn('google')}>
      <FaGoogle className='mr-2' />
      Sign In
    </Button>
  );
}
