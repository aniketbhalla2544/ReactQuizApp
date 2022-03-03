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
      width='w-[30%]'
      position='top-[6%] left-[40%]'
    >
      <section className='mt-10 pt-6'>
        <form
          className='flex flex-col gap-y-10 justify-start items-stretch'
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            const userName: string = `${userFormInputStore.firstname.trim()} ${userFormInputStore.lastname.trim()}`;
            onUserFormSubmittion(userName);
          }}
        >
          <h1 className="capitalize text-4xl font-semibold font-['Raleway']">
            welcome!
          </h1>
          <div>
            <label className='block capitalize mb-1 text-sm'>first name</label>
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
            <a className='text-black capitalize font-semibold'>back to home</a>
          </Link>
        </p>
      </section>
    </Modal>
  );
};

export default UserQuizStartForm;
