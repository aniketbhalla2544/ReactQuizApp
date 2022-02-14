import { CheckIcon } from '@heroicons/react/solid';
import { useContext } from 'react';
import { ReactExerciseCtx } from '../../../pages/react-exercise';
import { ExercisesData } from '../types';

type Exercise = ExercisesData['data'][number];

type ExerciseBlockProps = {
  exerciseData: Exercise;
};

const isVisible = true;

const ExerciseBlock = ({
  exerciseData: { id, name, exercises },
}: ExerciseBlockProps) => {
  const reactExerciseContext = useContext(ReactExerciseCtx);
  const exerciseBlockId = id;

  const isBlockExerciseCompleted = (exerciseNumber: number): boolean => {
    return (
      reactExerciseContext?.completedExercises.includes(exerciseNumber) ?? false
    );
  };
  const onBlockExerciseClick = (exerciseNumber: number) => {
    reactExerciseContext?.setCurrentExerciseNumber(exerciseNumber);
  };
  const areCurrentAndBlockExerciseNumberSame = (
    exerciseNumber: number
  ): boolean => {
    return reactExerciseContext?.currentExerciseNumber === exerciseNumber;
  };

  return (
    <>
      <section
        onClick={() =>
          reactExerciseContext?.setCurrentExerciseBlock(exerciseBlockId)
        }
        className='capitalize text-slate-300 hover:text-white text-lg border-b-2 border-black px-7 py-3 cursor-pointer'
      >
        {name}
      </section>
      <ul>
        {reactExerciseContext?.currentExerciseBlock === exerciseBlockId &&
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
                <span>
                  Exercise ({blockExercise.exerciseNumber}) {index + 1}
                </span>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default ExerciseBlock;
