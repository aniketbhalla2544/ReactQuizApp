import { useEffect, useRef, useState } from 'react';
import { updateCurrentUserTime } from '../../../features/CurrentUserSlice';
import { setShouldTimerBeResetToFalse } from '../../../features/TimerState';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';

type setTimeoutIdType = ReturnType<typeof setTimeout>;

const Timer = () => {
  const [sec, setSec] = useState<number>(0);
  const [mins, setMins] = useState<number>(0);
  const [hrs, setHrs] = useState<number>(0);
  const intervalId = useRef<NodeJS.Timer>();
  const setTimeoutId = useRef<setTimeoutIdType>();
  const appDispatch = useAppDispatch();
  const counter = useRef<number>(1);
  const hasTimeDataDispatched = useRef(false);

  const shouldTimerBeStopped = useAppSelector(
    (state) => state.timerState.shouldTimerBeStopped
  );
  const shouldTimerBeReset = useAppSelector(
    (state) => state.timerState.shouldTimerBeReset
  );

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

  useEffect(() => {
    if (shouldTimerBeReset) {
      setSec(0);
      setMins(0);
      setHrs(0);
      counter.current = 1;
      setTimeoutId.current = setTimeout(() => {
        appDispatch(setShouldTimerBeResetToFalse());
      }, 50);
    }

    return () => {
      clearTimeout(setTimeoutId.current as setTimeoutIdType);
    };
  }, [shouldTimerBeReset, appDispatch]);

  useEffect(() => {
    return () => {
      if (shouldTimerBeStopped && intervalId.current) {
        clearInterval(intervalId.current);
        if (!hasTimeDataDispatched.current) {
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
    if (!shouldTimerBeReset) {
      if (sec === 0 && counter.current > 60) {
        setMins((prevMins) => {
          if (prevMins === 59) {
            return 0;
          } else {
            return prevMins + 1;
          }
        });
      }
    }
  }, [sec, shouldTimerBeReset]);

  useEffect(() => {
    if (!shouldTimerBeReset) {
      if (mins === 0 && counter.current > 60) {
        setHrs((hrs) => hrs + 1);
      }
    }
  }, [mins, shouldTimerBeReset]);

  return (
    <p className='text-lg font-semibold'>
      <span
        className={`${
          shouldTimerBeStopped
            ? 'inline-block rounded-lg bg-red-100 px-3 py-1'
            : ''
        }`}
      >
        {hrs} : {mins} : {sec}
      </span>
    </p>
  );
};

export default Timer;
