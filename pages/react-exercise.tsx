import { ErrorBoundary } from 'react-error-boundary';
import { createContext, useEffect, useState } from 'react';
import NavigationPanel from '../components/react-exercise/navigationPanel/NavigationPanel';
import QAPanel from '../components/react-exercise/qaPanel/QAPanel';
import {
  ExercisesData,
  SetStateType,
} from '../components/react-exercise/types';
import useToggle from '../hooks/useToggle';
import ErrorFallback from '../components/ErrorFallback';
import exercisesData from '../components/react-exercise/data/exercises';

type ReactExerciseContextInterface = {
  currentExerciseBlock: number;
  setCurrentExerciseBlock: SetStateType<number>;
  currentExerciseNumber: number;
  setCurrentExerciseNumber: SetStateType<number>;
  isNavPanelOpen: boolean;
  toggleIsNavPanelOpen: () => void;
  totalExerciseBlocks: number;
  totalExercises: number;
  canGoToNextExerciseBlock: boolean;
  canGoToNextExercise: boolean;
  completedExercises: number[];
  setCompletedExercises: SetStateType<number[]>;
};

export const ReactExerciseCtx =
  createContext<ReactExerciseContextInterface | null>(null);

const ReactExercisePage = () => {
  const [exercises] = useState<ExercisesData>(exercisesData);
  const [currentExerciseNumber, setCurrentExerciseNumber] = useState<number>(1);
  const [currentExerciseBlock, setCurrentExerciseBlock] = useState<number>(1);
  const [isNavPanelOpen, toggleIsNavPanelOpen] = useToggle(true);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const totalExerciseBlocks: number = exercises.data.length;
  const totalExercises: number = exercises.meta.totalExercises;
  const canGoToNextExerciseBlock: boolean =
    totalExerciseBlocks === currentExerciseBlock ? false : true;
  const canGoToNextExercise: boolean =
    totalExercises === currentExerciseNumber ? false : true;

  return (
    <div className='flex'>
      <ReactExerciseCtx.Provider
        value={{
          currentExerciseBlock,
          setCurrentExerciseBlock,
          currentExerciseNumber,
          setCurrentExerciseNumber,
          isNavPanelOpen,
          toggleIsNavPanelOpen,
          totalExerciseBlocks,
          totalExercises,
          canGoToNextExerciseBlock,
          canGoToNextExercise,
          completedExercises,
          setCompletedExercises,
        }}
      >
        {isNavPanelOpen && (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <NavigationPanel exercises={exercises}></NavigationPanel>
          </ErrorBoundary>
        )}
        <QAPanel></QAPanel>
      </ReactExerciseCtx.Provider>
    </div>
  );
};

export default ReactExercisePage;
