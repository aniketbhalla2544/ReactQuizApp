import { ChevronRightIcon } from '@heroicons/react/solid';
import { useContext, useEffect, useRef, useState } from 'react';
import { ReactExerciseCtx } from '../../../pages/react-exercise';
import QAButton from './QAButton';
import { SetStateType } from '../types';
import useToggle from '../../../hooks/useToggle';

interface QAModelProps {
  isUserTrying: boolean;
  isAnswerCorrect: boolean;
  canShowAns: boolean;
  quesText: string;
  children: React.ReactNode;
  handleAnsSubmittion: () => void;
  handleCanShowAns: () => void;
  setIsUserTrying: SetStateType<boolean>;
  setIsAnswerCorrect: SetStateType<boolean>;
}

const QAModel = ({
  quesText,
  canShowAns,
  isUserTrying,
  isAnswerCorrect,
  setIsAnswerCorrect,
  children,
  handleAnsSubmittion,
  handleCanShowAns,
  setIsUserTrying,
}: QAModelProps) => {
  const {
    setCurrentExerciseBlock,
    currentExerciseNumber,
    setCurrentExerciseNumber,
    totalExercises,
    completedExercises,
  } = useContext(ReactExerciseCtx);
  const [hide] = useToggle();
  const [isUserAlertModalOpen, toggleIsUserAlertModalOpen] = useToggle(false); // alert to complete all other exercises at first place
  const hasUserCompletedAllExercises =
    completedExercises.length === totalExercises;
  const isUserAtLastExercise = currentExerciseNumber === totalExercises;
  const shouldSubmittionButtonVisible: boolean =
    (isUserAtLastExercise && isAnswerCorrect) || !canShowAns;

  const onShowAnsClick = () => {
    handleCanShowAns();
  };

  return (
    <>
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
              <QAButton
                color='bg-slate-700'
                mxAuto='ml-auto'
                onClick={onShowAnsClick}
              >
                {canShowAns ? 'hide answer' : 'show answer'}
              </QAButton>
            </>
          )}
        </div>
        {(isUserAtLastExercise && isAnswerCorrect) ||
          (!canShowAns && (
            <QAButton
              color='bg-green-600'
              mxAuto='mr-auto'
              onClick={() => {
                // if user is trying
                if (isUserTrying) {
                  handleAnsSubmittion();
                }
                // if user is not trying
                else {
                  // if ans is correct
                  if (isAnswerCorrect) {
                    if (isUserAtLastExercise && hasUserCompletedAllExercises) {
                      // toggleIsResultsModalOpen();
                    } else if (
                      isUserAtLastExercise &&
                      !hasUserCompletedAllExercises
                    ) {
                      // !! generate some other modal if user is at last exercise but haven't completed all exercises yet.
                      toggleIsUserAlertModalOpen();
                    } else {
                      setCurrentExerciseBlock(
                        (currentExerciseBlock) => currentExerciseBlock + 1
                      );
                      setCurrentExerciseNumber(
                        (currentExerciseNumber) => currentExerciseNumber + 1
                      );
                      setIsAnswerCorrect(false);
                    }
                  }
                  // if ans is  not correct
                  else {
                    setIsUserTrying(true);
                  }
                }
              }}
            >
              {isUserTrying && (
                <>
                  <span>submit answer</span>
                  <ChevronRightIcon className='w-6 h-auto m-0 p-0 translate-y-[0.1rem]' />
                </>
              )}
              {!isUserTrying &&
                (isAnswerCorrect ? (
                  <span>next exercise &nbsp;</span>
                ) : (
                  <span>try again &nbsp;</span>
                ))}
            </QAButton>
          ))}
      </div>
    </>
  );
};

export default QAModel;
