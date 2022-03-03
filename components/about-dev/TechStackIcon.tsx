import Image from 'next/image';

type TechStackIconProps = {
  imgSrc: string;
};

const TechStackIcon = ({ imgSrc }: TechStackIconProps) => {
  return (
    // <div className='border-4 border-green-500'>
    <div className=''>
      <Image src={imgSrc} width={50} height={50} alt='tech icon' />
    </div>
  );
};

export default TechStackIcon;
