'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa6';
import { AddService } from '~/app-types/service';
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
import { AddServiceSchema } from '~/utils/validation/schema/service';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import QuestionCard from './question-card';
import QuestionForm from './question-form';

type Props = {
  onSubmit: (data: AddService) => unknown;
  service: AddService;
  mode: 'add' | 'edit';
};

const ServiceForm = (props: Props) => {
  const form = useForm<AddService>({
    resolver: zodResolver(AddServiceSchema),
    defaultValues: props.service,
  });

  async function onSubmit(data: AddService) {
    props.onSubmit(data);
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
          <div className='flex gap-4'>
            {/* Price */}
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem className='w-2/3'>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='This costs...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Type */}
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem className='w-1/3'>
                  <FormLabel>Type of Service</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder='Type of service?' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {['online', 'offline'].map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
          <div className='flex flex-wrap gap-2'>
            {form.watch('questions').map((question, index) => {
              return (
                <QuestionCard
                  key={index}
                  question={question}
                  showDelete={true}
                  onDelete={() => {
                    const questions = form.getValues('questions');
                    const filteredQuestions = questions.filter(
                      (_, i) => i !== index
                    );
                    form.setValue('questions', filteredQuestions);
                  }}
                />
              );
            })}
          </div>
          <Button type='submit'>
            <FaPlus className='mr-2' />
            {props.mode == 'add' ? 'Add' : 'Update'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ServiceForm;
