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
    <div className='flex gap-4 py-10'>
      {services.map((service) => (
        <div key={service.id} className='cursor-pointer p-5 border rounded-md'>
          <div className='font-bold'>{service.title}</div>
          <div className='text-gray-500'>{service.description}</div>
        </div>
      ))}
    </div>
  );
}
