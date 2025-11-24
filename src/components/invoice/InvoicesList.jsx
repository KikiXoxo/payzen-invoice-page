import { FaChevronDown } from 'react-icons/fa';
import SkeletonLoader from '../SkeletonLoader';
import InvoiceRow from './InvoiceRow';

const InvoicesList = ({ invoices, loading, error }) => {
  if (loading) return <SkeletonLoader />;

  if (error)
    return (
      <p className='p-6 text-center text-red-500 dark:text-red-400'>{error}</p>
    );

  return (
    <div className='w-full overflow-x-auto'>
      <table className='w-full text-xs text-left border-collapse dark:text-gray-300 whitespace-nowrap'>
        {/* HEADERS */}
        <thead className='text-gray-600 dark:text-gray-300 font-medium border-b dark:border-gray-700 transition'>
          <tr>
            <th className='px-4 py-3'>
              <div className='flex items-center gap-2'>
                Invoice# <FaChevronDown className='text-xs' />
              </div>
            </th>
            <th className='px-4 py-3'>Invoice Date</th>
            <th className='px-4 py-3'>Client</th>
            <th className='px-4 py-3'>Status</th>
            <th className='px-4 py-3'>Due Date</th>
            <th className='px-4 py-3'>Total</th>
            <th className='px-4 py-3'>Amount Due</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map(inv => (
            <InvoiceRow key={inv.id} inv={inv} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesList;
