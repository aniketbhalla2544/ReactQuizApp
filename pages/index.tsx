import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className='min-h-screen flex flex-col overflow-auto'>
      <h1 className='capitalize bg-neutral-800 px-6 py-6 text-white font-semibold text-2xl grow-0'>
        Welcome to react quiz app
      </h1>
      <div className='grow flex-col justify-center items-start pt-28 relative'>
        <h1 className='capitalize relative leading-[1.3] mx-auto max-w-[20ch] text-5xl text-center font-bold text-gray-800 mb-4'>
          test your basic react skills with react quiz
        </h1>
        <p className='text-center max-w-[38ch] text-gray-600 mx-auto mb-20'>
          Attempt all questions and get points for each correct answer. Get
          yourself a chance to share your high scores on LinkedIn.
        </p>
        <Link href='/react-exercise'>
          <a className='relative shadow-2xl block w-fit mx-auto bg-green-500 text-2xl text-gray-800 py-4 px-9 hover:scale-95 hover:bg-green-600 transition-transform'>
            Start Quiz
          </a>
        </Link>
      </div>
    </div>
  );
};
export default Home;
