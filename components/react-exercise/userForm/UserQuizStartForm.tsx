import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useFormInputs } from '../../../hooks/useFormInputs';
import Modal from '../../reusable-components/Modal';

interface UserQuizStartFormProps {
  isUserFormOpen: boolean;
  toggleIsUserFormOpen: () => void;
  onUserFormSubmittion: (userName: string) => void;
}

const UserQuizStartForm = ({
  isUserFormOpen,
  toggleIsUserFormOpen,
  onUserFormSubmittion,
}: UserQuizStartFormProps) => {
  const [userFormInputStore, userFormDispatch] = useFormInputs();
  const firstnameInputRef = useRef<HTMLInputElement | null>(null);
  const lastnameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (userFormInputStore.autoFocusInputName === 'firstname') {
      firstnameInputRef.current?.focus();
    } else {
      lastnameInputRef.current?.focus();
    }
  }, [userFormInputStore]);

  return (
    <Modal
      isOpen={isUserFormOpen}
      isOpenToggler={toggleIsUserFormOpen}
      width='max-w-1/2 lg:w-[30%]'
      position='top-[5%] lg:top-[15%] left-[10%] lg:left-[40%]'
    >
      <section className='mt-10 pt-6'>
        <form
          className='flex flex-col items-stretch justify-start gap-y-10'
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            const userName: string = `${userFormInputStore.firstname.trim()} ${userFormInputStore.lastname.trim()}`;
            onUserFormSubmittion(userName);
          }}
        >
          <h1 className="font-['Raleway'] text-4xl font-semibold capitalize">
            welcome!
          </h1>
          <div>
            <label className='mb-1 block text-sm capitalize'>first name</label>
            <input
              required
              min={1}
              max={12}
              ref={firstnameInputRef}
              className='block w-full rounded-lg border-[3px] py-2 px-3 text-lg font-semibold text-green-700 in-range:border-green-500 out-of-range:border-red-500'
              type='text'
              name='firstname'
              value={userFormInputStore?.firstname ?? ''}
              onChange={userFormDispatch}
              maxLength={15}
            />
          </div>
          <div>
            <label className='mb-1 block text-sm capitalize'>last name</label>
            <input
              required
              min={1}
              max={12}
              ref={lastnameInputRef}
              className='block w-full rounded-lg border-[3px] py-2 px-3 text-lg font-semibold text-green-700 in-range:border-green-500 out-of-range:border-red-500'
              type='text'
              name='lastname'
              value={userFormInputStore?.lastname ?? ''}
              onChange={userFormDispatch}
              maxLength={15}
            />
          </div>
          <button
            className='block rounded-lg bg-green-600 py-4 text-lg font-semibold uppercase text-white hover:bg-green-700'
            type='submit'
          >
            submit
          </button>
        </form>
        <p className='mx-auto mt-5 max-w-[30ch]  text-center text-gray-600'>
          Filling above information is required to start your quiz.
        </p>
        <p className='mt-16 text-center text-gray-600'>
          {`Don't`} <span>want to do quiz? </span>
          <Link href='/'>
            <a className='font-semibold capitalize text-black'>back to home</a>
          </Link>
        </p>
      </section>
    </Modal>
  );
};

export default UserQuizStartForm;
