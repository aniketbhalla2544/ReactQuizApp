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
      width='w-[85%] lg:w-1/2'
      position='top-0 lg:top-[15%] left-[10%] lg:left-[32%]'
    >
      <h2 className='mb-10 mt-8 text-center text-3xl font-semibold capitalize lg:mt-12'>
        congratulations🎉!
      </h2>
      <p className='mb-6 text-center text-xl'>
        You have got{' '}
        <span className='text-2xl font-semibold text-green-600'>
          {totalScores}
        </span>{' '}
        out of total {totalExercises} scores.
      </p>
      <p className='mb-6 text-center'>Share your score:</p>
      <div className='mb-20 flex items-center justify-center gap-1'>
        <FaFacebookSquare className='h-auto w-12 cursor-pointer text-[#33558e]' />
        <FaTwitterSquare className='h-auto w-12 cursor-pointer text-[#1da1f2]' />
        <FaLinkedin className='h-auto w-12 cursor-pointer text-[#2867b2]' />
      </div>
      <section className='flex flex-nowrap items-center justify-center gap-x-3 lg:gap-x-5'>
        <Link href='/dashboard'>
          <a className='modal-btn px-4 py-3 text-sm font-semibold capitalize lg:px-12  lg:py-3 lg:text-base'>
            compare with others
          </a>
        </Link>
        <Link href='/'>
          <a className='m-0 text-base font-semibold capitalize text-black'>
            back to home
          </a>
        </Link>
      </section>
    </Modal>
  );
};

export default ResultsModal;
