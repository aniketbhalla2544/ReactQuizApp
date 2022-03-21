import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import NavigationPanel from '../components/react-exercise/navigationPanel/NavigationPanel';
import QAPanel from '../components/react-exercise/qaPanel/QAPanel';
import {
  ExercisesData,
  SetStateType,
} from '../components/react-exercise/types';
import useToggle from '../hooks/useToggle';
import exercisesData from '../components/react-exercise/data/exercises';
import { useAppDispatch } from '../hooks/reduxHooks';
import {
  resetCurrentUser,
  updateCurrentUserName,
} from '../features/CurrentUserSlice';
import UserQuizStartForm from '../components/react-exercise/userForm/UserQuizStartForm';
import {
  setShouldTimerBeResetToFalse,
  setShouldTimerBeStoppedToFalse,
} from '../features/TimerState';
import useInititalRender from '../hooks/useInititalRender';
import useMediaQuery from '../hooks/useMediaQuery';
import useBooleanStateController, {
  StateBooleanHandler,
} from '../hooks/useBooleanStateController';

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
  handleIsNavPanelOpen: StateBooleanHandler;
  totalExerciseBlocks: number;
  totalExercises: number;
  completedExercises: CompletedExercises;
  setCompletedExercises: SetStateType<CompletedExercises>;
  canShowAns: boolean;
  handleCanShowAns: StateBooleanHandler;
};

export const ReactExerciseCtx = createContext<ReactExerciseContextInterface>(
  null!
);

const ReactExercisePage = () => {
  const [exercises] = useState<ExercisesData>(exercisesData);
  const [currentExerciseNumber, setCurrentExerciseNumber] = useState(1);
  const [currentExerciseBlock, setCurrentExerciseBlock] = useState(1);
  const isItInitialRender = useInititalRender();
  const [completedExercises, setCompletedExercises] =
    useState<CompletedExercises>({});
  const [canShowAns, handleCanShowAns] = useBooleanStateController(false);
  const totalExerciseBlocks: number = exercises.data.length;
  const totalExercises: number = exercises.meta.totalExercises;
  const [isUserFormOpen, toggleIsUserFormOpen] = useToggle(true);
  const appDispatch = useAppDispatch();
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const [isNavPanelOpen, handleIsNavPanelOpen] =
    useBooleanStateController(isLargeScreen);

  const onUserFormSubmittion = useCallback(
    (userName: string) => {
      toggleIsUserFormOpen();
      appDispatch(updateCurrentUserName(userName));
    },
    [toggleIsUserFormOpen, appDispatch]
  );

  useEffect(() => {
    if (isLargeScreen) {
      handleIsNavPanelOpen.setBooleanStateTrue();
    } else {
      handleIsNavPanelOpen.setBooleanStateFalse();
    }
  }, [isLargeScreen, handleIsNavPanelOpen]);

  useEffect(() => {
    if (isItInitialRender) {
      appDispatch(resetCurrentUser());
      appDispatch(setShouldTimerBeStoppedToFalse());
      appDispatch(setShouldTimerBeResetToFalse());
    }
  }, [isItInitialRender, appDispatch]);

  return (
    <section className='overflow-x-hidden'>
      <UserQuizStartForm
        isUserFormOpen={isUserFormOpen}
        toggleIsUserFormOpen={toggleIsUserFormOpen}
        onUserFormSubmittion={onUserFormSubmittion}
      />
      <div className=''>
        <ReactExerciseCtx.Provider
          value={{
            currentExerciseBlock,
            setCurrentExerciseBlock,
            currentExerciseNumber,
            setCurrentExerciseNumber,
            totalExerciseBlocks,
            totalExercises,
            completedExercises,
            setCompletedExercises,
            isNavPanelOpen,
            handleIsNavPanelOpen,
            canShowAns,
            handleCanShowAns,
          }}
        >
          {isNavPanelOpen && (
            <NavigationPanel exercises={exercises}></NavigationPanel>
          )}
          {!isUserFormOpen && <QAPanel />}
        </ReactExerciseCtx.Provider>
      </div>
    </section>
  );
};

export default ReactExercisePage;
