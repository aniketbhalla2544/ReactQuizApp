import { ErrorBoundary } from 'react-error-boundary';
import React, { createContext, useEffect, useRef, useState } from 'react';
import NavigationPanel from '../components/react-exercise/navigationPanel/NavigationPanel';
import QAPanel from '../components/react-exercise/qaPanel/QAPanel';
import {
  ExercisesData,
  SetStateType,
} from '../components/react-exercise/types';
import useToggle from '../hooks/useToggle';
import ErrorFallback from '../components/ErrorFallback';
import exercisesData from '../components/react-exercise/data/exercises';
import Modal from '../components/reusable-components/Modal';
import Link from 'next/link';
import { useFormInputs } from '../hooks/useFormInputs';

type ReactExerciseContextInterface = {
  currentExerciseBlock: number;
  setCurrentExerciseBlock: SetStateType<number>;
  currentExerciseNumber: number;
  setCurrentExerciseNumber: SetStateType<number>;
  isNavPanelOpen: boolean;
  toggleIsNavPanelOpen: () => void;
  totalExerciseBlocks: number;
  totalExercises: number;
  completedExercises: number[];
  setCompletedExercises: SetStateType<number[]>;
};

export const ReactExerciseCtx = createContext<ReactExerciseContextInterface>(
  null!
);

const ReactExercisePage = () => {
  const [exercises] = useState<ExercisesData>(exercisesData);
  const [currentExerciseNumber, setCurrentExerciseNumber] = useState<number>(1);
  const [currentExerciseBlock, setCurrentExerciseBlock] = useState<number>(1);
  const [isNavPanelOpen, toggleIsNavPanelOpen] = useToggle(true);
  const [isUserFormOpen, toggleIsUserFormOpen] = useToggle(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [userFormInputStore, userFormDispatch] = useFormInputs();
  const firstnameInputRef = useRef<HTMLInputElement | null>(null);
  const lastnameInputRef = useRef<HTMLInputElement | null>(null);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const totalExerciseBlocks: number = exercises.data.length;
  const totalExercises: number = exercises.data.at(-1)?.exercises.at(-1)
    ?.exerciseNumber as number;

  const onUserFormSubmittion = (e: React.FormEvent) => {
    const userName: string = `${userFormInputStore.firstname.trim()} ${userFormInputStore.lastname.trim()}`;
    e.preventDefault();
    toggleIsUserFormOpen();
    setUserName(userName);
  };

  useEffect(() => {
    toggleIsUserFormOpen();
    // console.log(firstnameInputRef.current);
  }, []);

  useEffect(() => {
    if (userFormInputStore.autoFocusInputName === 'firstname') {
      firstnameInputRef.current?.focus();
    } else {
      lastnameInputRef.current?.focus();
    }
  }, [userFormInputStore]);

  return (
    <>
      <Modal
        isOpen={isUserFormOpen}
        isOpenToggler={toggleIsUserFormOpen}
        width='w-[30%]'
        position='top-[6%] left-[40%]'
        isWithCrossButton
      >
        <section className='mt-10'>
          <form
            className='flex flex-col gap-y-10 justify-start items-stretch'
            onSubmit={onUserFormSubmittion}
          >
            <h1 className="capitalize text-4xl font-semibold font-['Raleway']">
              welcome!
            </h1>
            <div>
              <label className='block capitalize mb-1 text-sm'>
                first name
              </label>
              <input
                required
                min={1}
                max={12}
                ref={firstnameInputRef}
                className='in-range:border-green-500 out-of-range:border-red-500 text-lg block w-full border-[3px] rounded-md py-2 px-3 text-green-700 font-semibold'
                type='text'
                name='firstname'
                value={userFormInputStore?.firstname ?? ''}
                onChange={userFormDispatch}
                maxLength={15}
              />
            </div>
            <div>
              <label className='block capitalize mb-1 text-sm'>last name</label>
              <input
                required
                min={1}
                max={12}
                ref={lastnameInputRef}
                className='in-range:border-green-500 out-of-range:border-red-500 text-lg block w-full border-[3px] rounded-md py-2 px-3 text-green-700 font-semibold'
                type='text'
                name='lastname'
                value={userFormInputStore?.lastname ?? ''}
                onChange={userFormDispatch}
                maxLength={15}
              />
            </div>
            <button
              className='text-lg block bg-green-600 hover:bg-green-700 text-white py-4 rounded-md uppercase font-semibold'
              type='submit'
            >
              submit
            </button>
          </form>
          <p className='mt-5 text-center text-gray-600  max-w-[30ch] mx-auto'>
            Filling above information is required to start your quiz.
          </p>
          <p className='mt-16 text-gray-600 text-center'>
            {`Don't`} <span>want to do quiz? </span>
            <Link href='/'>
              <a className='text-black capitalize font-semibold'>
                back to home
              </a>
            </Link>
          </p>
        </section>
      </Modal>
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
          <QAPanel userName={userName} />
        </ReactExerciseCtx.Provider>
      </div>
    </>
  );
};

export default ReactExercisePage;
