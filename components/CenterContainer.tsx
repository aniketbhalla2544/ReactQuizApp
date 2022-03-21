import React from 'react';

type CenterContainerProps = {
  children: React.ReactNode;
};

const CenterContainer = ({ children }: CenterContainerProps) => {
  return (
    <div className='mx-auto max-w-full px-5 lg:max-w-screen-xl'>{children}</div>
  );
};

export default CenterContainer;
