import Link from 'next/link';

export interface CourseProps {
  name: string;
  description: string;
  bgColor: string;
}

const Course = ({ name, description, bgColor }: CourseProps) => {
  return (
    <section className='courseSection rounded-lg px-10 py-12 shadow-lg lg:py-10 lg:px-36'>
      <h2 className='mb-2 text-center text-4xl font-bold lg:text-[2.5rem]'>
        {name}
      </h2>
      <p className='mb-12 text-center text-base font-normal text-gray-700 lg:whitespace-nowrap'>
        {description}
      </p>
      <button className='mx-auto block max-w-fit whitespace-nowrap rounded-full bg-neutral-800 py-4 px-10 text-center text-base font-semibold tracking-wider text-white hover:bg-black lg:px-12 lg:py-4'>
        Learn {name}
      </button>
      <style jsx>{`
        .courseSection {
          background-color: ${bgColor};
        }
      `}</style>
    </section>
  );
};

export default Course;
