import { FaChevronDown } from 'react-icons/fa';

const AddInvoiceModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]'>
      <div className='bg-white dark:bg-gray-800 w-full max-w-6xl rounded-xl shadow-lg'>
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-300 dark:border-gray-700'>
          <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
            Add a New Invoice
          </h2>

          <div className='flex items-center gap-2'>
            <button
              onClick={onClose}
              className='mr-4 text-gray-600 dark:text-gray-300 text-sm hover:text-gray-800 dark:hover:text-gray-100'
            >
              Cancel
            </button>
            <button className='px-4 py-2 border border-blue-600 dark:border-indigo-300 text-blue-600 dark:text-indigo-300 rounded-full text-sm'>
              Save as Draft
            </button>
            <button className='flex items-center gap-2 px-4 py-2 bg-blue-600 dark:text-gray-800 dark:bg-indigo-300 hover:bg-blue-700 dark:hover:bg-indigo-200 text-white rounded-full text-sm'>
              Save and Sent
              <FaChevronDown className='text-xs' />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className='p-6 text-gray-700 dark:text-gray-300 text-sm'>Body</div>
      </div>
    </div>
  );
};

export default AddInvoiceModal;
