'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { OrderRequest } from '~/app-types/order';
import { IQuestion, IService } from '~/app-types/service';
import { getUploadUrl } from '~/app/actions';
import { Button } from '~/components/ui/button';
import {
  Dialog,
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
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { ScrollArea } from '~/components/ui/scroll-area';
import { placeOrder } from './actions';

type OrderFormProps = {
  service: IService;
};

const inputTypes = {
  text: z.string(),
  number: z.coerce.number(),
  file: z.instanceof(File),
  date: z.coerce.date(),
};

function generateFormSchema(questions: IQuestion[]) {
  const shape: Record<string, z.ZodType> = {};
  questions.forEach((question) => {
    const { id, type, required } = question;
    const inputType = inputTypes[type];
    shape[id] = required ? inputType : inputType.optional();
  });
  return z.object(shape);
}

function getDefaultFormValues(questions: IQuestion[]) {
  const defaultValues: { [key: string]: any } = {};
  questions.forEach((question) => {
    defaultValues[question.id] = undefined;
  });
  return defaultValues;
}

const OrderForm = ({ service }: OrderFormProps) => {
  const [open, setOpen] = useState(false);
  const schema = generateFormSchema(service.questions);
  type FormType = z.infer<typeof schema>;
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultFormValues(service.questions),
  });

  function resetAndCloseForm() {
    form.reset();
    setOpen(false);
  }

  async function onSubmit(data: FormType) {
    const responses: Record<string, string> = {};
    let fileUploadsSuccessful = true;
    for (const question of service.questions) {
      if (!question.required && !data[question.id]) continue;
      if (question.type == 'file') {
        const file = data[question.id] as File;
        const { url, mediaId } = await getUploadUrl(file.type, false);
        const response = await fetch(url, {
          method: 'PUT',
          body: file,
        });
        if (!response.ok) {
          fileUploadsSuccessful = false;
          break;
        }
        responses[question.id] = mediaId;
      } else {
        responses[question.id] = data[question.id];
      }
    }
    if (!fileUploadsSuccessful) {
      toast.error('Failed to upload files');
      resetAndCloseForm();
      return;
    }
    const requestBody: OrderRequest = {
      serviceId: service.id,
      userResponses: responses,
    };
    const response = await placeOrder(requestBody);
    if (!response.success) {
      toast.error(response.error);
    } else {
      toast.success('Order placed successfully');
      resetAndCloseForm();
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'secondary'}>Order Now</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className='px-4'>Enter details</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <ScrollArea className='h-[50vh]'>
                <div className='px-4 space-y-4'>
                  {service.questions.map((question) => {
                    return (
                      <FormField
                        control={form.control}
                        name={question.id}
                        key={question.id}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <span>{question.question}</span>
                              {question.required && (
                                <span className='text-red-500'>*</span>
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type={question.type}
                                onChange={({ target: { value, files } }) => {
                                  if (question.type === 'file') {
                                    field.onChange(files?.[0]);
                                  } else {
                                    field.onChange(value);
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </div>
              </ScrollArea>

              <DialogFooter className='px-4'>
                <Button type='submit'>Place Order</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderForm;
