'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa6';
import { AddQuestion } from '~/app-types/service';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { AddQuestionSchema } from '~/utils/validation/schema/service';

type QuestionFormProps = {
  onAdd: (data: AddQuestion) => unknown;
};

const QuestionForm = ({ onAdd }: QuestionFormProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<AddQuestion>({
    resolver: zodResolver(AddQuestionSchema),
    defaultValues: {
      question: '',
      required: false,
      type: 'text',
    },
  });

  function onSubmit(data: AddQuestion) {
    onAdd(data);
    setOpen(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.stopPropagation();
    return form.handleSubmit(onSubmit)(e);
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={'icon'} variant={'secondary'}>
            <FaPlus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add new question</DialogTitle>
          <Form {...form}>
            <form className='space-y-4' onSubmit={handleSubmit}>
              {/* Question */}
              <FormField
                control={form.control}
                name='question'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input placeholder='What is required?' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center justify-between gap-4'>
                {/* Type */}
                <FormField
                  control={form.control}
                  name='type'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Response type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder='What type of response is expected?' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {['text', 'number', 'date', 'file'].map(
                                (type) => (
                                  <SelectItem key={type} value={type}>
                                    {type.toUpperCase()}
                                  </SelectItem>
                                )
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Question */}
                <FormField
                  control={form.control}
                  name='required'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is this required?</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className='block'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type='submit'>Add</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionForm;
