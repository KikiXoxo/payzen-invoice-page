import { FaChevronDown } from 'react-icons/fa';

const Summary = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
      {/* LEFT CARD */}
      <div className='bg-white dark:bg-gray-800 p-4 rounded-md transition'>
        <div className='grid grid-cols-2 gap-6'>
          <div>
            <div className='text-gray-700 dark:text-gray-300 font-bold text-sm'>
              Overdue
            </div>
            <div className='mt-1 flex items-baseline gap-1'>
              <span className='text-3xl font-semibold'>$0</span>
              <span className='text-sm text-gray-500 font-medium dark:text-gray-400'>
                USD
              </span>
            </div>
          </div>

          <div>
            <div className='text-gray-700 dark:text-gray-300 font-bold text-sm'>
              Total Outstanding
            </div>
            <div className='mt-1 flex items-baseline gap-1'>
              <span className='text-3xl font-semibold'>$0</span>
              <span className='text-sm text-gray-500 font-medium dark:text-gray-400'>
                USD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className='bg-white dark:bg-gray-800 p-4 rounded-md transition'>
        <div className='flex justify-between gap-6'>
          <div>
            <div className='text-gray-700 dark:text-gray-300 font-bold text-sm'>
              Get paid
            </div>
            <div className='mt-1 flex items-baseline gap-1'>
              <span className='text-3xl font-semibold'>$0</span>
              <span className='text-sm text-gray-500 font-medium dark:text-gray-400'>
                USD
              </span>
            </div>
          </div>

          <div>
            <div className='text-gray-700 dark:text-gray-300 font-bold text-sm'>
              Uncollectible
            </div>
            <div className='mt-1 flex items-baseline gap-1'>
              <span className='text-3xl font-semibold'>$0</span>
              <span className='text-sm text-gray-500 font-medium dark:text-gray-400'>
                USD
              </span>
            </div>
          </div>

          <div className='flex flex-col justify-between'>
            <div className='flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium text-sm'>
              Last Month
              <FaChevronDown className='text-xs' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
