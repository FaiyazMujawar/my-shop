'use client';

import { createService } from '@/lib/http/services';
import { Questions } from '@components/services/questions';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { Service } from '@custom-types/service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

const CreateServicePage = () => {
  const [service, setService] = useState<Service>({
    title: '',
    description: '',
    price: 0,
    questions: [],
  });

  const router = useRouter();

  return (
    <div className='w-[80%] mx-auto py-10'>
      <div className='flex space-x-4'>
        <div className='space-y-4 w-3/5'>
          <Input
            placeholder='Eg. My awesome service'
            type='text'
            value={service.title}
            className='text-3xl py-10 px-5'
            onChange={(e) => {
              setService((service) => ({
                ...service,
                title: e.target.value,
              }));
              console.log({ service });
            }}
          />
          <Textarea
            placeholder='Eg. This service is awesome!'
            value={service.description}
            rows={15}
            className='p-5 text-lg'
            onChange={(e) => {
              setService((service) => ({
                ...service,
                description: e.target.value,
              }));
            }}
          />
          <Input
            placeholder='Eg. $10'
            value={service.price}
            type='number'
            className='p-5 text-lg'
            onChange={(e) => {
              setService((service) => ({
                ...service,
                price: parseInt(e.target.value),
              }));
            }}
          />
          <Button
            size='lg'
            onClick={() => {
              console.log({ service });
              createService(service)
                .then()
                .catch((error) => console.log(error))
                .finally(() => {
                  // redirect to home
                  router.push('/');
                });
            }}
          >
            <FaPlus className='mr-2' /> Add service
          </Button>
        </div>
        <div className='w-2/5'>
          <Questions
            onAddQuestion={(question) => {
              setService((service) => {
                return {
                  ...service,
                  questions: [...service.questions, question],
                };
              });
            }}
            questions={service.questions}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateServicePage;
