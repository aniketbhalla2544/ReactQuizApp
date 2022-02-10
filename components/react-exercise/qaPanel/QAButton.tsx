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
      } text-[1.1rem] text-white rounded-full px-6 py-2 capitalize font-[550] whitespace-nowrap flex items-center`}
    >
      {children}
    </button>
  );
};

export default QAButton;
