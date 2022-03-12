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
        <Link href='/courses'>
          <a className='nav-item px-8 py-2'>Courses</a>
        </Link>
      </Header>
      <main>
        <section className='relative pt-12 pb-28'>
          <figure className='absolute w-full h-full -z-50 -top-20  -right-[32%] opacity-[0.03]'>
            <Image
              src='/images/coding-icon.svg'
              alt='coding-icon'
              layout='fill'
            />
          </figure>
          <CenterContainer>
            <div className='flex justify-start gap-x-20 mb-12'>
              <figure className='w-96 h-auto overflow-hidden'>
                <Image
                  src='/images/me.jpg'
                  width={900}
                  height={1200}
                  alt='me'
                  quality={100}
                />
              </figure>
              <div className='pt-20'>
                <h1 className='font-sans font-bold text-6xl capitalize mb-3 text-gray-800'>
                  frontend developer
                </h1>
                <p className='uppercase text-gray-400 text-lg font-semibold mb-5'>
                  aniket bhalla
                </p>
                <p className='text-lg max-w-[75ch] mb-16'>
                  I’m on my never ending journey of learning new web
                  technologies and empowering the World Wide Web with high
                  performance and interactive websites. I’m proficient in HTML,
                  CSS & JavaScript. Skilled at writing reusable and clean code
                  using current best practices of Web development.
                </p>
                <div className='flex justify-start items-center gap-x-10'>
                  <a
                    href='https://aniket-bhalla-portfolio.web.app/'
                    target='_blank'
                    rel='noreferrer'
                    className='capitalize text-xl font-semibold text-white bg-gray-800 hover:bg-black rounded-full px-10 py-3'
                  >
                    portfolio
                  </a>
                  <section className='flex flex-nowrap justify-start items-center gap-x-4'>
                    <a
                      href='https://www.linkedin.com/in/aniket-bhalla-b220b1187'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <FaLinkedin className='w-8 cursor-pointer h-auto text-[#2867b2]' />
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
        <section className='py-20 bg-slate-800'>
          <CenterContainer>
            <h1 className='capitalize font-semibold text-4xl text-white mb-12'>
              my tech stack
            </h1>
            <div className='grid grid-cols-6 grid-flow-row gap-y-16 p-0'>
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
