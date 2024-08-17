import { AiOutlineNumber } from 'react-icons/ai';
import { FaRegFile } from 'react-icons/fa6';
import { MdOutlineCalendarToday, MdOutlineTextFields } from 'react-icons/md';

type Props = {
  type: string;
};

const ResponseIcon = ({ type }: Props) => {
  switch (type) {
    case 'number':
      return <AiOutlineNumber />;
    case 'date':
      return <MdOutlineCalendarToday />;
    case 'file':
      return <FaRegFile />;
    default:
      return <MdOutlineTextFields />;
  }
};

export default ResponseIcon;
