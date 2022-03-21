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
import useMediaQuery from '../hooks/useMediaQuery';

const DashboardPage = () => {
  const {
    name,
    scores,
    time: { hrs, mins, sec },
  } = useAppSelector((state) => state.currentUserState.value.currentUser);
  const testResults = useAppSelector((state) => state.testResultsState);
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  return (
    <section className='mb-0 min-h-screen overflow-x-hidden bg-gray-200 pb-20 lg:pb-56'>
      <Header>
        <ProfileAvtaarWithName />
      </Header>
      <main className='pb-16'>
        <CenterContainer>
          <h1 className='my-12 text-center text-3xl font-bold capitalize text-gray-600 lg:text-5xl'>
            dashboard
          </h1>
          <DashoardSection style='flex justify-between items-center space-y-12 lg:space-y-0 lg:space-x-16 flex-wrap py-0 lg:flex-nowrap mb-20'>
            <DataCard textCaption='username'>
              <h1 className='text-gray-700x text-2xl font-bold capitalize lg:text-3xl '>
                {name || 'username'}
              </h1>
            </DataCard>
            <DataCard textCaption='scores'>
              <h1 className='text-2xl font-bold capitalize text-gray-700 lg:text-3xl'>
                {`${scores}` || '0'}
              </h1>
            </DataCard>
            <DataCard textCaption='time taken'>
              <h1 className='text-2xl font-bold capitalize text-gray-700 lg:text-3xl'>
                {hrs}
                <span className='mr-2 text-[0.7rem] font-normal text-gray-400'>
                  {' '}
                  hrs{' '}
                </span>
                {mins}
                <span className='mr-2 text-[0.7rem] font-normal text-gray-400'>
                  {' '}
                  mins{' '}
                </span>
                {sec}
                <span className='mr-2 text-[0.7rem] font-normal text-gray-400'>
                  {' '}
                  secs{' '}
                </span>
              </h1>
            </DataCard>
          </DashoardSection>
          <DashoardSection style=''>
            <div className='dashboard-element mx-auto max-w-fit py-10 px-10 lg:px-40 lg:py-14'>
              <h1 className='mb-1 text-2xl font-bold capitalize text-gray-600 lg:mb-4 lg:text-4xl'>
                players test results
              </h1>
              <p className='mb-12 text-sm text-gray-400 lg:text-base'>
                Below graph shows the test results of max 5 players who took
                this test recently.
              </p>
              <BarChart
                width={800}
                className='mx-auto max-w-full overflow-scroll lg:-ml-12 lg:max-w-none lg:overflow-auto'
                height={400}
                data={testResults}
                margin={{
                  top: 5,
                  right: 30,
                  left: !isLargeScreen ? -35 : 0,
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
          <a className='modal-btn mx-auto block max-w-fit py-3 px-14 text-base font-semibold capitalize lg:text-2xl'>
            retake test <RefreshIcon className='inline-block w-6' />
          </a>
        </Link>
      </footer>
    </section>
  );
};

export default DashboardPage;
