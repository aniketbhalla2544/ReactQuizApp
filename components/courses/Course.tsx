import Link from 'next/link';

export interface CourseProps {
  name: string;
  description: string;
  bgColor: string;
}

const Course = ({ name, description, bgColor }: CourseProps) => {
  return (
    <section className='courseSection py-10 rounded-md px-36 shadow-lg'>
      <h2 className='text-center text-[2.5rem] font-bold mb-2'>{name}</h2>
      <p className='text-center text-base font-semibold text-gray-700 whitespace-nowrap mb-14'>
        {description}
      </p>
      <button className='text-center mx-auto block max-w-fit bg-neutral-800 text-base font-semibold text-white hover:bg-black rounded-full px-14 py-3 whitespace-nowrap'>
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
