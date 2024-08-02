import { auth } from '@config/auth';
import Image from 'next/image';
import SignInButton from './auth/signin-button';
import SignOutButton from './auth/signout-button';

export default async function Navigation() {
  const session = await auth();

  return (
    <div className='w-[80%] mx-auto flex justify-between items-center py-6'>
      <div className='font-extrabold text-2xl cursor-pointer'>MyShop</div>
      <div>
        {session ? (
          <div className='flex items-center space-x-2'>
            <div>
              <Image
                src={session.user?.image!}
                alt={session.user?.name!}
                width={25}
                height={25}
                className='rounded-full'
              />
            </div>
            <div>{session.user?.name}</div>
            <SignOutButton />
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}
