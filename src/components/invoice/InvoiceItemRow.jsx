import { FaGripVertical } from 'react-icons/fa';
import { PiTrashSimple } from 'react-icons/pi';

const InvoiceItemRow = () => {
  return (
    <tr className='border-b border-gray-200 dark:border-gray-700 relative'>
      {/* Drag handle */}
      <td className='w-[32px] pl-1 pr-0 relative'>
        <FaGripVertical className='text-gray-400 dark:text-gray-500 cursor-grab absolute left-[-10px] top-1/2 -translate-y-1/2' />
      </td>

      {/* Item dropdown */}
      <td className='flex-1 py-2 px-2'>
        <select className='w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800'>
          <option>Type or select an item</option>
        </select>
      </td>

      {/* Qty */}
      <td className='w-[80px] py-2 px-2'>
        <input
          type='text'
          value='0.00'
          readOnly
          className='w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-right'
        />
      </td>

      {/* Rate */}
      <td className='w-[80px] py-2 px-2'>
        <input
          type='text'
          value='0.00'
          readOnly
          className='w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-right'
        />
      </td>

      {/* Discount */}
      <td className='w-[140px] py-2 px-2'>
        <div className='flex gap-1'>
          <input
            type='text'
            value='0'
            readOnly
            className='w-1/2 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-right'
          />
          <select className='w-1/2 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800'>
            <option>%</option>
          </select>
        </div>
      </td>

      {/* Amount */}
      <td className='w-[90px] py-2 px-2 text-right font-semibold text-gray-900 dark:text-gray-100'>
        $0.00
      </td>

      {/* Delete icon */}
      <td className='w-[32px] pr-1 relative'>
        <button className='absolute right-[-10px] top-1/2 -translate-y-1/2 text-red-600 hover:text-red-800 dark:text-gray-300 dark:hover:text-gray-400'>
          <PiTrashSimple size={18} />
        </button>
      </td>
    </tr>
  );
};

export default InvoiceItemRow;
