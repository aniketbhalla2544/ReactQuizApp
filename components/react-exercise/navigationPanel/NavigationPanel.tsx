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
  const completedExercisesLength = Object.keys(completedExercises).length;
  const hasUserCompletedAllExercises =
    completedExercisesLength === totalExercises;
  const bgColor = hasUserCompletedAllExercises
    ? 'bg-green-300'
    : 'bg-neutral-200';

  return (
    <div className='fixed left-0 top-0 bottom-0 z-50 max-h-screen min-w-[70vw] bg-neutral-800 shadow-2xl lg:min-w-[20vw]'>
      <Icons />
      <section className={`px-5 py-4 ${bgColor}`}>
        <p className='text-center'>
          {hasUserCompletedAllExercises ? (
            <span>{`You've completed all exercises🎉`}</span>
          ) : (
            <span>
              Completed {completedExercisesLength} of {totalExercises}{' '}
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
