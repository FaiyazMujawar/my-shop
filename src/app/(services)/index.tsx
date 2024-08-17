import { getAllServices } from '~/data/services';
import ServiceCard from './service-card';

const ServicesGrid = async () => {
  const services = await getAllServices();
  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6'>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServicesGrid;
