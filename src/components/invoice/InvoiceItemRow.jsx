import { invoiceItems } from '../../data/modalData';
import { FaGripVertical } from 'react-icons/fa';
import { PiTrashSimple } from 'react-icons/pi';
import { formatCurrency } from '../../helpers/utils';

const InvoiceItemRow = ({ item, index, updateItem, removeItem, readOnly }) => {
  const formattedCurrency = formatCurrency(
    item.quantity * item.rate * (1 - item.discount / 100)
  );

  return (
    <tr className='border-b border-gray-200 dark:border-gray-700 relative'>
      {/* Drag handle */}
      {!readOnly && (
        <td className='w-[32px] pl-1 pr-0 relative'>
          <FaGripVertical className='text-gray-400 dark:text-gray-500 cursor-grab absolute left-[-10px] top-1/2 -translate-y-1/2' />
        </td>
      )}

      {/* Item description */}
      <td className='flex-1 py-2 px-2'>
        {readOnly ? (
          <span className='text-sm'>{item.description || 'N/A'}</span>
        ) : (
          <select
            value={item.description}
            onChange={e => updateItem(index, 'description', e.target.value)}
            required
            className='w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800'
          >
            <option value=''>Select an item</option>
            {invoiceItems.map((itm, i) => (
              <option key={i} value={itm}>
                {itm}
              </option>
            ))}
          </select>
        )}
      </td>

      {/* Qty */}
      <td className='w-[80px] py-2 px-2 text-right'>
        {readOnly ? (
          <span className='text-sm'>{item.quantity}</span>
        ) : (
          <input
            type='number'
            value={item.quantity}
            onChange={e => updateItem(index, 'quantity', e.target.value)}
            className='w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-right'
          />
        )}
      </td>

      {/* Rate */}
      <td className='w-[80px] py-2 px-2 text-right'>
        {readOnly ? (
          <span className='text-sm'>{formatCurrency(item.rate)}</span>
        ) : (
          <input
            type='number'
            value={item.rate}
            onChange={e => updateItem(index, 'rate', e.target.value)}
            className='w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-right'
          />
        )}
      </td>

      {/* Discount */}
      <td className='w-[140px] py-2 px-2 text-right'>
        {readOnly ? (
          <span className='text-sm'>{item.discount}%</span>
        ) : (
          <div className='flex items-center gap-2'>
            <input
              type='number'
              value={item.discount}
              onChange={e => updateItem(index, 'discount', e.target.value)}
              className='w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-right'
            />
            <select
              value='%'
              disabled
              className=' w-[50px] px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-right'
            >
              <option>%</option>
            </select>
          </div>
        )}
      </td>

      {/* Amount */}
      <td className='w-[90px] py-2 px-2 text-right font-semibold text-gray-900 dark:text-gray-100'>
        {formattedCurrency}
      </td>

      {/* Delete */}
      {!readOnly && (
        <td className='w-[32px] pr-1 relative'>
          <button
            onClick={() => removeItem(index)}
            className='absolute right-0 top-1/2 -translate-y-1/2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500'
          >
            <PiTrashSimple size={18} />
          </button>
        </td>
      )}
    </tr>
  );
};

export default InvoiceItemRow;
