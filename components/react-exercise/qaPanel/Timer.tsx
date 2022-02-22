import { useEffect, useRef, useState } from 'react';

type TimerProps = {
  shouldTimerBeStopped: boolean;
};

const Timer = ({ shouldTimerBeStopped }: TimerProps) => {
  const [sec, setSec] = useState<number>(0);
  const [mins, setMins] = useState<number>(0);
  const [hrs, setHrs] = useState<number>(0);
  const counter = useRef<number>(1);
  const intervalId = useRef<NodeJS.Timer>();

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
    return () => {
      if (shouldTimerBeStopped && intervalId.current) {
        clearInterval(intervalId.current);
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
