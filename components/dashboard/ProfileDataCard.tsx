import Image from 'next/image';

type ProfileDataCardProps = {
  children: React.ReactNode;
  textCaption: string;
};

const ProfileDataCard = ({ children, textCaption }: ProfileDataCardProps) => {
  return (
    <section className='dashboard-element relative px-10 pt-6 pb-28 grow basis-full'>
      {children}
      <p className='capitalize mt-1 text-base font-normal text-gray-400'>
        {textCaption}
      </p>
      <div className='absolute left-0 right-0 bottom-0 pb-24 w-full'>
        <Image
          className='object-cover inset-0 left-0 h-full '
          src='/images/svgs/wave.svg'
          layout='fill'
          alt='wave.svg'
        />
      </div>
    </section>
  );
};

export default ProfileDataCard;
