import { Question, ResponseInputType } from '@custom-types/service';
import { CiCalendar, CiFileOn } from 'react-icons/ci';
import { GoNumber } from 'react-icons/go';
import { RxText } from 'react-icons/rx';

type QuestionCardProps = {
  question: Question;
};

function getInputTypeIcon(type: ResponseInputType) {
  switch (type) {
    case 'number':
      return <GoNumber size={20} />;
    case 'file':
      return <CiFileOn fontSize={20} />;
    case 'date':
      return <CiCalendar size={20} />;
    default:
      return <RxText size={20} />;
  }
}

// TODO: handle text overflow
const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <div className='border rounded-sm p-2 mb-2 flex items-center overflow-ellipsis'>
      <div className='min-w-fit mr-2'>{getInputTypeIcon(question.type)}</div>
      <div className='max-w-full'>
        <span className='font-semibold mr-1'>{question.text}</span>
        {question.required && <span className='text-red-500 text-2xl'>*</span>}
      </div>
    </div>
  );
};

export default QuestionCard;
