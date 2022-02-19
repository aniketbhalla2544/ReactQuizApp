import { ClockIcon, MenuIcon } from '@heroicons/react/solid';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import useToggle from '../../../hooks/useToggle';
import { ReactExerciseCtx } from '../../../pages/react-exercise';
import QAModel from './QAModal';
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa';
import Modal from '../../reusable-components/Modal';
import Link from 'next/link';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';
import Image from 'next/image';
import Timer from './Timer';

type Answers = {
  [key: string]: string;
};

interface QAModelInterface {
  exerciseNumber: number;
  quesText: string;
  ques: JSX.Element;
  answers: Answers;
}

type QAModelsType = QAModelInterface[];

type QAPanelProps = {
  userName: string | undefined;
};

const QAPanel = ({ userName }: QAPanelProps) => {
  const {
    totalExercises,
    completedExercises,
    setCompletedExercises,
    currentExerciseNumber,
    isNavPanelOpen,
    toggleIsNavPanelOpen,
  } = useContext(ReactExerciseCtx);

  useEffect(() => {
    console.log('QAPanel rendering');
  });

  const [answers, setAnswers] = useState<Answers>({});
  const [inputAnswers, setInputAnswers] = useState<typeof answers>({});
  const [canShowAns, handleCanShowAns] = useToggle(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isUserTrying, setIsUserTrying] = useState(true);
  const [isResultsModalOpen, toggleIsResultsModalOpen] = useToggle(false);
  const [shouldTimerBeStopped, setShouldTimerBeStopped] = useToggle(false);
  const svgSeed = useMemo(
    () => `${Math.floor(Math.random() * 1000)}`,
    [userName]
  );

  // const svgSeed = `${Math.floor(Math.random() * 1000)}`;
  console.log();

  useEffect(() => {
    console.log('svgSeed: ', svgSeed);
  }, [svgSeed]);

  const hasUserCompletedAllExercises =
    completedExercises.length === totalExercises;

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
    if (isAnswerCorrect && hasUserCompletedAllExercises) {
      toggleIsResultsModalOpen();
    }
  }, [isAnswerCorrect, hasUserCompletedAllExercises]);

  const handleAnsSubmittion = () => {
    setIsUserTrying(false);
    if (JSON.stringify(inputAnswers) === JSON.stringify(answers)) {
      setIsAnswerCorrect(true);
      if (!completedExercises.includes(currentExerciseNumber)) {
        setCompletedExercises((completedExercises) => [
          ...completedExercises,
          currentExerciseNumber,
        ]);
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
        <code className='block text-black text-lg  mb-10'>
          ReactDOM.
          <input
            value={
              canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
            }
            type='text'
            name='answerOne'
            onChange={handleInputTyping}
            className={`${
              canShowAns ? 'text-rose-700 font-medium' : 'text-black'
            } `}
          />
          {`(myElement, document.getElementById('root'))`};
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
        <code className='block text-black text-lg  mb-10'>
          hello = &nbsp;
          <input
            value={
              canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
            }
            type='text'
            name='answerOne'
            onChange={handleInputTyping}
            className={canShowAns ? 'text-rose-700 font-medium' : 'text-black'}
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
        <code className='block text-black text-lg  mb-20'>
          <input
            value={
              canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
            }
            type='text'
            name='answerOne'
            onChange={handleInputTyping}
            className={canShowAns ? 'text-rose-700 font-medium' : 'text-black'}
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
        <code className='block p-2 text-black text-lg mb-20'>
          const myList = myArray.
          <input
            value={
              canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
            }
            type='text'
            name='answerOne'
            onChange={handleInputTyping}
            className={canShowAns ? 'text-rose-700 font-medium' : 'text-black'}
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
        <code className='leading-[3] block text-black text-lg  mb-20'>
          {/* prettier-ignore */}
          <pre>
						{`const vehicles = ['mustang', 'f-150', 'expedition']; `}<br/>
						
{`const [`}
						<input
							value={
								canShowAns
									? answers.answerOne
									: inputAnswers.answerOne ?? ''
							}
							type='text'
							name='answerOne'
							onChange={handleInputTyping}
							className={
								`${canShowAns ? 'text-rose-700 font-medium' : 'text-black'} leading-normal`
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
        <code className='block text-black text-lg  mb-8'>
          <pre>
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
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
              }
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
        <code className='leading-[2] block text-black text-lg  mb-10'>
          {/* prettier-ignore */}
          <pre>
{`const arrayOne = ['a', 'b', 'c'];
const arrayTwo = [1, 2, 3];
const arraysCombined = [`}
						<input
							value={
								canShowAns
									? answers.answerOne
									: inputAnswers.answerOne ?? ''
							}
							type='text'
							name='answerOne'
							onChange={handleInputTyping}
							className={
								`${canShowAns ? 'text-rose-700 font-medium' : 'text-black'} leading-normal`
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
        <code className='leading-[3]  block text-black text-lg mb-36'>
          <pre>
            {`blue `}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
              } leading-normal`}
            />
            {` renderBlue() `}
            <input
              value={
                canShowAns ? answers.answerTwo : inputAnswers.answerTwo ?? ''
              }
              type='text'
              name='answerTwo'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
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
        <code className='block text-black text-lg mb-20'>
          <p className='m-0 p-0 mt-0'>
            {`const paragraph = React.createElement(`}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
              } leading-normal`}
            />
            {`, {}, 'This is a paragraph without using JSX!');`}
          </p>
          <br />
          <p className='mt-4'>
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
        <code className='leading-[3] block text-black text-lg  mb-10'>
          {/* prettier-ignore */}
          <pre>
						{`const paragraph = `}
						<input
							value={
								canShowAns
									? answers.answerOne
									: inputAnswers.answerOne ?? ''
							}
							type='text'
							name='answerOne'
							onChange={handleInputTyping}
							className={
								`${canShowAns ? 'text-rose-700 font-medium' : 'text-black'} leading-normal`
							}
						/>
						{`This is a paragraph using JSX!`}
						<input
							value={
								canShowAns
									? answers.answerTwo
									: inputAnswers.answerTwo ?? ''
							}
							type='text'
							name='answerTwo'
							onChange={handleInputTyping}
							className={
								`${canShowAns ? 'text-rose-700 font-medium' : 'text-black'} leading-normal`
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
        <code className='leading-[3]  block text-black text-lg mb-10'>
          {`const myelement = <h1>React is`}&nbsp;
          <input
            value={
              canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
            }
            type='text'
            name='answerOne'
            onChange={handleInputTyping}
            className={`${
              canShowAns ? 'text-rose-700 font-medium' : 'text-black'
            } leading-normal`}
          />
          {`10 * 10`}
          <input
            value={
              canShowAns ? answers.answerTwo : inputAnswers.answerTwo ?? ''
            }
            type='text'
            name='answerTwo'
            onChange={handleInputTyping}
            className={`${
              canShowAns ? 'text-rose-700 font-medium' : 'text-black'
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
        <code className='leading-[3]  block text-black text-lg mb-20'>
          <pre>
            {`const title = <h1 `}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
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
        <code className='block text-black text-lg mb-20'>
          <p className='mb-3'>
            {`function`}&nbsp;
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
              } leading-normal`}
            />
            {`(props) {`}
          </p>
          <p className='mb-3 ml-5'>{`return <h2>Hi, I'm {props.name}</h2>;`}</p>
          {`}`}
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
        <code className='block text-black text-lg mb-10'>
          <p className='mb-3'>
            {`function Person(`}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
              }
            />
            {`) {`}
          </p>
          <p className='ml-4'>
            {`return <h1>Hi, I'm {`}
            <input
              value={
                canShowAns ? answers.answerTwo : inputAnswers.answerTwo ?? ''
              }
              type='text'
              name='answerTwo'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
              } leading-normal`}
            />
            {`.name}!</h1>;`}
          </p>
          <p>{`}`}</p>

          <p className='mt-14'>{`
