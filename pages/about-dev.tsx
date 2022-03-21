import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import data from '../components/about-dev/techStackData';
import TechStackIcon from '../components/about-dev/TechStackIcon';
import CenterContainer from '../components/CenterContainer';
import Header from '../components/Header';
import ScrollBelow from '../components/ScrollBelow';

const AboutDevPage = () => {
  return (
    <section>
      <Header>
        <Link href='/'>
          <a className='nav-item'>home</a>
        </Link>
      </Header>
      <main>
        <section className='relative pt-12 pb-28'>
          <figure className='absolute -top-20 -right-[32%] -z-50 h-full  w-full opacity-[0.03]'>
            <Image
              src='/images/coding-icon.svg'
              alt='coding-icon'
              layout='fill'
            />
          </figure>
          <CenterContainer>
            <div className='x mb-12 flex flex-col justify-start lg:flex-row lg:gap-x-20'>
              <figure className='mb-5 h-auto w-1/3 overflow-hidden lg:mb-0 lg:w-96 lg:max-w-none '>
                <Image
                  src='/images/me.jpg'
                  width={900}
                  height={1200}
                  alt='me'
                  quality={100}
                />
              </figure>
              <div className='lg:pt-16'>
                <h1 className='mb-2 font-sans text-4xl font-bold capitalize text-gray-800 lg:mb-3 lg:text-6xl'>
                  frontend developer
                </h1>
                <p className='mb-5 text-base font-semibold uppercase text-gray-400 lg:text-lg'>
                  aniket bhalla
                </p>
                <p className='mb-7 max-w-full lg:mb-16 lg:max-w-[75ch] lg:text-lg'>
                  I’m on my never ending journey of learning new web
                  technologies and empowering the World Wide Web with high
                  performance and interactive websites. I’m proficient in HTML,
                  CSS & JavaScript. Skilled at writing reusable and clean code
                  using current best practices of Web development.
                </p>
                <div className='flex items-center justify-start gap-x-10'>
                  <a
                    href='https://aniket-bhalla-portfolio.web.app/'
                    target='_blank'
                    rel='noreferrer'
                    className='rounded-full bg-gray-800 px-10 py-3 text-xl font-semibold capitalize text-white hover:bg-black'
                  >
                    portfolio
                  </a>
                  <section className='flex flex-nowrap items-center justify-start gap-x-4'>
                    <a
                      href='https://www.linkedin.com/in/aniket-bhalla-b220b1187'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <FaLinkedin className='h-auto w-8 cursor-pointer text-[#2867b2]' />
                    </a>
                    <a
                      href='https://bit.ly/300P1ip'
                      target='_blank'
                      rel='noreferrer'
                      className='mt-2'
                    >
                      <Image
                        alt='skype-icon'
                        src='/images/svgs/blue-skype.svg'
                        width={32}
                        height={32}
                      />
                    </a>
                  </section>
                </div>
              </div>
            </div>
            <ScrollBelow />
          </CenterContainer>
        </section>
        <section className='bg-slate-800 py-20'>
          <CenterContainer>
            <h1 className='mb-12 text-center text-3xl font-semibold capitalize text-white lg:text-left  lg:text-4xl'>
              my tech stack
            </h1>
            <div className='grid grid-flow-row grid-cols-2 gap-y-16 p-0 lg:grid-cols-6'>
              {data.map((iconImgSrc) => (
                <TechStackIcon key={iconImgSrc} imgSrc={iconImgSrc} />
              ))}
            </div>
          </CenterContainer>
        </section>
      </main>
    </section>
  );
};

export default AboutDevPage;
