'use client';

import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Input } from '@components/ui/input';
import { Question, ResponseInputType } from '@custom-types/service';
import { DialogClose } from '@radix-ui/react-dialog';

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { MdKeyboardArrowDown } from 'react-icons/md';

type QuestionFormProps = {
  onAddQuestion: (question: Question) => void;
};

export const QuestionForm = (props: QuestionFormProps) => {
  const [question, setQuestion] = useState<Question>({
    text: '',
    type: 'text',
    required: false,
  });
  const [selectedInputType, setSelectedInputType] =
    useState<ResponseInputType>('text');
  return (
    <Dialog>
      <DialogTrigger>
        <Button asChild variant={'secondary'}>
          <span>
            <FaPlus className='mr-2' /> Add Question
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add details</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <Input
            value={question.text}
            type='text'
            placeholder='What is required?'
            onChange={(e) => {
              setQuestion((question) => ({
                ...question,
                text: e.target.value,
              }));
            }}
          />
          <div className='flex space-x-4 items-center'>
            {/* Response Type */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={'secondary'} className='cursor-pointer'>
                  {selectedInputType} <MdKeyboardArrowDown className='ml-2' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel
                  onClick={() => {
                    setSelectedInputType('text');
                    setQuestion((question) => ({
                      ...question,
                      type: 'text',
                    }));
                  }}
                >
                  Text
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedInputType('number');
                    setQuestion((question) => ({
                      ...question,
                      type: 'number',
                    }));
                  }}
                >
                  Number
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedInputType('date');
                    setQuestion((question) => ({
                      ...question,
                      type: 'date',
                    }));
                  }}
                >
                  Date
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedInputType('file');
                    setQuestion((question) => ({
                      ...question,
                      type: 'file',
                    }));
                  }}
                >
                  File
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className='flex items-center'>
              <span className='mr-2'>Is required?</span>
              <Checkbox
                checked={question.required}
                onClick={() => {
                  setQuestion((question) => ({
                    ...question,
                    required: !question.required,
                  }));
                }}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type='submit'
              onClick={() => {
                props.onAddQuestion(question);
              }}
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
