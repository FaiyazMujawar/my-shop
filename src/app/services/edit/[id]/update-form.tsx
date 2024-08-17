'use client';

import { useRouter } from 'next/navigation';
import { IService } from '~/app-types/service';
import ServiceForm from '~/components/service-form';
import { updateServiceAction } from './actions';

type Props = {
  service: IService;
};

const UpdateService = (props: Props) => {
  const router = useRouter();
  return (
    <div>
      <ServiceForm
        mode={'edit'}
        service={props.service}
        onSubmit={async (data) => {
          await updateServiceAction(props.service.id, data);
          router.back();
        }}
      />
    </div>
  );
};

export default UpdateService;
