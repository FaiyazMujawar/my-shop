'use client';

import FormData from 'form-data';
import { Session } from 'next-auth';
import { useState } from 'react';
import { BiPackage } from 'react-icons/bi';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { createOrder } from '~/lib/http/order';
import { AddQuestion, IService } from '~/types/service';

type OrderFormProps = {
  session?: Session | null;
  service: IService;
};

export const OrderForm = ({ service }: OrderFormProps) => {
  const [responses, setResponses] = useState<Map<string, any>>(new Map());

  function handleChange({
    target: { name, value, type, files },
  }: React.ChangeEvent<HTMLInputElement>) {
    setResponses((values) => {
      values.set(name, type == 'file' ? files?.[0] : value);
      return values;
    });
  }

  async function handleSubmit() {
    const formData = new FormData();
    formData.append('serviceId', service.id);
    responses.forEach((value, key) => {
      formData.append(key, value);
    });
    try {
      await createOrder(formData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='text-lg px-5 py-6'>
            <BiPackage className='mr-2' size={25} /> Place Order
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-xl'>Enter details</DialogTitle>
            <DialogDescription className='line-clamp-1'>
              <span className='mr-2 text-sm'>for:</span>
              <span className='text-gray-700'>{service.title}</span>
            </DialogDescription>
            {/* Form Body */}
            {service.questions.map((question: AddQuestion) => (
              <div key={question.id}>
                <Label>{question.text}</Label>
                <Input
                  name={question.id}
                  type={question.type}
                  required={question.required}
                  onChange={handleChange}
                />
              </div>
            ))}
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type='button'
                variant='secondary'
                className='w-full'
                onClick={handleSubmit}
              >
                Place Order
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
