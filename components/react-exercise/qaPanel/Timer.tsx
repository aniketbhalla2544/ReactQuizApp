import { useEffect, useRef, useState } from 'react';
import { updateCurrentUserTime } from '../../../features/CurrentUserSlice';
import { useAppDispatch } from '../../../hooks/reduxHooks';

type TimerProps = {
  shouldTimerBeStopped: boolean;
};

const Timer = ({ shouldTimerBeStopped }: TimerProps) => {
  const [sec, setSec] = useState<number>(0);
  const [mins, setMins] = useState<number>(0);
  const [hrs, setHrs] = useState<number>(0);
  const intervalId = useRef<NodeJS.Timer>();
  const appDispatch = useAppDispatch();
  const counter = useRef<number>(1);
  const hasTimeDataDispatched = useRef(false);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      if (counter.current < 62) {
        counter.current++;
      }
      setSec((prevSec) => {
        if (prevSec === 59) {
          return 0;
        } else {
          return prevSec + 1;
        }
      });
    }, 1000);
  }, []);

  // !! timer stops here
  useEffect(() => {
    return () => {
      if (shouldTimerBeStopped && intervalId.current) {
        clearInterval(intervalId.current);
        if (!hasTimeDataDispatched.current) {
          // console.log('time dispatched!');
          appDispatch(
            updateCurrentUserTime({
              hrs: hrs,
              mins: mins,
              sec: sec,
            })
          );
        }
        hasTimeDataDispatched.current = true;
      }
    };
  });

  useEffect(() => {
    if (sec === 0 && counter.current > 60) {
      setMins((prevMins) => {
        if (prevMins === 59) {
          return 0;
        } else {
          return prevMins + 1;
        }
      });
    }
  }, [sec]);

  useEffect(() => {
    if (mins === 0 && counter.current > 60) {
      setHrs((hrs) => hrs + 1);
    }
  }, [mins]);

  return (
    <p className='text-lg font-semibold '>
      <span
        className={`${
          shouldTimerBeStopped
            ? 'inline-block px-3 py-1 rounded-md bg-red-100'
            : ''
        }`}
      >
        {hrs} : {mins} : {sec}
      </span>
    </p>
  );
};

export default Timer;
