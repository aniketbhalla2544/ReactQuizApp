import React from 'react';
import Course, { CourseProps } from './courses/Course';

interface CourseListProps {
  data: CourseProps[];
}

const CourseList = ({ data }: CourseListProps) => {
  return (
    <ul className='grid grid-flow-row grid-cols-1 gap-16 overflow-hidden px-6 lg:grid-cols-2'>
      {data.map((courseData) => {
        const { name, bgColor, description } = courseData;
        return (
          <Course
            key={name}
            name={name}
            bgColor={bgColor}
            description={description}
          />
        );
      })}
    </ul>
  );
};

export default CourseList;
