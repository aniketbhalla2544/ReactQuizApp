import { ChevronDownIcon } from '@heroicons/react/solid';

const ScrollBelow = () => {
  return (
    <section className='flex flex-col flex-nowrap justify-center items-center'>
      <p className='text-center capitalize text-gray-400 font-semibold'>
        scroll below
      </p>
      <ChevronDownIcon className='w-8 text-gray-400 animate-bounce' />
    </section>
  );
};

export default ScrollBelow;
