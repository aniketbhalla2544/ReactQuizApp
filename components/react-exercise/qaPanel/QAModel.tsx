import { ChevronRightIcon } from '@heroicons/react/solid';
import { useContext, useState } from 'react';
import { ReactExerciseCtx } from '../../../pages/react-exercise';
import QAButton from './QAButton';
import { SetStateType } from '../types';

interface QAModelProps {
  isUserTrying: boolean;
  isAnswerCorrect: boolean;
  canShowAns: boolean;
  quesText: string;
  children: React.ReactNode;
  handleAnsSubmittion: () => void;
  handleCanShowAns: SetStateType<boolean>;
  setIsUserTrying: SetStateType<boolean>;
}

const QAModel = ({
  quesText,
  canShowAns,
  isUserTrying,
  isAnswerCorrect,
  children,
  handleAnsSubmittion,
  handleCanShowAns,
  setIsUserTrying,
}: QAModelProps) => {
  const reactExCtx = useContext(ReactExerciseCtx);

  return (
    <div>
      <pre className='text-black text-base font-medium mb-4'>{quesText}</pre>
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
            {children}
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
