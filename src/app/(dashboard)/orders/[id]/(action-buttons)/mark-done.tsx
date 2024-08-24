'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { getUploadUrl } from '~/app/actions';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { markDone } from '../actions';

type Props = {
  orderId: string;
};

type FormValues = {
  file: File | undefined;
  note: string;
};

const MarkDone = ({ orderId }: Props) => {
  const router = useRouter();
  const form = useForm<FormValues>({
    defaultValues: {
      file: undefined,
      note: '',
    },
  });

  async function handleSubmit(data: FormValues) {
    if (data.file) {
      const uploadUrl = await getUploadUrl(data.file.name, false);
      const response = await fetch(uploadUrl.url, {
        method: 'PUT',
        body: data.file,
      });
      if (response.ok) {
        const { success } = await markDone(
          orderId,
          uploadUrl.mediaId,
          data.note
        );
        if (success) {
          toast.success('Order marked as done!');
        } else {
          toast.error('Action failed!');
        }
        router.push('/orders');
      }
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'success'}>Mark As Done</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Sure to delete?</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='space-y-4'
            >
              <FormField
                name='file'
                control={form.control}
                render={() => (
                  <FormItem>
                    <FormLabel>Please select a file (if any)</FormLabel>
                    <FormControl>
                      <Input
                        type='file'
                        onChange={(e) =>
                          form.setValue('file', e.target.files?.[0])
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name='note'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please enter a response note</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={'secondary'}>Cancel</Button>
                </DialogClose>
                <Button
                  disabled={
                    form.watch('file') == undefined &&
                    form.watch('note').length == 0
                  }
                  variant={'success'}
                  type='submit'
                >
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarkDone;
