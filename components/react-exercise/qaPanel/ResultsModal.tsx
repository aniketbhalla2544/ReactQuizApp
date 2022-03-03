import Link from 'next/link';
import React from 'react';
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa';
import Modal from '../../reusable-components/Modal';

type ResultsModalProps = {
  isResultsModalOpen: boolean;
  totalScores: number;
  totalExercises: number;
  toggleIsResultsModalOpen: () => void;
};

const ResultsModal = ({
  isResultsModalOpen,
  toggleIsResultsModalOpen,
  totalScores,
  totalExercises,
}: ResultsModalProps) => {
  return (
    <Modal
      isOpen={isResultsModalOpen}
      isOpenToggler={toggleIsResultsModalOpen}
      position='top-[15%] left-[30%]'
    >
      <h2 className='capitalize text-center text-3xl mb-10 mt-14'>
        congratulations🎉!
      </h2>
      <p className='text-xl text-center mb-6'>
        You have got{' '}
        <span className='text-green-600 text-2xl font-semibold'>
          {totalScores}
        </span>{' '}
        out of total {totalExercises} scores.
      </p>
      <p className='text-center mb-6'>Share your score:</p>
      <div className='flex justify-center items-center mb-20 gap-1'>
        <FaFacebookSquare className='w-12 cursor-pointer h-auto text-[#33558e]' />
        <FaTwitterSquare className='w-12 cursor-pointer h-auto text-[#1da1f2]' />
        <FaLinkedin className='w-12 cursor-pointer h-auto text-[#2867b2]' />
      </div>
      <section className='flex flex-nowrap gap-x-5 justify-center items-center'>
        <Link href='/dashboard'>
          <a className='modal-btn text-base capitalize px-12 font-semibold py-3 '>
            see yourself in comparison with others
          </a>
        </Link>
        <Link href='/'>
          <a className='m-0 capitalize text-black text-base font-semibold'>
            back to home
          </a>
        </Link>
      </section>
    </Modal>
  );
};

export default ResultsModal;
