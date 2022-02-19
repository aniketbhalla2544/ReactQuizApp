import { useContext, useState } from 'react';
import { ReactExerciseCtx } from '../../../pages/react-exercise';
import { ExercisesData } from '../types';
import ExerciseBlocks from './ExerciseBlocks';
import Icons from './Icons';

interface NavPanelProps {
  exercises: ExercisesData;
}

const NavigationPanel = ({ exercises }: NavPanelProps) => {
  const { completedExercises, totalExercises } = useContext(ReactExerciseCtx);
  const hasUserCompletedAllExercises =
    completedExercises.length === totalExercises;
  const bgColor = hasUserCompletedAllExercises
    ? 'bg-green-300'
    : 'bg-neutral-200';

  return (
    <div className='shadow-2xl bg-neutral-800 min-h-screen'>
      <Icons />
      <section className={`px-5 py-4 ${bgColor}`}>
        <p className='text-center'>
          {hasUserCompletedAllExercises ? (
            <span>{`You've completed all Exercises🎉`}</span>
          ) : (
            <span>
              Completed {completedExercises.length} of {totalExercises}{' '}
              Exercises:{' '}
            </span>
          )}
        </p>
      </section>
      <ExerciseBlocks exercisesData={exercises.data} />
    </div>
  );
};

export default NavigationPanel;
