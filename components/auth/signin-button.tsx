'use client';

import { Button } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa6';

export default function SignInButton() {
  return (
    <div>
      <Button leftIcon={<FaGoogle />} onClick={() => signIn('google')}>
        Sign In
      </Button>
    </div>
  );
}
