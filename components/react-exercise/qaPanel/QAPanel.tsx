import { ClockIcon, MenuIcon } from '@heroicons/react/solid';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import useToggle from '../../../hooks/useToggle';
import {
  CompletedExercises,
  ReactExerciseCtx,
} from '../../../pages/react-exercise';
import QAModel from './QAModal';
import Timer from './Timer';
import { updateCurrentUserScores } from '../../../features/CurrentUserSlice';
import ResultsModal from './ResultsModal';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import ProfileAvtaarWithName from '../../ProfileAvtaarWithName';
import { addNewTestResult } from '../../../features/TestResultsSlice';
import { setShouldTimerBeStoppedToTrue } from '../../../features/TimerState';
import useMediaQuery from '../../../hooks/useMediaQuery';

type Answers = {
  [key: string]: string;
};

interface QAModelInterface {
  exerciseNumber: number;
  quesText: string | JSX.Element;
  ques: JSX.Element;
  answers: Answers;
}

type QAModelsType = QAModelInterface[];

function getTotalScores(completedExercises: CompletedExercises): number {
  return Object.values(completedExercises).reduce(
    (totalScores, completeExercise) => {
      return totalScores + completeExercise.scores;
    },
    0
  );
}

const QAPanel = () => {
  const {
    totalExercises,
    completedExercises,
    setCompletedExercises,
    currentExerciseNumber,
    isNavPanelOpen,
    handleIsNavPanelOpen,
    canShowAns,
    handleCanShowAns,
  } = useContext(ReactExerciseCtx);

  const [answers, setAnswers] = useState<Answers>({});
  const [inputAnswers, setInputAnswers] = useState<typeof answers>({});
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isUserTrying, setIsUserTrying] = useState(true);
  const [isResultsModalOpen, toggleIsResultsModalOpen] = useToggle(false);
  const controllingTimerOnce = useRef<1 | 0>(0);
  const totalScores: number = getTotalScores(completedExercises);
  // hack here---------------------------------
  const hasUserCompletedAllExercises =
    Object.keys(completedExercises).length === 2;
  // Object.keys(completedExercises).length === totalExercises;
  const appDispatch = useAppDispatch();
  const {
    name,
    scores,
    time: { hrs, mins, sec },
  } = useAppSelector((state) => state.currentUserState.value.currentUser);
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  const handleInputTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputAnswers(() => {
      return {
        ...inputAnswers,
        [name]: value.trim(),
      };
    });
  };

  useEffect(() => {
    if (name && scores && (hrs || mins || sec)) {
      appDispatch(
        addNewTestResult({
          name: name,
          scores: scores,
          mins: mins,
        })
      );
    }
  }, [name, scores, hrs, mins, sec, appDispatch]);

  const handleAnsSubmittion = (didUserSeeAnswer: boolean) => {
    const userScores = didUserSeeAnswer ? 0 : 1;
    setIsUserTrying(false);
    if (JSON.stringify(inputAnswers) === JSON.stringify(answers)) {
      setIsAnswerCorrect(true);
      if (!(currentExerciseNumber in completedExercises)) {
        setCompletedExercises((completedExercises) => ({
          ...completedExercises,
          [currentExerciseNumber]: {
            currentExerciseNumber,
            scores: userScores,
          },
        }));
      }
    } else {
      setIsAnswerCorrect(false);
    }
  };

  const QAModals: QAModelsType = [
    {
      exerciseNumber: 1,
      quesText:
        'Enter the correct ReactDOM method to render the React element to the DOM.',
      ques: (
        <code className='mb-10 block whitespace-pre-wrap text-lg text-black'>
          <span className='whitespace-normal break-words'>
            ReactDOM.
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={6}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`max-w-[6ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } `}
            />
            {`(myElement, document.getElementById('root'))`};
          </span>
        </code>
      ),
      answers: {
        answerOne: 'render',
      },
    },
    {
      exerciseNumber: 2,
      quesText: 'Complete this arrow function:',
      ques: (
        <code className='mb-20 block text-lg text-black'>
          hello =
          <input
            value={
              canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
            }
            maxLength={4}
            type='text'
            name='answerOne'
            onChange={handleInputTyping}
            className={`ml-2 max-w-[4ch] ${
              canShowAns ? 'font-medium text-rose-700' : 'text-black'
            }`}
          />
          &nbsp;
          {`"Hello World!";`}
        </code>
      ),
      answers: {
        answerOne: '()=>',
      },
    },
    {
      exerciseNumber: 3,
      quesText: 'Create a variable that cannot be changed.',
      ques: (
        <code className='mb-20 block text-lg  text-black'>
          <input
            value={
              canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
            }
            maxLength={5}
            type='text'
            name='answerOne'
            onChange={handleInputTyping}
            className={`max-w-[5ch] ${
              canShowAns ? 'font-medium text-rose-700' : 'text-black'
            }`}
          />
          &nbsp;x = 5.6;
        </code>
      ),
      answers: {
        answerOne: 'const',
      },
    },
    {
      exerciseNumber: 4,
      quesText:
        'Complete the array method that will allow you to run a function on each item in the array and return a new array.',
      ques: (
        <code className='mb-20 block text-lg text-black'>
          const myList = myArray.
          <input
            value={
              canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
            }
            maxLength={3}
            type='text'
            name='answerOne'
            onChange={handleInputTyping}
            className={`max-w-[3ch] ${
              canShowAns ? 'font-medium text-rose-700' : 'text-black'
            }`}
          />
          {`((item) => <p>{item}</p>)`}
        </code>
      ),
      answers: {
        answerOne: 'map',
      },
    },
    {
      exerciseNumber: 5,
      quesText:
        'Use destructuring to extract only the third item from the array, into a variable named suv.',
      ques: (
        <code className='mb-20 block text-lg leading-[2] text-black lg:leading-[3]'>
          {/* prettier-ignore */}
          <pre className='break-words whitespace-normal'>
						{`const vehicles = ['mustang', 'f-150', 'expedition']; `}<br/>
						
{`const [`}
						<input
							value={
								canShowAns
									? answers.answerOne
									: inputAnswers.answerOne ?? ''
							}
              maxLength={5}
							type='text'
							name='answerOne'
							onChange={handleInputTyping}
							className={
								`max-w-[5ch] ${canShowAns ? 'text-rose-700 font-medium' : 'text-black'} leading-normal`
							}
						/>{`] = vehicles;`}
					</pre>
        </code>
      ),
      answers: {
        answerOne: ',,suv',
      },
    },
    {
      exerciseNumber: 6,
      quesText: `Use destructuring to extract only the person's state.`,
      ques: (
        <code className='mb-8 block overflow-x-scroll text-lg text-black lg:overflow-auto'>
          <pre className=''>
            {`const person = {
name: 'Jesse',
age: 30, 
address: {
	city: 'Houston',
	state: 'Texas',
	country: 'USA'
}
}

displayMessage(person)

function displayMessage({ `}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={15}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`max-w-[15ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              }`}
            />
            {` }) {
    const message = 'I live in ' + state + '.';
}`}
          </pre>
        </code>
      ),
      answers: {
        answerOne: 'address:{state}',
      },
    },
    {
      exerciseNumber: 7,
      quesText: 'Use the spread operator to combine the following arrays.',
      ques: (
        <code className='mb-10 block text-lg leading-[2] text-black'>
          {/* prettier-ignore */}
          <pre className='overflow-x-scroll lg:overflow-auto pb-4 lg:pb-0'>
{`const arrayOne = ['a', 'b', 'c'];
const arrayTwo = [1, 2, 3];
const arraysCombined = [`}
						<input
							value={
								canShowAns
									? answers.answerOne
									: inputAnswers.answerOne ?? ''
							}
              maxLength={24}
							type='text'
							name='answerOne'
							onChange={handleInputTyping}
							className={
								`max-w-[24ch] ${canShowAns ? 'text-rose-700 font-medium' : 'text-black'} leading-normal`
							}
						/>
						{']'}
					</pre>
        </code>
      ),
      answers: {
        answerOne: '...arrayOne, ...arrayTwo',
      },
    },
    {
      exerciseNumber: 8,
      quesText: 'Complete this ternary operator statement.',
      ques: (
        <code className='mb-16 block text-lg leading-[2] text-black lg:mb-8 lg:leading-[3]'>
          <pre className='whitespace-normal break-words'>
            {`blue `}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={1}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`max-w-[1ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {` renderBlue() `}
            <input
              value={
                canShowAns ? answers.answerTwo : inputAnswers.answerTwo ?? ''
              }
              maxLength={1}
              type='text'
              name='answerTwo'
              onChange={handleInputTyping}
              className={`max-w-[1ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {' renderRed();'}
          </pre>
        </code>
      ),
      answers: {
        answerOne: '?',
        answerTwo: ':',
      },
    },
    {
      exerciseNumber: 9,
      quesText: 'Render a <p> element without using JSX.',
      ques: (
        <code className='mb-20 block text-lg text-black'>
          <p className='m-0 mt-0 whitespace-normal break-words p-0'>
            {`const paragraph = React.createElement(`}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={1}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`max-w-[1ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {`, {}, 'This is a paragraph without using JSX!');`}
          </p>
          <br />
          <p className='mt-4 whitespace-normal break-words'>
            {"ReactDOM.render(paragraph, document.getElementById('root'));"}
          </p>
        </code>
      ),
      answers: {
        answerOne: 'p',
      },
    },
    {
      exerciseNumber: 10,
      quesText: 'Render a <p> element using JSX.',
      ques: (
        <code className='mb-14 block text-lg leading-[3] text-black  lg:mb-10'>
          {/* prettier-ignore */}
          <pre className='overflow-x-scroll lg:overflow-auto'>
						{`const paragraph = `}
						<input
							value={
								canShowAns
									? answers.answerOne
									: inputAnswers.answerOne ?? ''
							}
              maxLength={3}
							type='text'
							name='answerOne'
							onChange={handleInputTyping}
							className={
								`max-w-[3ch] ${canShowAns ? 'text-rose-700 font-medium' : 'text-black'} leading-normal`
							}
						/>
						{`This is a paragraph using JSX!`}
						<input
							value={
								canShowAns
									? answers.answerTwo
									: inputAnswers.answerTwo ?? ''
							}
              maxLength={4}
							type='text'
							name='answerTwo'
							onChange={handleInputTyping}
							className={
								`max-w-[4ch] ${canShowAns ? 'text-rose-700 font-medium' : 'text-black'} leading-normal`
							}
						/>
					{/* prettier-ignore */}
						{`;
ReactDOM.render(paragraph, document.getElementById('root'));`}
					</pre>
        </code>
      ),
      answers: {
        answerOne: '<p>',
        answerTwo: '</p>',
      },
    },
    {
      exerciseNumber: 11,
      quesText:
        'Complete this statement that renders a JavaScript expression inside JSX.',
      ques: (
        <code className='mb-14 block text-lg leading-[2] text-black lg:mb-10 lg:leading-[3]'>
          {`const myelement = <h1>React is`}&nbsp;
          <input
            value={
              canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
            }
            maxLength={1}
            type='text'
            name='answerOne'
            onChange={handleInputTyping}
            className={`max-w-[1ch] ${
              canShowAns ? 'font-medium text-rose-700' : 'text-black'
            } leading-normal`}
          />
          {`10 * 10`}
          <input
            value={
              canShowAns ? answers.answerTwo : inputAnswers.answerTwo ?? ''
            }
            maxLength={1}
            type='text'
            name='answerTwo'
            onChange={handleInputTyping}
            className={`max-w-[1ch] ${
              canShowAns ? 'font-medium text-rose-700' : 'text-black'
            } leading-normal`}
          />
          &nbsp; {'times better with JSX!</h1>;'}
        </code>
      ),
      answers: {
        answerOne: '{',
        answerTwo: '}',
      },
    },
    {
      exerciseNumber: 12,
      quesText:
        'Complete this expression to include a class attribute the way JSX supports.',
      ques: (
        <code className='mb-20  block text-lg text-black'>
          <pre className='whitespace-normal break-words leading-[2] lg:leading-[3]'>
            {`const title = <h1 `}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={9}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`max-w-[9ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {`="primary">Hello World!</h1>;`}
          </pre>
        </code>
      ),
      answers: {
        answerOne: 'className',
      },
    },
    {
      exerciseNumber: 13,
      quesText: 'Name the following React component "person".',
      ques: (
        <code className='mb-8 block overflow-x-scroll pb-12 text-lg text-black lg:overflow-x-auto lg:pb-0'>
          {/* prettier-ignore */}
          <pre>
            {`function `}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={6}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`max-w-[6ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {/* prettier-ignore */}
  {` (props) {`}<br/>
            {`   return <h2>Hi, I'm {props.name}</h2>;`} <br />
            {`}`}
          </pre>
        </code>
      ),
      answers: {
        answerOne: 'Person',
      },
    },
    {
      exerciseNumber: 14,
      quesText: 'Complete this component which uses properties.',
      ques: (
        <code className='mb-8 block overflow-x-scroll pb-8 text-lg leading-[2] text-black lg:overflow-x-auto lg:pb-0'>
          {/* prettier-ignore */}
          <pre>
            {`function Person(`}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={5}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`leading-normal max-w-[5ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              }`}
            />
            {`) {`}<br/>
            {`    return <h1>Hi, I'm {`}
            <input
              value={
                canShowAns ? answers.answerTwo : inputAnswers.answerTwo ?? ''
              }
              maxLength={5}
              type='text'
              name='answerTwo'
              onChange={handleInputTyping}
              className={`max-w-[5ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {`.name}!</h1>;`}<br/>
            {`}`}
            <br/>
    {`
ReactDOM.render(<Person name="Jesse"/>, document.getElementById('root'));`}
          </pre>
        </code>
      ),
      answers: {
        answerOne: 'props',
        answerTwo: 'props',
      },
    },
    {
      exerciseNumber: 15,
      quesText:
        'Create a variable named name and pass it to the Message component.',
      ques: (
        <code className='mb-8 block overflow-x-scroll pb-6 text-lg text-black lg:mb-0 lg:overflow-x-auto lg:pb-0'>
          <pre className=''>
            {`function Person(props) {
  return <h2>I'm { props.name }!</h2>;
}`}
          </pre>
          <pre>
            {`
function Greeting() {
const name = "Jesse"
return (
	<>
		<h1>Hello!</h1>
		<Person name=`}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={1}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`max-w-[1ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {` name `}
            <input
              value={
                canShowAns ? answers.answerTwo : inputAnswers.answerTwo ?? ''
              }
              maxLength={1}
              type='text'
              name='answerTwo'
              onChange={handleInputTyping}
              className={`max-w-[1ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {` />
	</>
);
}
					`}
          </pre>
          <p>{`ReactDOM.render(<Greeting />, document.getElementById('root'));`}</p>
        </code>
      ),
      answers: {
        answerOne: '{',
        answerTwo: '}',
      },
    },
    {
      exerciseNumber: 16,
      quesText: 'Complete this statement to include a click event handler.',
      ques: (
        <code className='mb-20 block text-lg text-black'>
          <pre className='whitespace-normal break-words'>
            {`<button `}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={7}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`max-w-[7ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {`={clicked()}>Click Me!</button>`}
          </pre>
        </code>
      ),
      answers: {
        answerOne: 'onClick',
      },
    },
    {
      exerciseNumber: 17,
      quesText:
        'Use the correct logical operator to complete the following component.',
      ques: (
        <code className='mb-8 block overflow-x-scroll pb-4 text-lg text-black lg:overflow-x-auto lg:pb-4'>
          <pre className=''>
            {`function App({isLoggedIn}) {
return (
	<>
		<h1>My Application</h1>
		{isLoggedIn `}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={2}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`max-w-[2ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {` <Profile /> }
	</>
);
}

`}
          </pre>
          <p className=''>{`ReactDOM.render(<App />, document.getElementById('root'));`}</p>
        </code>
      ),
      answers: {
        answerOne: '&&',
      },
    },
    {
      exerciseNumber: 18,
      quesText:
        'Add the attribute that allows React to keep track of elements in lists.',
      ques: (
        <code className='mb-8 block overflow-x-scroll pb-6 text-lg text-black lg:overflow-x-auto lg:pb-4'>
          <pre>
            {`function GroceryList() {
const items = [
	{id: 1, name: 'bread'},
	{id: 2, name: 'milk'},
	{id: 3, name: 'eggs'}
];

return (
	<>
		<h1>Grocery List</h1>
		<ul>
			{items.map((item) => <li `}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={3}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`max-w-[3ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {` ={item.id}>{item.name}</li>)}
		</ul>
	</>
);
}

ReactDOM.render(<GroceryList />, document.getElementById('root'));
`}
          </pre>
        </code>
      ),
      answers: {
        answerOne: 'key',
      },
    },
    {
      exerciseNumber: 19,
      quesText:
        'Complete this statement to keep track of a "count" variable using the useState Hook.',
      ques: (
        <code className='mb-8 block overflow-x-scroll pb-8 text-lg text-black lg:overflow-x-auto lg:pb-0'>
          <pre>
            {`import { useState } from "react";

function KeepCount() {
  const  [`}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={5}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`max-w-[5ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {`, `}
            <input
              value={
                canShowAns ? answers.answerTwo : inputAnswers.answerTwo ?? ''
              }
              maxLength={8}
              type='text'
              name='answerTwo'
              onChange={handleInputTyping}
              className={`max-w-[8ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {`] = useState(0);
}`}
          </pre>
        </code>
      ),
      answers: {
        answerOne: 'count',
        answerTwo: 'setCount',
      },
    },
    {
      exerciseNumber: 20,
      quesText:
        'What do you need to add to the second argument of a useEffect Hook to limit it to running only on the first render?',
      ques: (
        <code className='mb-8 block overflow-x-scroll pb-8 text-lg text-black lg:overflow-x-auto lg:pb-0'>
          <pre>
            {`import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function App() {
const [data, setData] = useState([]);

useEffect(() => {
	setData(getData())
},  `}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={2}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`max-w-[2ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {`);

return <DisplayData data={data} />;
}

ReactDOM.render(<App />, document.getElementById('root'));`}
          </pre>
        </code>
      ),
      answers: {
        answerOne: '[]',
      },
    },
    {
      exerciseNumber: 21,
      quesText: (
        <>
          <span>{`Add the following CSS styles inline to the <h1> element `}</span>
          <mark>{`color = "purple"`}</mark>
        </>
      ),
      ques: (
        <code className='mb-8 block overflow-x-scroll pb-8 text-lg text-black lg:overflow-x-auto lg:pb-0'>
          <pre>
            {`const Header = () => {
return (
	<>
		<h1 style=`}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={19}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`max-w-[19ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {`>Hello Style!</h1>
		<p>Add a little style!</p>
	</>
);
}`}
          </pre>
        </code>
      ),
      answers: {
        answerOne: '{{color: "purple"}}',
      },
    },
    {
      exerciseNumber: 22,
      quesText: (
        <>
          <span>{`Add the following CSS styles inline to the <h1> element `}</span>
          <mark>{`background-color = "yellow"`}</mark>
        </>
      ),

      ques: (
        <code className='mb-8 block overflow-x-scroll pb-8 text-lg text-black lg:overflow-x-auto lg:pb-0'>
          <pre>
            {`const Header = () => {
return (
	<>
		<h1 style=`}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={29}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`max-w-[29ch] lg:min-w-[29ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {`>Hello Style!</h1>
		<p>Add a little style!</p>
	</>
);
}`}
          </pre>
        </code>
      ),
      answers: {
        answerOne: '{{backgroundColor: "yellow"}}',
      },
    },
    {
      exerciseNumber: 23,
      quesText: `Import the App.css file in order to include its styles in the current component assuming the current component and the style sheet are in the same directory`,
      ques: (
        <code className='mb-8 block overflow-x-scroll pb-8 text-lg text-black lg:overflow-x-auto lg:pb-0'>
          <pre>
            {`import  `}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={11}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`max-w-[11ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {`;`}
          </pre>
        </code>
      ),
      answers: {
        answerOne: "'./App.css'",
      },
    },
    {
      exerciseNumber: 24,
      quesText: `Name this CSS file so that it can be imported as a Module.`,
      ques: (
        <code className='mb-8 block pb-8 text-lg text-black lg:pb-0'>
          <pre className='whitespace-normal break-words'>
            {`header.`}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              maxLength={6}
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`max-w-[6ch] ${
                canShowAns ? 'font-medium text-rose-700' : 'text-black'
              } leading-normal`}
            />
            {`.css:`}
          </pre>
        </code>
      ),
      answers: {
        answerOne: 'module',
      },
    },
  ];

  const memoizedCurrentQAModelData = useMemo(
    () =>
      QAModals.find((modal) => currentExerciseNumber === modal.exerciseNumber),
    [currentExerciseNumber, inputAnswers, canShowAns, answers]
  ) as QAModelInterface;

  useEffect(() => {
    setAnswers(memoizedCurrentQAModelData.answers);
    setInputAnswers({});
    setIsUserTrying(true);
    setIsAnswerCorrect(false);
  }, [currentExerciseNumber]);

  useEffect(() => {
    if (isAnswerCorrect && hasUserCompletedAllExercises) {
      if (!controllingTimerOnce.current) {
        appDispatch(setShouldTimerBeStoppedToTrue());
        appDispatch(updateCurrentUserScores(totalScores));
      }
      controllingTimerOnce.current = 1;
      toggleIsResultsModalOpen();
    }
  }, [
    isAnswerCorrect,
    hasUserCompletedAllExercises,
    toggleIsResultsModalOpen,
    appDispatch,
    totalScores,
  ]);

  return (
    <>
      <ResultsModal
        isResultsModalOpen={isResultsModalOpen}
        toggleIsResultsModalOpen={toggleIsResultsModalOpen}
        totalScores={totalScores}
        totalExercises={totalExercises}
      />
      <div
        className={`${
          isLargeScreen && !isNavPanelOpen ? 'mx-auto' : 'ml-auto'
        } min-h-screen max-w-full grow px-6 pt-6 lg:min-h-0 lg:max-w-[82vw] lg:px-6 lg:pt-4`}
      >
        <div
          className={`${
            isLargeScreen &&
            (isNavPanelOpen ? 'mx-auto max-w-[90%]' : 'mx-auto max-w-[80%]')
          }`}
        >
          <section className='relative'>
            {!isNavPanelOpen && (
              <div
                className='absolute top-0 h-auto w-8 cursor-pointer lg:top-2'
                onClick={() => handleIsNavPanelOpen.toggleBooleanState()}
              >
                <MenuIcon />
              </div>
            )}
            <aside className='ml-auto flex w-fit flex-col items-stretch justify-between gap-y-3 lg:gap-y-5 lg:pr-4 lg:pt-4'>
              <ProfileAvtaarWithName />
              <hr />
              <section className='flex flex-nowrap items-center justify-center gap-x-10'>
                <ClockIcon
                  className={`${
                    isLargeScreen ? 'w-9' : 'w-7'
                  } h-auto self-center text-green-600`}
                />
                <div>
                  <Timer />
                </div>
              </section>
            </aside>
          </section>
          <section className={`mt-12`}>
            <h1 className='mb-2 text-3xl font-medium capitalize lg:mb-6 lg:text-4xl'>
              exercise:
            </h1>
            <QAModel
              quesText={
                memoizedCurrentQAModelData?.quesText ?? 'no ques found!'
              }
              canShowAns={canShowAns}
              isUserTrying={isUserTrying}
              isAnswerCorrect={isAnswerCorrect}
              setIsUserTrying={setIsUserTrying}
              handleCanShowAns={handleCanShowAns}
              handleAnsSubmittion={handleAnsSubmittion}
              setIsAnswerCorrect={setIsAnswerCorrect}
            >
              {memoizedCurrentQAModelData?.ques}
            </QAModel>
          </section>
        </div>
      </div>
    </>
  );
};

export default QAPanel;
