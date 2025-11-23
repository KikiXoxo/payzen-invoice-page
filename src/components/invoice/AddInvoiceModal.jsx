import { useState } from 'react';
import { FaChevronDown, FaImage, FaCog } from 'react-icons/fa';
import InvoiceItemsList from './InvoiceItemsList';
import { useInvoicesStore } from '../../stores/invoicesStore';
import { emptyItem, buildInvoice } from '../../helpers/invoiceBuilder';
import { clients } from '../../data/modalData';

const AddInvoiceModal = ({ isOpen, onClose }) => {
  const addInvoice = useInvoicesStore(state => state.addInvoice);
  const nextInvoiceId = useInvoicesStore(state => state.nextInvoiceId);

  const [form, setForm] = useState({
    clientName: '',
    issueDate: '',
    dueDate: '',
    invoiceNumber: '',
    purchaseOrder: '',
    items: [emptyItem()],
  });

  const updateField = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const updateItem = (index, field, value) =>
    setForm(prev => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });

  const addItemRow = () =>
    setForm(prev => ({ ...prev, items: [...prev.items, emptyItem()] }));

  const removeItem = index =>
    setForm(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));

  // Handle save
  const handleSaveAndSend = () => {
    if (!form.clientName || !form.issueDate || !form.dueDate) {
      alert('Please select a client and fill in the dates');
      return;
    }

    for (let itm of form.items) {
      if (!itm.description) {
        alert('Please select all invoice items');
        return;
      }
    }

    const invoiceToSave = buildInvoice(nextInvoiceId, {
      ...form,
      status: 'Paid',
    });

    addInvoice(invoiceToSave);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white dark:bg-gray-800 w-full max-w-6xl h-[90vh] rounded-xl shadow-lg flex flex-col overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-300 dark:border-gray-700 flex-shrink-0'>
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
            <button
              onClick={handleSaveAndSend}
              className='flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-indigo-300 text-white dark:text-gray-800 hover:bg-blue-700 dark:hover:bg-indigo-200 rounded-full text-sm'
            >
              Save and Sent
              <FaChevronDown className='text-xs' />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className='flex flex-1 overflow-y-auto'>
          {/* Main Form Card */}
          <div className='w-4/5 p-4'>
            <div className='border border-gray-400 dark:border-gray-600 rounded-lg p-6'>
              <div className='flex justify-between items-start gap-6 w-full'>
                {/* Logo Upload Box */}
                <div className='w-[200px] h-[120px] bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-md flex flex-col items-center justify-center text-center px-2'>
                  <FaImage className='text-3xl text-gray-500 dark:text-gray-400 mb-2' />
                  <p className='text-xs text-gray-600 dark:text-gray-300'>
                    Drag your Logo here, or
                  </p>
                  <button className='text-xs text-blue-600 dark:text-indigo-300 hover:text-blue-700'>
                    select a file
                  </button>
                </div>

                {/* Business Info */}
                <div className='flex flex-col items-end text-right'>
                  <p className='text-sm font-medium text-gray-800 dark:text-gray-100'>
                    Kiki Studios
                  </p>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>
                    +1 234 567 8900
                  </p>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>
                    kiki@example.com
                  </p>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>
                    Mali
                  </p>

                  <button className='text-xs text-blue-600 hover:text-blue-700 dark:text-indigo-300 mt-1'>
                    Edit business info
                  </button>

                  {/* Amount Due */}
                  <div className='mt-12 text-right'>
                    <p className='text-xs font-bold dark:text-gray-300'>
                      Amount Due (USD)
                    </p>
                    <p className='text-3xl font-semibold text-gray-900 dark:text-gray-100'>
                      ${buildInvoice(0, form).total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8 grid grid-cols-3 gap-x-8 gap-y-1'>
                {/* Bill To */}
                <div>
                  <label className='text-xs font-medium text-gray-700 dark:text-gray-300'>
                    Bill To <span className='text-red-500'>*</span>
                  </label>
                  <select
                    value={form.clientName}
                    onChange={e => updateField('clientName', e.target.value)}
                    required
                    className='w-full mt-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800'
                  >
                    <option value=''>Select a client</option>
                    {clients.map((client, i) => (
                      <option key={i} value={client}>
                        {client}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Issue Date */}
                <div>
                  <label className='text-xs font-medium text-gray-700 dark:text-gray-300'>
                    Issue Date <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='date'
                    value={form.issueDate}
                    onChange={e => updateField('issueDate', e.target.value)}
                    required
                    className='w-full mt-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800'
                  />
                </div>

                {/* Invoice Number */}
                <div>
                  <label className='text-xs font-medium text-gray-700 dark:text-gray-300'>
                    Invoice Number <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      value={nextInvoiceId}
                      onChange={e =>
                        updateField('invoiceNumber', e.target.value)
                      }
                      disabled
                      className='w-full mt-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800'
                    />
                    <FaCog className='absolute right-2 top-2.5 text-gray-700 dark:text-gray-500' />
                  </div>
                </div>

                {/* Empty Grid Spot */}
                <div></div>

                {/* Due Date */}
                <div>
                  <label className='text-xs font-medium text-gray-700 dark:text-gray-300'>
                    Due Date <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='date'
                    value={form.dueDate}
                    onChange={e => updateField('dueDate', e.target.value)}
                    required
                    className='w-full mt-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800'
                  />
                </div>

                {/* Purchase Order */}
                <div>
                  <label className='text-xs font-medium text-gray-700 dark:text-gray-300'>
                    Purchase Order
                  </label>
                  <input
                    type='text'
                    value={form.purchaseOrder}
                    onChange={e => updateField('purchaseOrder', e.target.value)}
                    placeholder='e.g. PO #00023'
                    className='w-full mt-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800'
                  />
                </div>
              </div>

              <div className='mt-6 border-b-[3px] border-gray-600 dark:border-gray-400'></div>

              {/* Invoice Items */}
              <InvoiceItemsList
                items={form.items}
                updateItem={updateItem}
                addItem={addItemRow}
                removeItem={removeItem}
              />
            </div>
          </div>

          {/* Customization Panel */}
          <div className='w-1/5 p-4'>
            <h3 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
              Customization
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInvoiceModal;
