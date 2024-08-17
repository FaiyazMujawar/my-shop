import { auth } from '~/config/auth';
import ServicesGrid from './(services)';
import AddServiceButton from './(services)/add-service-button';

export default async function Home() {
  const session = await auth();

  return (
    <main className='flex min-h-screen flex-col'>
      <ServicesGrid />
      {session?.user?.role == 'admin' && <AddServiceButton />}
    </main>
  );
}
