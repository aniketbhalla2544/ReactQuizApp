import Image from 'next/image';

type TechStackIconProps = {
  imgSrc: string;
};

const TechStackIcon = ({ imgSrc }: TechStackIconProps) => {
  return (
    <div className='mx-auto lg:mx-0'>
      <Image src={imgSrc} width={50} height={50} alt='tech icon' />
    </div>
  );
};

export default TechStackIcon;
