import { createAvatar } from '@dicebear/avatars';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';
import * as style from '@dicebear/avatars-bottts-sprites';

const ProfileAvtaarWithName = () => {
  const svgSeed = useMemo(() => `${Math.floor(Math.random() * 1000)}`, []);
  let avataar = createAvatar(style, {
    seed: svgSeed,
  });
  const { name } = useAppSelector(
    (state) => state.currentUserState.value.currentUser
  );

  return (
    <section className='flex flex-nowrap justify-between items-center gap-x-5'>
      <figure className='w-fit overflow-hidden shadow-lg outline outline-2 outline-green-300'>
        <Image
          src={`data:image/svg+xml;utf8,${encodeURIComponent(avataar)}`}
          alt='avatar not available'
          width={65}
          height={45}
        />
      </figure>
      <p className='capitalize text-lg font-semibold max-w-[20ch] whitespace-nowrap overflow-hidden text-ellipsis'>
        {name || 'username'}
      </p>
    </section>
  );
};

export default ProfileAvtaarWithName;
