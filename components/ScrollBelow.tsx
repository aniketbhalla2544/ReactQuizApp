import { ChevronDownIcon } from '@heroicons/react/solid';

const ScrollBelow = () => {
  return (
    <section className='absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col flex-nowrap items-center justify-center'>
      <p className='text-center font-semibold capitalize text-gray-400'>
        scroll below
      </p>
      <ChevronDownIcon className='w-8 animate-bounce text-gray-400' />
    </section>
  );
};

export default ScrollBelow;
