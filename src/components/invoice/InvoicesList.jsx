import { FaChevronDown } from 'react-icons/fa';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { GoDotFill } from 'react-icons/go';
import dayjs from 'dayjs';
import {
  formatCurrency,
  formatInvoiceId,
  getStatusStyles,
} from '../../helpers/utils';

const InvoicesList = ({ invoices }) => {
  return (
    <div className='w-full overflow-x-auto'>
      <table className='w-full text-xs text-left border-collapse dark:text-gray-300'>
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
          {invoices.map(inv => {
            const status = getStatusStyles(inv.status);
            const amountDue =
              inv.status === 'Paid' || inv.status === 'Uncollectible'
                ? 0
                : inv.total;

            return (
              <tr
                key={inv.id}
                className='border-b dark:border-gray-700 transition'
              >
                {/* Checkbox + ID */}
                <td className='px-4 py-2'>
                  <div className='flex items-center gap-4'>
                    <input
                      type='checkbox'
                      className='accent-blue-600 dark:accent-blue-300 cursor-pointer'
                    />
                    <span className='text-blue-600 dark:text-blue-300 font-semibold'>
                      {formatInvoiceId(inv.id)}
                    </span>
                  </div>
                </td>

                {/* Issue Date */}
                <td className='px-4 py-2'>
                  {dayjs(inv.issueDate).format('DD MMM YYYY')}
                </td>

                {/* Client */}
                <td className='px-4 py-2'>{inv.clientName}</td>

                {/* Status */}
                <td className='px-4 py-2'>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium ${status.bg} ${status.text} ${status.darkModeText} dark:bg-gray-700 transition`}
                  >
                    <GoDotFill
                      className={`w-3 h-3 ${status.text} ${status.darkModeText}`}
                    />
                    {status.label}
                  </span>
                </td>

                {/* Due Date */}
                <td className='px-4 py-2'>
                  {dayjs(inv.dueDate).format('DD MMM YYYY')}
                </td>

                {/* Total */}
                <td className='px-4 py-2'>{formatCurrency(inv.total)}</td>

                {/* Amount Due */}
                <td className='px-4 py-2 flex items-center gap-3'>
                  <div className='w-[100px]'>{formatCurrency(amountDue)}</div>
                  <IoEllipsisHorizontal className='cursor-pointer' />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesList;
