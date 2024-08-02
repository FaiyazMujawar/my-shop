'use client';

import { signOut } from 'next-auth/react';
import { PiSignOut } from 'react-icons/pi';

export default function SignOutButton() {
  return (
    <div className='cursor-pointer' onClick={() => signOut()}>
      <PiSignOut size={25} />
    </div>
  );
}
