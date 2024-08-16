import { auth } from '~/config/auth';
import env from '~/env';
import UserActions from './user-actions';

const Navigation = async () => {
  const session = await auth();
  return (
    <div className='w-screen py-8 bg-primary text-primary-foreground'>
      <div className='w-4/5 mx-auto flex justify-between'>
        <div className='text-2xl font-semibold'>{env.APP_NAME}</div>
        <UserActions session={session} />
      </div>
    </div>
  );
};

export default Navigation;
