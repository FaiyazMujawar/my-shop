import Image from 'next/image';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { auth } from '~/config/auth';
import DashboardButton from './dashboard-button';
import SignInButton from './signin-button';
import SignOutButton from './signout-button';

export async function Navigation() {
  const session = await auth();

  return (
    <nav className='w-full py-6 shadow-lg bg-gray-100'>
      <div className='w-[80%] mx-auto flex justify-between items-center'>
        <div className='font-extrabold text-2xl cursor-pointer'>MyShop</div>
        {session ? (
          <div className='flex items-center space-x-2'>
            <div className={'flex flex-col items-center'}>
              <Image
                src={session.user?.image!}
                alt={session.user?.name!}
                width={35}
                height={35}
                className='rounded-full mr-2'
              />
            </div>
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <div className='flex items-center'>
                    <div className='mr-2'>
                      <div className={'text-xs text-gray-500'}>Welcome</div>
                      <div>{session.user?.name}</div>
                    </div>
                    <MdKeyboardArrowDown />
                  </div>
                </PopoverTrigger>
                <PopoverContent className='w-fit space-y-2'>
                  <SignOutButton />
                  <DashboardButton />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </nav>
  );
}
