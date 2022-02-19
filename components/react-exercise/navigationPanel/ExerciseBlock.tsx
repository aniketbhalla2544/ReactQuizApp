import { CheckIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useContext } from 'react';
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
  } = useContext(ReactExerciseCtx);
  const exerciseBlockId = id;

  const isBlockExerciseCompleted = (exerciseNumber: number): boolean => {
    return completedExercises.includes(exerciseNumber);
  };
  const onBlockExerciseClick = (exerciseNumber: number) => {
    setCurrentExerciseNumber(exerciseNumber);
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
        className='relative capitalize text-slate-300 hover:text-white text-lg border-b-2 border-black px-7 py-3 cursor-pointer'
      >
        {areCurrentAndBlockNumberSame && (
          <ChevronRightIcon className='absolute top-1/3 -translate-x-5 inline w-5' />
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
                }  text-sm px-7 py-3  cursor-pointer tracking-wider whitespace-nowrap`}
              >
                {/* Exercise {index + 1} */}
                {isBlockExerciseCompleted(blockExercise.exerciseNumber) && (
                  <span>
                    <CheckIcon
                      className={`${
                        areCurrentAndBlockExerciseNumberSame(
                          blockExercise.exerciseNumber
                        )
                          ? 'text-white'
                          : 'text-green-700'
                      } inline mr-1 w-5 h-auto font-extrabold -translate-y-[0.098rem]`}
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
