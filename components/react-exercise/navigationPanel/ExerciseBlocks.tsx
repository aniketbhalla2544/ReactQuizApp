import ExerciseBlock from './ExerciseBlock';
import { ExercisesData } from '../types';

type Exercises = ExercisesData['data'];

type ExerciseBlocksProps = {
  exercisesData: Exercises;
};

const ExerciseBlocks = ({ exercisesData }: ExerciseBlocksProps) => {
  return (
    <ul className='relative left-0 right-0 max-h-[85vh] overflow-y-scroll'>
      {exercisesData.map((exerciseData) => {
        return (
          <ExerciseBlock key={exerciseData.id} exerciseData={exerciseData} />
        );
      })}
    </ul>
  );
};

export default ExerciseBlocks;
