'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AddService } from '~/app-types/service';
import ServiceForm from '~/components/service-form';
import { addService } from './actions';

const AddServicePage = () => {
  const router = useRouter();

  async function onSubmit(data: AddService) {
    const result = await addService(data);

    if (!result.success) {
      console.log(result.error);
    }
    if (result.success) {
      toast.success('Service added!', { className: 'bg-green-500/20' });
    } else {
      toast.error(result.error, { className: 'bg-red-500/20' });
    }
    router.push('/');
  }

  return (
    <div>
      <ServiceForm
        onSubmit={onSubmit}
        mode={'add'}
        service={{
          title: '',
          description: '',
          price: 0,
          type: 'online',
          questions: [],
        }}
      />
    </div>
  );
};

export default AddServicePage;
