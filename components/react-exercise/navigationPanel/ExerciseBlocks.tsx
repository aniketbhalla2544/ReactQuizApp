import ExerciseBlock from './ExerciseBlock';
import { ExercisesData } from '../types';

type Exercises = ExercisesData['data'];

type ExerciseBlocksProps = {
  exercisesData: Exercises;
};

const ExerciseBlocks = ({ exercisesData }: ExerciseBlocksProps) => {
  return (
    <ul className='overflow-y-scroll h-[40rem]'>
      {exercisesData.map((exerciseData) => {
        return (
          <ExerciseBlock key={exerciseData.id} exerciseData={exerciseData} />
        );
      })}
    </ul>
  );
};

export default ExerciseBlocks;
