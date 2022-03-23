import { memo } from 'react';
import { SetStateType } from '../types';

type QAButtonProps = {
  children: React.ReactNode;
  color: 'bg-slate-700' | 'bg-green-600';
  mxAuto: 'ml-auto' | 'mr-auto';
  onClick: () => void | SetStateType<boolean>;
};

const QAButton = ({ children, color, mxAuto, onClick }: QAButtonProps) => {
  const hoverColor =
    color === 'bg-green-600' ? 'hover:bg-green-700' : 'hover:bg-slate-800';
  return (
    <button
      onClick={onClick}
      className={`${mxAuto} ${color} ${hoverColor} ${
        color === 'bg-green-600' ? 'mb-40' : ''
      } flex items-center whitespace-nowrap rounded-full px-6 py-4 font-medium capitalize leading-none tracking-wide text-white lg:px-6 lg:py-3 lg:text-[1.1rem] lg:font-[550] lg:leading-normal`}
    >
      {children}
    </button>
  );
};

const MemoizedQAButton = memo(QAButton);

export default MemoizedQAButton;
