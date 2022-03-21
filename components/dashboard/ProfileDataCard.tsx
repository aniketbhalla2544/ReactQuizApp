import Image from 'next/image';

type ProfileDataCardProps = {
  children: React.ReactNode;
  textCaption: string;
};

const ProfileDataCard = ({ children, textCaption }: ProfileDataCardProps) => {
  return (
    <section className='dashboard-element relative basis-full px-10 pt-6 pb-28 lg:max-w-none lg:grow'>
      {children}
      <p className='mt-1 text-sm font-normal capitalize text-gray-400 lg:text-base'>
        {textCaption}
      </p>
      <div className='absolute left-0 right-0 bottom-0 w-full pb-24'>
        <Image
          className='inset-0 left-0 h-full object-cover '
          src='/images/svgs/wave.svg'
          layout='fill'
          alt='wave.svg'
        />
      </div>
    </section>
  );
};

export default ProfileDataCard;
