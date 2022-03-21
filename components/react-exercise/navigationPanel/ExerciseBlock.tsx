import { CheckIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useContext } from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { ReactExerciseCtx } from '../../../pages/react-exercise';
import { ExercisesData } from '../types';

type Exercise = ExercisesData['data'][number];

type ExerciseBlockProps = {
  exerciseData: Exercise;
};

const ExerciseBlock = ({
  exerciseData: { id, name, exercises },
}: ExerciseBlockProps) => {
  const {
    completedExercises,
    currentExerciseNumber,
    setCurrentExerciseNumber,
    currentExerciseBlock,
    setCurrentExerciseBlock,
    handleIsNavPanelOpen,
    handleCanShowAns,
  } = useContext(ReactExerciseCtx);

  const exerciseBlockId = id;
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  const isBlockExerciseCompleted = (exerciseNumber: number): boolean => {
    return Object.keys(completedExercises).includes(`${exerciseNumber}`);
  };
  const onBlockExerciseClick = (exerciseNumber: number) => {
    setCurrentExerciseNumber(exerciseNumber);
    !isLargeScreen && handleIsNavPanelOpen.setBooleanStateFalse();
    handleCanShowAns.setBooleanStateFalse();
  };
  const areCurrentAndBlockExerciseNumberSame = (
    exerciseNumber: number
  ): boolean => {
    return currentExerciseNumber === exerciseNumber;
  };
  const areCurrentAndBlockNumberSame: boolean =
    exerciseBlockId === currentExerciseBlock;

  return (
    <>
      <section
        onClick={() => setCurrentExerciseBlock(exerciseBlockId)}
        className='relative cursor-pointer border-b-2 border-black px-7 py-3 text-lg capitalize text-slate-300 hover:text-white'
      >
        {areCurrentAndBlockNumberSame && (
          <ChevronRightIcon className='absolute top-1/3 inline w-5 -translate-x-5' />
        )}

        {name}
      </section>
      <ul>
        {currentExerciseBlock === exerciseBlockId &&
          exercises.map((blockExercise, index) => {
            return (
              <li
                key={blockExercise.id}
                onClick={() =>
                  onBlockExerciseClick(blockExercise.exerciseNumber)
                }
                className={`${
                  areCurrentAndBlockExerciseNumberSame(
                    blockExercise.exerciseNumber
                  )
                    ? 'bg-green-600 text-white'
                    : 'bg-white hover:bg-slate-200'
                }  cursor-pointer whitespace-nowrap px-7  py-3 text-sm tracking-wider`}
              >
                {isBlockExerciseCompleted(blockExercise.exerciseNumber) && (
                  <span>
                    <CheckIcon
                      className={`${
                        areCurrentAndBlockExerciseNumberSame(
                          blockExercise.exerciseNumber
                        )
                          ? 'text-white'
                          : 'text-green-700'
                      } mr-1 inline h-auto w-5 -translate-y-[0.098rem] font-extrabold`}
                    />
                  </span>
                )}
                <span>Exercise {index + 1}</span>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default ExerciseBlock;
