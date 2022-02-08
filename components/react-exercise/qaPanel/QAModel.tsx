import { ChevronRightIcon } from '@heroicons/react/solid';
import { useContext, useState } from 'react';
import useToggle from '../../../hooks/useToggle';
import { ReactExerciseCtx } from '../../../pages/react-exercise';
import QAButton from './QAButton';

type QAModelProps = {
  ques: string;
  ans: string;
};

const QAModel = ({ ques, ans }: QAModelProps) => {
  const reactExCtx = useContext(ReactExerciseCtx);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(true);
  const [isUserTrying, setIsUserTrying] = useState(true);
  const [userInput, setUserInput] = useState<string>('');
  const [canShowAns, handleCanShowAns] = useToggle(false);

  const handleAnsSubmittion = () => {
    setIsUserTrying(false);
    if (userInput === ans) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
  };

  return (
    <div>
      <p className='text-black text-lg font-medium mb-4'>{ques}</p>
      <div
        className={`${
          !isUserTrying && (isAnswerCorrect ? 'bg-green-100' : 'bg-red-200')
        } ${isUserTrying && 'bg-gray-200'} rounded-md py-8 px-5  mb-8`}
      >
        {!isUserTrying ? (
          <div
            className={`${
              isAnswerCorrect ? 'text-green-500' : 'text-red-500'
            }  text-3xl capitalize pl-5 py-[2em]`}
          >
            {isAnswerCorrect ? (
              <span>Correct!</span>
            ) : (
              <>
                <p className='mb-4'>Not Correct!</p>
                <p className='text-base font-semibold'>Try again.</p>
              </>
            )}
          </div>
        ) : (
          <>
            {/* --------------question------------------------------------------------------------------------------------------ */}
            <p className='p-2 text-black text-lg tracking-wide mb-10'>
              ReactDOM.
              <input
                value={canShowAns ? ans : userInput}
                type='text'
                maxLength={ans.length}
                className={
                  canShowAns ? 'text-rose-700 font-medium' : 'text-black'
                }
                onChange={(e) => setUserInput(e.target.value)}
              />
              {`(myElement, document.getElementById('root'))`};
            </p>
            {/* --------------question------------------------------------------------------------------------------------------ */}
            {/* 'show answer Button */}
            <QAButton
              color='bg-slate-700'
              mxAuto='ml-auto'
              onClick={handleCanShowAns}
            >
              {canShowAns ? 'hide answer' : 'show answer'}
            </QAButton>
          </>
        )}
      </div>
      {/* try again button */}
      {!canShowAns && (
        <QAButton
          color='bg-green-600'
          mxAuto='mr-auto'
          onClick={() => {
            if (isUserTrying) {
              handleAnsSubmittion();
            } else {
              if (isAnswerCorrect) {
                reactExCtx?.setCurrentExerciseBlock(
                  (currentExerciseBlock) => currentExerciseBlock + 1
                );
                reactExCtx?.setCurrentExerciseNumber(
                  (currentExerciseNumber) => currentExerciseNumber + 1
                );
              } else {
                setIsUserTrying(true);
              }
            }
          }}
        >
          {!isUserTrying &&
            (isAnswerCorrect ? (
              <span>next exercise &nbsp;</span>
            ) : (
              <span>try again &nbsp;</span>
            ))}
          {isUserTrying && (
            <>
              <span>submit answer</span>
              <ChevronRightIcon className='w-6 h-auto m-0 p-0 translate-y-[0.1rem]' />
            </>
          )}
        </QAButton>
      )}
    </div>
  );
};

export default QAModel;
