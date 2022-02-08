import { createContext, useState } from 'react';
import exercisesData from '../data/exercises';
import { ExercisesData, SetStateType } from '../types';
import ExerciseBlocks from './ExerciseBlocks';
import Icons from './Icons';

const NavigationPanel = () => {
  const [exercises] = useState<ExercisesData>(exercisesData);
  const [completedExercises, setCompletedExercises] = useState<number>(0);
  const totalExercises = exercises.meta.totalExercises;

  const handleCompletedExercises = () => {
    setCompletedExercises(0);
  };

  return (
    <div className='shadow-2xl bg-neutral-800 min-h-screen'>
      <Icons handleCompletedExercises={handleCompletedExercises} />
      <div className='px-5 py-4 bg-neutral-200 text-sm'>
        <p>
          Completed {completedExercises} of {totalExercises} Exercises:{' '}
        </p>
      </div>

      <ExerciseBlocks exercisesData={exercises.data} />
    </div>
  );
};

export default NavigationPanel;
