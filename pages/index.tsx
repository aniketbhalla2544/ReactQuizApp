import type { NextPage } from 'next';
import Link from 'next/link';
import CenterContainer from '../components/CenterContainer';
import CourseList from '../components/CourseList';
import data from '../components/courses/CoursesData';
import Header from '../components/Header';
import ScrollBelow from '../components/ScrollBelow';

const Home: NextPage = () => {
  return (
    <>
      <div className='relative flex min-h-[calc(100vh-8vh)] flex-col overflow-auto lg:min-h-screen'>
        <Header>
          <Link href='/about-dev'>
            <a className='nav-item rounded-full border-2 border-green-400 px-8 py-3 text-sm lg:py-2 lg:text-base'>
              About dev
            </a>
          </Link>
        </Header>
        <main>
          <section className='grow flex-col items-start justify-center pt-16'>
            <h1 className='text-gray relative mx-auto mb-4 text-center text-3xl font-bold capitalize leading-[1.3] lg:max-w-[18ch] lg:text-5xl lg:leading-tight'>
              test your basic react{' '}
              <span className='mx-auto block max-w-[16ch] text-center'>
                skills with react quiz
              </span>
            </h1>
            <p className='mx-auto mb-16 max-w-[30ch] text-center text-lg text-gray-600 lg:mb-20 lg:max-w-[38ch]'>
              Attempt all questions and get points for each correct answer. Get
              yourself a chance to share your high scores on LinkedIn.
            </p>
            <Link href='/react-exercise'>
              <a className='relative mx-auto mb-36 block w-fit whitespace-nowrap bg-green-500 py-4 px-9 text-xl text-gray-800 shadow-2xl transition-transform hover:scale-95 hover:bg-green-600 lg:text-2xl'>
                Start Quiz
              </a>
            </Link>
            <ScrollBelow />
          </section>
        </main>
      </div>
      <section className='bg-neutral-800 pt-16 pb-24 lg:py-20'>
        <CenterContainer>
          <h2 className='mb-10 text-center text-3xl capitalize text-white lg:text-4xl'>
            courses
          </h2>
          <CourseList data={data} />
        </CenterContainer>
      </section>
    </>
  );
};
export default Home;
