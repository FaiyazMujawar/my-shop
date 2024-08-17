'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa6';
import { toast } from 'sonner';
import { AddService } from '~/app-types/service';
import ResponseIcon from '~/components/response-icon';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { addService } from './actions';
import QuestionForm from './question-form';

const AddServicePage = () => {
  const router = useRouter();
  const form = useForm<AddService>({
    defaultValues: {
      title: '',
      description: '',
      price: undefined,
      type: 'online',
      questions: [],
    },
  });

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
    <div className='space-y-4'>
      <div className='font-semibold text-2xl'>Add new service</div>
      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          {/* Title */}
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='My awesome service!' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Description */}
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='How will this help?'
                    rows={5}
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Price */}
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type='number' placeholder='This costs...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-between items-center'>
            <span>Questions</span>
            <QuestionForm
              onAdd={(question) => {
                form.setValue('questions', [
                  ...form.getValues('questions'),
                  question,
                ]);
              }}
            />
          </div>
          <div className='flex gap-2'>
            {form.watch('questions').map((question, index) => {
              return (
                <div
                  key={index}
                  className='border px-2 py-1 rounded-sm flex items-center gap-2'
                >
                  <ResponseIcon type={question.type} />
                  <span>{question.question}</span>
                  {question.required && (
                    <span className='text-red-500 text-xl'>*</span>
                  )}
                </div>
              );
            })}
          </div>
          <Button type='submit' size={'lg'}>
            <FaPlus className='mr-2' />
            Add Service
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddServicePage;
