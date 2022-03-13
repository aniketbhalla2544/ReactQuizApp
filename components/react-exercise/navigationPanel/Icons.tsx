import { HomeIcon, RefreshIcon, XIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useContext } from 'react';
import { setShouldTimerBeResetToTrue } from '../../../features/TimerState';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { ReactExerciseCtx } from '../../../pages/react-exercise';

const iconStyle = 'w-6 h-auto text-slate-700';
const cursorIconStyle = `${iconStyle} cursor-pointer`;

const Icons = () => {
  const appDispatch = useAppDispatch();
  const {
    setCurrentExerciseBlock,
    setCurrentExerciseNumber,
    setCompletedExercises,
    toggleIsNavPanelOpen,
  } = useContext(ReactExerciseCtx);

  const reset = () => {
    setCompletedExercises({});
    setCurrentExerciseNumber(1);
    setCurrentExerciseBlock(1);
    appDispatch(setShouldTimerBeResetToTrue());
  };

  console.log('icons component rendered!');

  return (
    <div className='flex justify-between items-center px-3 py-3 bg-white'>
      <abbr title='Back To Home'>
        <Link href='/'>
          <a>
            <HomeIcon className={iconStyle} />
          </a>
        </Link>
      </abbr>

      <abbr title='Reset Score'>
        <RefreshIcon className={cursorIconStyle} onClick={reset} />
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
