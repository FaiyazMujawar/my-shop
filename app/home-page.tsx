import { CreateServicesButton } from '~/components/create-services-button';
import { ServiceCard } from '~/components/services/service-card';
import { auth } from '~/config/auth';
import { getAllServices } from '~/services/service';

export const HomePage = async () => {
  const services = await getAllServices();
  const session = await auth();

  return (
    <div className='relative'>
      {session?.user?.role == 'ADMIN' && (
        <CreateServicesButton session={session} />
      )}
      <div className='flex gap-2 flex-wrap justify-center'>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};
