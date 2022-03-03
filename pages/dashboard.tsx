import Link from 'next/link';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { RefreshIcon } from '@heroicons/react/solid';
import CenterContainer from '../components/CenterContainer';
import DashoardSection from '../components/dashboard/DashoardSection';
import DataCard from '../components/dashboard/ProfileDataCard';
import Header from '../components/Header';
import ProfileAvtaarWithName from '../components/ProfileAvtaarWithName';
import { useAppSelector } from '../hooks/reduxHooks';

const DashboardPage = () => {
  const {
    name,
    scores,
    time: { hrs, mins, sec },
  } = useAppSelector((state) => state.currentUserState.value.currentUser);
  const testResults = useAppSelector((state) => state.testResultsState);
  console.log(testResults);

  return (
    <section className='min-h-screen bg-gray-200 overflow-x-hidden pb-56 mb-0'>
      <Header>
        {/* <Link href='/'>
          <a className='nav-item'>home</a>
        </Link> */}
        <ProfileAvtaarWithName />
      </Header>
      <main className='pb-16'>
        <CenterContainer>
          <h1 className='text-center capitalize text-5xl text-gray-600 font-bold my-12'>
            dashboard
          </h1>
          <DashoardSection style='flex justify-between items-center space-x-16'>
            <DataCard textCaption='username'>
              <h1 className='text-3xl text-gray-700 font-bold capitalize'>
                {name || 'username'}
              </h1>
            </DataCard>
            <DataCard textCaption='scores'>
              <h1 className='text-3xl text-gray-700 font-bold capitalize'>
                {`${scores}` || '0'}
              </h1>
            </DataCard>
            <DataCard textCaption='time taken'>
              <h1 className='text-3xl text-gray-700 font-bold capitalize'>
                {hrs}
                <span className='text-[0.7rem] mr-2 font-normal text-gray-400'>
                  {' '}
                  hrs{' '}
                </span>
                {mins}
                <span className='text-[0.7rem] mr-2 font-normal text-gray-400'>
                  {' '}
                  mins{' '}
                </span>
                {sec}
                <span className='text-[0.7rem] mr-2 font-normal text-gray-400'>
                  {' '}
                  secs{' '}
                </span>
              </h1>
            </DataCard>
          </DashoardSection>
          <DashoardSection style=''>
            <div className='dashboard-element max-w-fit mx-auto px-40 py-14'>
              <h1 className='capitalize text-4xl text-gray-600 font-bold mb-4'>
                players test results
              </h1>
              <p className='text-gray-400 mb-12'>
                Below graph shows the test results of max 5 players who took
                this test recently.
              </p>
              <BarChart
                width={800}
                className='-ml-12'
                height={400}
                data={testResults}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis dataKey='scores' />
                <Tooltip />
                <Legend />
                <Bar dataKey='scores' barSize={30} fill='#4ade80' />
                <Bar dataKey='mins' barSize={30} fill='#cf0559' />
              </BarChart>
            </div>
          </DashoardSection>
        </CenterContainer>
      </main>
      <footer>
        <Link href='/react-exercise'>
          <a className='max-w-fit block modal-btn capitalize py-3 px-14 font-semibold text-2xl mx-auto'>
            retake test <RefreshIcon className='w-6 inline-block' />
          </a>
        </Link>
      </footer>
    </section>
  );
};

export default DashboardPage;
