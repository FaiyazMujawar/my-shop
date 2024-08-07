'use client';

type ActionButtonProps = {
  onClick: () => unknown;
  title: string;
} & React.HTMLAttributes<HTMLDivElement>;

const ActionButton = ({ title, onClick, ...rest }: ActionButtonProps) => {
  return (
    <div className='cursor-pointer' onClick={onClick} {...rest}>
      {title}
    </div>
  );
};

export default ActionButton;
