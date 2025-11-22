import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className='w-screen min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition'>
      <Navbar />
      <main className='mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-8'>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
