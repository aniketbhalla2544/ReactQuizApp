import { createAvatar } from '@dicebear/avatars';
import Image from 'next/image';
import React, { memo, useMemo } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';
import * as style from '@dicebear/avatars-bottts-sprites';
import useMediaQuery from '../hooks/useMediaQuery';

const ProfileAvtaarWithName = () => {
  const svgSeed = useMemo(() => `${Math.floor(Math.random() * 1000)}`, []);
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  let avataar = createAvatar(style, {
    seed: svgSeed,
  });
  const { name } = useAppSelector(
    (state) => state.currentUserState.value.currentUser
  );
  const avtaarImgWidth = isLargeScreen ? 65 : 50;
  const avtaarImgHeight = avtaarImgWidth - 20;

  return (
    <section className='flex flex-nowrap items-center justify-start gap-x-5'>
      <figure className='w-fit overflow-hidden pt-1 shadow-lg outline outline-2 outline-green-300 lg:pt-0'>
        <Image
          src={`data:image/svg+xml;utf8,${encodeURIComponent(avataar)}`}
          alt='avatar not available'
          width={avtaarImgWidth}
          height={avtaarImgHeight}
        />
      </figure>
      <p className='max-w-[12ch] overflow-hidden text-ellipsis whitespace-nowrap text-left text-lg font-semibold capitalize leading-none lg:max-w-[20ch]'>
        {name || 'username'}
      </p>
    </section>
  );
};

// const MemoizedProfileAvtaarWithName = memo(ProfileAvtaarWithName);

export default ProfileAvtaarWithName;
