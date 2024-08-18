'use client';

import { Session } from 'next-auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa6';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { logIn, logOut } from './actions';

type UserActionsProps = {
  session: Session | null;
};

const UserActions = ({ session }: UserActionsProps) => {
  const router = useRouter();
  if (!session) {
    return (
      <div>
        <Button onClick={async () => await logIn()} variant={'secondary'}>
          <FaGoogle className='mr-2' />
          Sign in
        </Button>
      </div>
    );
  }
  return (
    <div className='cursor-pointer'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex gap-2 items-center'>
            <Image
              src={session.user?.image!}
              height={35}
              width={35}
              alt='profile-img'
              className='rounded-full'
            />
            <div>{session.user?.name}</div>
            <MdKeyboardArrowDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => router.push('/orders')}
          >
            View Orders
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={async () => await logOut()}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserActions;
