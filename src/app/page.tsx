import ServicesGrid from './(services)';
import AddServiceButton from './(services)/add-service-button';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col'>
      <ServicesGrid />
      <AddServiceButton />
    </main>
  );
}
