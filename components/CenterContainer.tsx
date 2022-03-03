import React from 'react';

type CenterContainerProps = {
  children: React.ReactNode;
};

const CenterContainer = ({ children }: CenterContainerProps) => {
  return <div className='max-w-screen-xl mx-auto'>{children}</div>;
};

export default CenterContainer;
