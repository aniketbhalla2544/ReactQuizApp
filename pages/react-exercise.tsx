import { ErrorBoundary } from 'react-error-boundary';
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import NavigationPanel from '../components/react-exercise/navigationPanel/NavigationPanel';
import QAPanel from '../components/react-exercise/qaPanel/QAPanel';
import {
  ExercisesData,
  SetStateType,
} from '../components/react-exercise/types';
import useToggle from '../hooks/useToggle';
import ErrorFallback from '../components/ErrorFallback';
import exercisesData from '../components/react-exercise/data/exercises';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  resetCurrentUser,
  updateCurrentUserName,
} from '../features/CurrentUserSlice';
import UserQuizStartForm from '../components/react-exercise/userForm/UserQuizStartForm';

type CompletedExercise = {
  exerciseNumber: number;
  scores: 0 | 1;
};

// !! narrow down type of key from string to range of number types
export type CompletedExercises = {
  [key: string]: CompletedExercise;
};

type ReactExerciseContextInterface = {
  currentExerciseBlock: number;
  setCurrentExerciseBlock: SetStateType<number>;
  currentExerciseNumber: number;
  setCurrentExerciseNumber: SetStateType<number>;
  isNavPanelOpen: boolean;
  toggleIsNavPanelOpen: () => void;
  totalExerciseBlocks: number;
  totalExercises: number;
  completedExercises: CompletedExercises;
  setCompletedExercises: SetStateType<CompletedExercises>;
};

export const ReactExerciseCtx = createContext<ReactExerciseContextInterface>(
  null!
);

const ReactExercisePage = () => {
  const [exercises] = useState<ExercisesData>(exercisesData);
  const [currentExerciseNumber, setCurrentExerciseNumber] = useState<number>(1);
  const [currentExerciseBlock, setCurrentExerciseBlock] = useState<number>(1);
  const [isNavPanelOpen, toggleIsNavPanelOpen] = useToggle(true);
  const [completedExercises, setCompletedExercises] =
    useState<CompletedExercises>({});
  const totalExerciseBlocks: number = exercises.data.length;
  const totalExercises: number = exercises.meta.totalExercises;
  const [isUserFormOpen, toggleIsUserFormOpen] = useToggle(true);
  const appDispatch = useAppDispatch();

  const onUserFormSubmittion = useCallback(
    (userName: string) => {
      toggleIsUserFormOpen();
      appDispatch(updateCurrentUserName(userName));
    },
    [toggleIsUserFormOpen, appDispatch]
  );

  useEffect(() => {
    if (isUserFormOpen) {
      appDispatch(resetCurrentUser());
    }
  }, [isUserFormOpen, appDispatch]);

  return (
    <>
      <UserQuizStartForm
        isUserFormOpen={isUserFormOpen}
        toggleIsUserFormOpen={toggleIsUserFormOpen}
        onUserFormSubmittion={onUserFormSubmittion}
      />
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
            completedExercises,
            setCompletedExercises,
          }}
        >
          {isNavPanelOpen && (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <NavigationPanel exercises={exercises}></NavigationPanel>
            </ErrorBoundary>
          )}
          {!isUserFormOpen && <QAPanel />}
        </ReactExerciseCtx.Provider>
      </div>
    </>
  );
};

export default ReactExercisePage;
