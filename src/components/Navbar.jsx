import { Link, NavLink } from 'react-router-dom';
import { PiMoonFill, PiSunFill } from 'react-icons/pi';
import { FaChevronDown } from 'react-icons/fa';
import { AiFillBell } from 'react-icons/ai';
import { useThemeStore } from '../stores/themeStore';

const Navbar = () => {
  const links = [
    { name: 'Invoices', to: '/' },
    { name: 'Clients', to: '/clients' },
    { name: 'Service Items', to: '/service-items' },
  ];

  const toggleTheme = useThemeStore(state => state.toggleTheme);

  return (
    <nav className='w-full bg-white dark:bg-gray-800 px-4 md:px-6 h-12 flex items-center justify-between transition'>
      <div className='flex items-center gap-6 md:gap-12'>
        <Link to='/' className='text-2xl font-semibold'>
          PayZen
        </Link>

        <div className='hidden md:flex items-center gap-6'>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-bold py-[16px] h-12 ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-indigo-300 dark:border-indigo-300'
                    : 'text-gray-700 dark:text-gray-100 hover:text-black dark:hover:text-gray-300'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Right section */}
      <div className='flex items-center gap-3'>
        <button onClick={toggleTheme} className='dark:hidden'>
          <PiMoonFill className='w-5 h-5 hover:text-gray-700 transition' />
        </button>
        <button onClick={toggleTheme} className='hidden dark:block'>
          <PiSunFill className='w-5 h-5 hover:text-gray-300 transition' />
        </button>

        <AiFillBell className='w-5 h-5 hover:text-gray-700 dark:hover:text-gray-300 transition cursor-pointer' />

        <img
          src='/profile.jpg'
          alt='profile'
          className='w-9 h-9 rounded-full object-cover'
        />

        <FaChevronDown className='font-bold w-3 h-3 text-gray-600 dark:text-gray-200' />
      </div>
    </nav>
  );
};

export default Navbar;
