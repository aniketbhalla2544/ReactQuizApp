import { useContext, useState } from 'react';
import { ReactExerciseCtx } from '../../../pages/react-exercise';
import { ExercisesData } from '../types';
import ExerciseBlocks from './ExerciseBlocks';
import Icons from './Icons';

interface NavPanelProps {
  exercises: ExercisesData;
}

const NavigationPanel = ({ exercises }: NavPanelProps) => {
  const reactCtx = useContext(ReactExerciseCtx);

  return (
    <div className='shadow-2xl bg-neutral-800 min-h-screen'>
      <Icons />
      <div className='px-5 py-4 bg-neutral-200'>
        <p className='text-center'>
          Completed {reactCtx?.completedExercises.length} of {reactCtx?.totalExercises}{' '}
          Exercises:{' '}
        </p>
      </div>

      <ExerciseBlocks exercisesData={exercises.data} />
    </div>
  );
};

export default NavigationPanel;
