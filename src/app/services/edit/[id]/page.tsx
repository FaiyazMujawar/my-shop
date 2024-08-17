import { redirect } from 'next/navigation';
import { getServiceById } from '~/data/services';
import UpdateService from './update-form';

type EditServicePageProps = {
  params: {
    id: string;
  };
};

const EditServicePage = async ({ params }: EditServicePageProps) => {
  const service = await getServiceById(params.id);
  if (!service) {
    redirect('/');
  }
  return <UpdateService service={service} />;
};

export default EditServicePage;
