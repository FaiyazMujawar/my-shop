import { CreateServicesButton, ServicesSection } from '@components/services';
import { auth } from '@config/auth';

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <div className='flex justify-between'>
        <div>
          <h1 className='text-xl font-bold'>Welcome to MyShop</h1>
          <div className='text-gray-500'>Services at affordable prices!</div>
        </div>
        <CreateServicesButton session={session} />
      </div>
      <div>
        <ServicesSection />
      </div>
    </div>
  );
}
