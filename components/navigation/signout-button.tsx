'use client';

// TODO: use server component to signout
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <div
      className='cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-sm'
      onClick={() => signOut()}
    >
      Sign Out
    </div>
  );
}