ReactDOM.render(<Person name="Jesse"/>, document.getElementById('root'));`}</p>
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
        <code className='block text-black text-lg'>
          <pre>
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
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
              } leading-normal`}
            />
            {` name `}
            <input
              value={
                canShowAns ? answers.answerTwo : inputAnswers.answerTwo ?? ''
              }
              type='text'
              name='answerTwo'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
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
        <code className='block text-black text-lg mb-20'>
          <pre>
            {`<button `}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
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
        <code className='block text-black text-lg'>
          <pre>
            {`function App({isLoggedIn}) {
return (
	<>
		<h1>My Application</h1>
		{isLoggedIn `}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
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
        <code className='block text-black text-lg'>
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
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
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
        <code className='block text-black text-lg'>
          <pre>
            {`import { useState } from "react";

function KeepCount() {
const  [`}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
              } leading-normal`}
            />
            {`, `}
            <input
              value={
                canShowAns ? answers.answerTwo : inputAnswers.answerTwo ?? ''
              }
              type='text'
              name='answerTwo'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
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
        <code className='block text-black text-lg'>
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
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
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
      quesText: `Add the following CSS styles inline to the <h1> element
			
color = "purple"`,
      ques: (
        <code className='block text-black text-lg'>
          <pre>
            {`const Header = () => {
return (
	<>
		<h1 style=`}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
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
      quesText: `Add the following CSS styles inline to the <h1> element
			
background-color = "yellow"`,
      ques: (
        <code className='block text-black text-lg'>
          <pre>
            {`const Header = () => {
return (
	<>
		<h1 style=`}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
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
      quesText: `Import the App.css file in order to include its styles in the current component assuming the current
component and the style sheet are in the same directory.`,
      ques: (
        <code className='block text-black text-lg'>
          <pre>
            {`import  `}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
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
        <code className='block text-black text-lg'>
          <pre>
            {`header.`}
            <input
              value={
                canShowAns ? answers.answerOne : inputAnswers.answerOne ?? ''
              }
              type='text'
              name='answerOne'
              onChange={handleInputTyping}
              className={`${
                canShowAns ? 'text-rose-700 font-medium' : 'text-black'
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
  // dataUri: true,

  let avataar = createAvatar(style, {
    seed: svgSeed,
  });

  return (
    <>
      <Modal
        isOpen={isResultsModalOpen}
        isOpenToggler={toggleIsResultsModalOpen}
        position='top-[15%] left-[30%]'
        isWithCrossButton
      >
        <h2 className='capitalize text-center text-3xl mb-10'>
          congratulations🎉!
        </h2>
        <p className='text-xl text-center mb-6'>
          You have completed all {totalExercises} React exercises.
        </p>
        <p className='text-center mb-6'>Share your score:</p>
        <div className='flex justify-center items-center mb-20 gap-1'>
          <FaFacebookSquare className='w-12 cursor-pointer h-auto text-[#33558e]' />
          <FaTwitterSquare className='w-12 cursor-pointer h-auto text-[#1da1f2]' />
          <FaLinkedin className='w-12 cursor-pointer h-auto text-[#2867b2]' />
        </div>
        <section className='flex flex-nowrap gap-x-5 justify-center items-center'>
          <Link href='/dashboard'>
            <a className='modal-btn text-base capitalize px-12 font-semibold py-3 '>
              see yourself in comparison with others
            </a>
          </Link>
          <Link href='/'>
            <a className='m-0 capitalize text-black text-base font-semibold'>
              back to home
            </a>
          </Link>
        </section>
      </Modal>
      <div className='grow px-6 pt-4'>
        <button
          className='modal-btn text-base px-5 py-2'
          onClick={setShouldTimerBeStopped}
        >
          toggle timer
        </button>
        <section className='relative'>
          {!isNavPanelOpen && (
            <div
              className='w-8 cursor-pointer h-auto absolute top-0'
              onClick={() => toggleIsNavPanelOpen()}
            >
              <MenuIcon />
            </div>
          )}
          {userName && (
            <aside className='flex flex-col justify-between items-stretch gap-y-5 pr-4 w-fit ml-auto'>
              <header className='flex flex-nowrap justify-between items-center gap-x-5'>
                <div className='w-fit overflow-hidden shadow-lg outline outline-2 outline-green-300'>
                  <Image
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                      avataar
                    )}`}
                    alt='avatar not available'
                    width={65}
                    height={45}
                  />
                </div>
                <p className='capitalize text-lg font-semibold max-w-[20ch] whitespace-nowrap overflow-hidden text-ellipsis'>
                  {userName}
                </p>
              </header>
              <hr />
              <footer className='flex flex-nowrap justify-center items-center gap-x-10'>
                <ClockIcon className='w-9 text-green-600 h-auto' />
                <div>
                  <Timer shouldTimerBeStopped={shouldTimerBeStopped} />
                </div>
              </footer>
            </aside>
          )}
        </section>
        <section className='pt-20'>
          <h1 className='mb-6 capitalize text-4xl font-medium'>exercise:</h1>
          <QAModel
            quesText={memoizedCurrentQAModelData?.quesText ?? 'no ques found!'}
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
    </>
  );
};

export default QAPanel;
