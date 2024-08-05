'use client';

import QuestionCard from '@components/services/questions/question-card';
import { QuestionForm } from '@components/services/questions/question-form';
import { Question } from '@custom-types/service';

type QuestionProps = {
  onAddQuestion: (questions: Question) => void;
  questions: Question[];
};

export const Questions = (props: QuestionProps) => {
  return (
    <div className='border rounded-sm flex flex-col p-4'>
      <div className='flex justify-between'>
        <div className='text-3xl font-semibold mb-4'>Questions</div>
        <div>
          <QuestionForm
            onAddQuestion={(question) => {
              props.onAddQuestion(question);
            }}
          />
        </div>
      </div>
      {props.questions.length == 0 ? (
        <div className={'text-gray-500 py-20 italic text-center'}>
          No questions added
        </div>
      ) : (
        props.questions.map((question, index) => (
          <QuestionCard key={index} question={question} />
        ))
      )}
    </div>
  );
};
