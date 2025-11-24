import InvoiceItemsList from './InvoiceItemsList';
import { clients } from '../../data/modalData';
import { formatCurrency, formatInvoiceId } from '../../helpers/utils';
import { buildInvoice } from '../../helpers/invoiceBuilder';
import { FaCog, FaImage } from 'react-icons/fa';

const InvoiceEditor = ({
  form,
  setForm,
  logoPreview,
  handleLogoChange,
  nextInvoiceId,
}) => {
  const updateField = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const updateItem = (index, field, value) =>
    setForm(prev => {
      const items = [...prev.items];
      let newValue = value;

      // Convert number fields
      if (['quantity', 'rate', 'discount'].includes(field)) {
        newValue = Number(value) || 0;
      }

      // Max and min values
      if (field === 'quantity') newValue = Math.max(0, Math.min(newValue, 20));
      if (field === 'discount') newValue = Math.max(0, Math.min(newValue, 100));
      if (field === 'rate') newValue = Math.max(0, newValue);

      items[index] = { ...items[index], [field]: newValue };
      return { ...prev, items };
    });

  const addItemRow = () =>
    setForm(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { description: '', quantity: 1, rate: 0, discount: 0 },
      ],
    }));

  const removeItem = index =>
    setForm(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));

  return (
    <div className='border border-gray-400 dark:border-gray-600 rounded-lg p-6'>
      <div className='flex flex-row justify-between items-start gap-6 w-full md:flex-row'>
        {/* Logo Upload Box */}
        <div className='w-full md:w-[200px] h-[120px] bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-md relative flex items-center justify-center text-center overflow-hidden px-2'>
          {logoPreview ? (
            <img
              src={logoPreview}
              alt='Logo Preview'
              className='absolute inset-0 w-full h-full object-contain opacity-40'
            />
          ) : (
            <FaImage className='absolute w-24 h-24 text-gray-200 dark:text-gray-700' />
          )}

          <div className='relative z-10 flex flex-col items-center'>
            <p className='font-semibold text-xs text-gray-800 dark:text-gray-200'>
              Drag your Logo here, or
            </p>
            <button
              onClick={() => document.getElementById('logoInput').click()}
              className='text-xs text-blue-600 dark:text-indigo-300 hover:text-blue-800 dark:hover:text-indigo-400 mt-1'
            >
              select a file
            </button>
          </div>

          <input
            type='file'
            id='logoInput'
            accept='image/*'
            className='hidden'
            onChange={handleLogoChange}
          />
        </div>

        {/* Business Info */}
        <div className='flex flex-col items-end text-right ml-auto'>
          <p className='text-sm font-medium text-gray-800 dark:text-gray-100'>
            Kiki Studios
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-300'>
            +1 234 567 8900
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-300'>
            kiki@example.com
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-300'>Mali</p>

          <button className='text-xs text-blue-600 hover:text-blue-700 dark:text-indigo-300 mt-1'>
            Edit business info
          </button>

          <div className='mt-12 text-right'>
            <p className='text-xs font-bold dark:text-gray-300'>
              Amount Due (USD)
            </p>
            <p className='text-3xl font-semibold text-gray-900 dark:text-gray-100'>
              {formatCurrency(buildInvoice(0, form).total)}
            </p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
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
              value={formatInvoiceId(nextInvoiceId)}
              disabled
              className='w-full mt-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800'
            />
            <FaCog className='absolute right-2 top-2.5 text-gray-700 dark:text-gray-500' />
          </div>
        </div>

        {/* Empty Spot */}
        <div className='hidden lg:block'></div>

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

      <InvoiceItemsList
        items={form.items}
        updateItem={updateItem}
        addItem={addItemRow}
        removeItem={removeItem}
      />
    </div>
  );
};

export default InvoiceEditor;
