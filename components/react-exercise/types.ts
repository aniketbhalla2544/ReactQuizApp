import { Dispatch, SetStateAction } from "react";

export type SetStateType<T> = Dispatch<SetStateAction<T>>;


export interface ExercisesData {
  data: {
    id: number,
    name: string,
    exercises: {
      id: number,
      exerciseNumber: number
    }[]
  }[],
  meta: {
    totalExercises: number
  }
}