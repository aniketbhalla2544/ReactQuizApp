import React, { createContext, useContext, useState } from 'react';
import { SetStateType } from '../components/react-exercise/types';

type ScoresContextType = {
  scores: number;
  setScores: SetStateType<number>;
};

const ScoresContext = createContext<ScoresContextType | undefined>(undefined);

function ScoresProvider({ children }: { children: React.ReactNode }) {
  const [scores, setScores] = useState<number>(0);

  return (
    <ScoresContext.Provider value={{ scores, setScores }}>
      {' '}
      {children}{' '}
    </ScoresContext.Provider>
  );
}

function useScores() {
  const context = useContext(ScoresContext);

  if (context === undefined) {
    throw new Error('useScores must be used within a ScoresProvider');
  }

  return context;
}

export { useScores, ScoresProvider };
