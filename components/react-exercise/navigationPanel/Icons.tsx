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
    handleIsNavPanelOpen,
  } = useContext(ReactExerciseCtx);

  const reset = () => {
    setCompletedExercises({});
    setCurrentExerciseNumber(1);
    setCurrentExerciseBlock(1);
    appDispatch(setShouldTimerBeResetToTrue());
  };

  return (
    <div className=' bg-white py-4 lg:py-3'>
      <div className='mx-auto flex max-w-[80%] items-center justify-between lg:max-w-[85%]'>
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
            onClick={() => handleIsNavPanelOpen.toggleBooleanState()}
          />
        </abbr>
      </div>
    </div>
  );
};

export default Icons;
