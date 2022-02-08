import { MenuIcon } from '@heroicons/react/solid';
import { useContext } from 'react';
import { ReactExerciseCtx } from '../../../pages/react-exercise';
import QAModel from './QAModel';

const QAPanel = () => {
  const reactExercCtx = useContext(ReactExerciseCtx);
  return (
    <>
      <div className='grow px-6 pt-4'>
        {!reactExercCtx?.isNavPanelOpen && (
          <div
            className='flex-none w-8 cursor-pointer h-auto'
            onClick={() => reactExercCtx?.toggleIsNavPanelOpen()}
          >
            <MenuIcon />
          </div>
        )}
        <section className='pt-20'>
          <h1 className='mb-6 capitalize text-4xl font-medium'>exercise:</h1>
          <QAModel
            ques='Enter the correct ReactDOM method to render the React element to the DOM.'
            ans='render'
          />
        </section>
      </div>
    </>
  );
};

export default QAPanel;
