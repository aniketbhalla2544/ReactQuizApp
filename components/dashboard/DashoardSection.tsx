import React from 'react';

type DashoardSectionProps = {
  children: React.ReactNode;
  style: string;
};

const DashoardSection = ({ children, style }: DashoardSectionProps) => {
  return <section className={`${style} py-6`}>{children}</section>;
};

export default DashoardSection;
