import { useContext } from 'react';
import { ReactExerciseCtx } from '../../../pages/react-exercise';
import { ExercisesData } from '../types';

type Exercise = ExercisesData['data'][number];

type ExerciseBlockProps = {
  exerciseData: Exercise;
};

const isVisible = true;

const ExerciseBlock = ({ exerciseData }: ExerciseBlockProps) => {
  const reactExerciseContext = useContext(ReactExerciseCtx);
  const exerciseBlockId = exerciseData.id;

  return (
    <>
      <div
        onClick={() =>
          reactExerciseContext?.setCurrentExerciseBlock(exerciseBlockId)
        }
        className='capitalize text-slate-300 hover:text-white text-lg border-b-2 border-black px-7 py-3 cursor-pointer'
      >
        {exerciseData.name}
      </div>
      <ul>
        {reactExerciseContext?.currentExerciseBlock === exerciseBlockId &&
          exerciseData.exercises.map((blockExercise) => {
            return (
              <li
                key={blockExercise.id}
                className='bg-white text-sm px-7 py-3 hover:bg-slate-200 cursor-pointer'
              >
                Exercise {blockExercise.exerciseNumber}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default ExerciseBlock;
