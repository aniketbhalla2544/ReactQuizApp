import { HomeIcon, TrashIcon, XIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useContext } from 'react';
import { ReactExerciseCtx } from '../../../pages/react-exercise';
import { SetStateType } from '../types';

const iconStyle = 'w-6 h-auto text-slate-700';
const cursorIconStyle = `${iconStyle} cursor-pointer`;

const Icons = () => {
  const { setCompletedExercises, toggleIsNavPanelOpen } =
    useContext(ReactExerciseCtx);

  return (
    <div className='flex justify-between items-center px-3 py-2 bg-white'>
      <abbr title='Back To Home'>
        <Link href='/'>
          <a target='_blank'>
            <HomeIcon className={iconStyle} />
          </a>
        </Link>
      </abbr>

      <abbr title='Reset Score'>
        <TrashIcon
          className={cursorIconStyle}
          onClick={() => {
            setCompletedExercises([]);
          }}
        />
      </abbr>

      <abbr title='Close This Menu'>
        <XIcon
          className={cursorIconStyle}
          onClick={() => toggleIsNavPanelOpen()}
        />
      </abbr>
    </div>
  );
};

export default Icons;
