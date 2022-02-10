import { ErrorBoundary } from 'react-error-boundary';
import { createContext, useEffect, useState } from 'react';
import NavigationPanel from '../components/react-exercise/navigationPanel/NavigationPanel';
import QAPanel from '../components/react-exercise/qaPanel/QAPanel';
import { SetStateType } from '../components/react-exercise/types';
import useToggle from '../hooks/useToggle';
import ErrorFallback from '../components/ErrorFallback';

type ReactExerciseContextInterface = {
  currentExerciseBlock: number;
  setCurrentExerciseBlock: SetStateType<number>;
  currentExerciseNumber: number;
  setCurrentExerciseNumber: SetStateType<number>;
  isNavPanelOpen: boolean;
  toggleIsNavPanelOpen: () => void;
};

export const ReactExerciseCtx =
  createContext<ReactExerciseContextInterface | null>(null);

const ReactExercise = () => {
  const [currentExerciseNumber, setCurrentExerciseNumber] = useState<number>(1);
  const [currentExerciseBlock, setCurrentExerciseBlock] = useState<number>(1);
  const [isNavPanelOpen, toggleIsNavPanelOpen] = useToggle(true);

  // useEffect(() => {
  //   console.log('currentExerciseNumber', currentExerciseNumber);
  //   console.log('currentExerciseBlock', currentExerciseBlock);
  // }, [currentExerciseNumber, currentExerciseBlock]);

  // useEffect(() => {
  //   console.log('isNavPanelOpen', isNavPanelOpen);
  // }, [isNavPanelOpen]);

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
        }}
      >
        {isNavPanelOpen && (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <NavigationPanel></NavigationPanel>
          </ErrorBoundary>
        )}
        <QAPanel></QAPanel>
      </ReactExerciseCtx.Provider>
    </div>
  );
};

export default ReactExercise;
