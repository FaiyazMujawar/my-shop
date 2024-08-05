import ServiceCard from '@components/services/service-card';
import { getAllServices } from '@db/service';

export async function ServicesSection() {
  const services = await getAllServices();

  if (services.length == 0) {
    return (
      <div className='flex space-x-4 space-y-4 w-full text-center'>
        {services.length == 0 && (
          <div className='text-gray-400 py-20 w-full'>
            No services available...
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='flex gap-2 flex-wrap justify-center py-10'>
      {/* TODO: remove this spread operator */}
      {[...services, ...services, ...services, ...services].map(
        (service, index) => (
          <ServiceCard key={index} service={service} />
        )
      )}
    </div>
  );
}
