'use client';

// TODO: use server component to signout

import { Button } from '@components/ui/button';
import { signOut } from 'next-auth/react';
import { MdLogout } from 'react-icons/md';
export default function SignOutButton() {
  return (
    <Button variant={'ghost'} onClick={() => signOut()}>
      <MdLogout className='mr-2' /> Sign Out
    </Button>
  );
}
