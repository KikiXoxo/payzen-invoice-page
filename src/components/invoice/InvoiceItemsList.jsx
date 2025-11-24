import React, { useMemo } from 'react';
import InvoiceItemRow from './InvoiceItemRow';

const InvoiceItemsList = ({
  items,
  updateItem,
  addItem,
  removeItem,
  readOnly,
}) => {
  const rows = useMemo(() => {
    return items.map((item, index) => (
      <InvoiceItemRow
        key={index}
        item={item}
        index={index}
        updateItem={updateItem}
        removeItem={removeItem}
        readOnly={readOnly}
      />
    ));
  }, [items, updateItem, removeItem, readOnly]);

  return (
    <div className='mt-4'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='border-b border-gray-300 dark:border-gray-500 text-sm text-gray-700 dark:text-gray-300 font-medium'>
            {!readOnly && <th className='w-[32px]'></th>}
            <th className='text-left px-2'>Item Details</th>
            <th className='w-[80px] text-right px-2'>Qty</th>
            <th className='w-[80px] text-right px-2'>Rate</th>
            <th className='w-[140px] text-right px-2'>Discount</th>
            <th className='w-[90px] text-right px-2'>Amount</th>
            {!readOnly && <th className='w-[32px]'></th>}
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>

      {!readOnly && (
        <div className='flex justify-end mt-3'>
          <button
            onClick={addItem}
            className='px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          >
            + Add New Item
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(InvoiceItemsList);
