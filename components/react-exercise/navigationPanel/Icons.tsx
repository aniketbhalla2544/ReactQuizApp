import { HomeIcon, TrashIcon, XIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useContext } from 'react';
import { ReactExerciseCtx } from '../../../pages/react-exercise';
import { SetStateType } from '../types';

const iconStyle = 'w-6 h-auto text-slate-700';
const cursorIconStyle = `${iconStyle} cursor-pointer`;

type IconsProps = {
  handleCompletedExercises: () => void;
};

const Icons = ({ handleCompletedExercises }: IconsProps) => {
  const reactExercCtx = useContext(ReactExerciseCtx);

  return (
    <div className='flex justify-between items-center px-3 py-2 bg-white'>
      <Link href='/'>
        <a target='_blank'>
          <HomeIcon className={iconStyle} />
        </a>
      </Link>
      <TrashIcon
        className={cursorIconStyle}
        onClick={handleCompletedExercises}
      />
      <XIcon
        className={cursorIconStyle}
        onClick={() => reactExercCtx?.toggleIsNavPanelOpen()}
      />
    </div>
  );
};

export default Icons;
