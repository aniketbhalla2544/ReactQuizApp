import { ChevronRightIcon } from '@heroicons/react/solid';
import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { ReactExerciseCtx } from '../../../pages/react-exercise';
import QAButton from './QAButton';
import { SetStateType } from '../types';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { StateBooleanHandler } from '../../../hooks/useBooleanStateController';

interface QAModelProps {
  isUserTrying: boolean;
  isAnswerCorrect: boolean;
  canShowAns: boolean;
  quesText: string | JSX.Element;
  children: React.ReactNode;
  handleAnsSubmittion: (didUserSeeAnswer: boolean) => void;
  handleCanShowAns: StateBooleanHandler;
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

  const didUserSeeAnswer = useRef(false);
  const hasUserCompletedAllExercises =
    Object.keys(completedExercises).length === totalExercises;
  const isUserAtLastExercise = currentExerciseNumber === totalExercises;
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  const onShowAnsClick = () => {
    didUserSeeAnswer.current = true;
    handleCanShowAns.toggleBooleanState();
  };

  useEffect(() => {
    didUserSeeAnswer.current = false;
  }, [quesText]);

  return (
    <section>
      <div>
        <pre
          id='ques'
          className={`${
            quesText instanceof Object ? 'leading-[1.8]' : 'leading-normal'
          } mb-5 max-w-full whitespace-pre-wrap text-base text-black lg:mb-4 lg:text-lg`}
        >
          {quesText}
        </pre>
        <div
          id='quesWrapper'
          className={`${
            !isUserTrying && (isAnswerCorrect ? 'bg-green-100' : 'bg-red-200')
          } ${isUserTrying && 'bg-gray-200'} mb-8 rounded-lg px-5 py-5 lg:py-8`}
        >
          {!isUserTrying ? (
            <div
              className={`${
                isAnswerCorrect ? 'text-green-500' : 'text-red-500'
              }  py-[2em] pl-5 text-3xl capitalize`}
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
                  handleAnsSubmittion(didUserSeeAnswer.current);
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
                      // toggleIsUserAlertModalOpen();
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
                  <ChevronRightIcon
                    className={`${
                      isLargeScreen ? 'w-6 translate-y-[0.1rem]' : 'w-5'
                    } m-0 h-auto  p-0`}
                  />
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
    </section>
  );
};

const MemoizedQAModal = memo(QAModel);

export default MemoizedQAModal;
