import InvoiceItemsList from './InvoiceItemsList';
import { formatCurrency, formatInvoiceId } from '../../helpers/utils';
import { buildInvoice } from '../../helpers/invoiceBuilder';
import { FaImage } from 'react-icons/fa';
import dayjs from 'dayjs';

const InvoicePreview = ({ form, logoPreview, nextInvoiceId }) => {
  return (
    <div className='border border-gray-400 dark:border-gray-600 rounded-lg p-6'>
      <div className='flex justify-between items-start gap-6 w-full'>
        {/* Logo */}
        <div className='w-[200px] h-[120px] rounded-md relative flex items-center justify-center text-center overflow-hidden px-2'>
          {logoPreview ? (
            <img
              src={logoPreview}
              alt='Logo Preview'
              className='absolute inset-0 w-full h-full object-contain opacity-100'
            />
          ) : (
            <FaImage className='absolute w-24 h-24 text-gray-200 dark:text-gray-700' />
          )}
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
          <p className='text-sm text-gray-600 dark:text-gray-300'>Mali</p>

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

      <div className='mt-8 grid grid-cols-3 gap-x-8 gap-y-4'>
        <div className='text-sm flex flex-col'>
          <label className='font-bold text-gray-700 dark:text-gray-300'>
            Bill To
          </label>
          <p>{form.clientName || 'Client Name'}</p>
          <p>House 12, Apple Road</p>
          <p>The Isles, Velaris</p>
          <p>Italy</p>
        </div>

        <div className='col-span-2 grid grid-cols-2 gap-x-8 gap-y-1'>
          {/* Issue Date */}
          <div>
            <label className='text-xs font-bold text-gray-700 dark:text-gray-300'>
              Issue Date
            </label>
            <p className='text-sm'>
              {form.issueDate
                ? dayjs(form.issueDate).format('DD MMM YYYY')
                : 'N/A'}
            </p>
          </div>

          {/* Invoice Number */}
          <div className='text-right'>
            <label className='text-xs font-bold text-gray-700 dark:text-gray-300'>
              Invoice Number
            </label>
            <p className='text-sm'>#{formatInvoiceId(nextInvoiceId)}</p>
          </div>

          {/* Due Date */}
          <div>
            <label className='text-xs font-bold text-gray-700 dark:text-gray-300'>
              Due Date
            </label>
            <p className='text-sm'>
              {form.dueDate ? dayjs(form.dueDate).format('DD MMM YYYY') : 'N/A'}
            </p>
          </div>

          {/* Purchase Order */}
          <div className='text-right'>
            <label className='text-xs font-bold text-gray-700 dark:text-gray-300'>
              Purchase Order
            </label>
            <p className='text-sm'>{form.purchaseOrder || 'PO #00000'}</p>
          </div>
        </div>
      </div>

      <div className='mt-6 border-b-[3px] border-gray-600 dark:border-gray-400'></div>

      <InvoiceItemsList items={form.items} readOnly />
    </div>
  );
};

export default InvoicePreview;
