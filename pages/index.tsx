import type { NextPage } from 'next';
import Link from 'next/link';
import Header from '../components/Header';
import ScrollBelow from '../components/ScrollBelow';

const Home: NextPage = () => {
  return (
    <>
      <div className='min-h-screen flex flex-col overflow-auto'>
        <Header>
          <Link href='/courses'>
            <a className='nav-item px-8 py-2'>courses</a>
          </Link>

          <Link href='/about-dev'>
            <a className='nav-item rounded-full border-2 border-green-400 px-8 py-2'>
              About dev
            </a>
          </Link>
        </Header>
        <main>
          <section className='grow flex-col justify-center items-start pt-28 relative'>
            <h1 className='capitalize relative leading-[1.3] mx-auto max-w-[20ch] text-5xl text-center font-bold text-gray-800 mb-4'>
              test your basic react skills with react quiz
            </h1>
            <p className='text-center max-w-[38ch] text-gray-600 mx-auto mb-20'>
              Attempt all questions and get points for each correct answer. Get
              yourself a chance to share your high scores on LinkedIn.
            </p>
            <Link href='/react-exercise'>
              <a className='mb-36 relative shadow-2xl block w-fit mx-auto bg-green-500 text-2xl text-gray-800 py-4 px-9 hover:scale-95 hover:bg-green-600 transition-transform'>
                Start Quiz
              </a>
            </Link>
            <ScrollBelow />
          </section>
        </main>
      </div>
      {/* <section className='bg-neutral-800 py-20'>
        <CenterContainer>
          <h2 className='capitalize text-4xl text-white text-center mb-10'>
            courses
          </h2>
          <CourseList data={data} />
        </CenterContainer>
      </section> */}
    </>
  );
};
export default Home;
