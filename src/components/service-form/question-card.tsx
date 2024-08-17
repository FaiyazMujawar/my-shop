'use client';

import { MdClear } from 'react-icons/md';
import { AddQuestion } from '~/app-types/service';
import ResponseIcon from '../response-icon';

type Props = {
  onDelete?: () => unknown;
  question: AddQuestion;
  showDelete: boolean;
};

const QuestionCard = ({ question, onDelete, showDelete }: Props) => {
  return (
    <div className='border px-2 py-1 rounded-sm flex items-center gap-2'>
      <ResponseIcon type={question.type} />
      <span>{question.question}</span>
      {question.required && <span className='text-red-500 text-xl'>*</span>}
      {showDelete && (
        <MdClear
          className='ml-2 hover:cursor-pointer'
          onClick={onDelete ?? (() => {})}
        />
      )}
    </div>
  );
};

export default QuestionCard;
