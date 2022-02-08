import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <h1 className='capitalize bg-neutral-800 px-4 py-4 text-white font-semibold text-2xl grow-0'>
        Welcome to react quiz app
      </h1>
      <div className='grow flex justify-center items-center'>
        <Link href='/react-exercise'>
          <a className='shadow-2xl bg-green-500 text-2xl py-4 px-9 hover:scale-95 hover:bg-green-600 transition-transform'>
            Start Quiz
          </a>
        </Link>
      </div>
    </div>
  );
};
export default Home;
