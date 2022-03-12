import Link from 'next/link';
import CenterContainer from '../components/CenterContainer';
import CourseList from '../components/CourseList';
import data from '../components/courses/CoursesData';
import Header from '../components/Header';

const courses = () => {
  return (
    <>
      <Header>
        <Link href='/'>
          <a className='nav-item px-8 py-2'>home</a>
        </Link>
        <Link href='/about-dev'>
          <a className='nav-item rounded-full border-2 border-green-400 px-8 py-2'>
            About dev
          </a>
        </Link>
      </Header>
      <section className='bg-neutral-800 py-20'>
        <CenterContainer>
          <h2 className='capitalize text-4xl text-white text-center mb-10'>
            courses
          </h2>
          <CourseList data={data} />
        </CenterContainer>
      </section>
    </>
  );
};

export default courses;
