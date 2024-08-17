'use client';

import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { deleteService } from './actions';

type Props = {
  serviceId: string;
};

const AdminActions = ({ serviceId }: Props) => {
  const router = useRouter();
  return (
    <div className='flex gap-2'>
      <Button
        size={'sm'}
        variant={'secondary'}
        onClick={() => router.push(`/services/edit/${serviceId}`)}
      >
        Edit
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size={'sm'} variant={'destructive'}>
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              service.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='bg-red-500'
              onClick={async () => {
                await deleteService(serviceId);
                router.push('/');
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminActions;
