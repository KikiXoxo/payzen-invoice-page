import { useState } from 'react';
import { FaChevronDown, FaPlus } from 'react-icons/fa';
import { useInvoicesStore } from '../../stores/invoicesStore';
import { emptyItem, buildInvoice } from '../../helpers/invoiceBuilder';
import InvoiceEditor from './InvoiceEditor';
import InvoicePreview from './InvoicePreview';
import dayjs from 'dayjs';

const AddInvoiceModal = ({ isOpen, onClose }) => {
  const addInvoice = useInvoicesStore(state => state.addInvoice);
  const nextInvoiceId = useInvoicesStore(state => state.nextInvoiceId);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [markAsSent, setMarkAsSent] = useState(false);
  const [receivedPayment, setReceivedPayment] = useState(false);

  const [form, setForm] = useState({
    clientName: '',
    issueDate: '',
    dueDate: '',
    invoiceNumber: '',
    purchaseOrder: '',
    items: [emptyItem()],
  });

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

    if (!markAsSent) {
      alert('Mark invoice as sent first');
      return;
    }

    // Determine status
    const today = dayjs().startOf('day');
    let status = 'Outstanding';

    if (receivedPayment) {
      status = 'Paid';
    } else if (form.dueDate && dayjs(form.dueDate).isBefore(today)) {
      status = 'Overdue';
    }

    const invoiceToSave = buildInvoice(nextInvoiceId, {
      ...form,
      status,
    });

    // Prevent submit if invoice total is 0 or less
    if (!invoiceToSave.total || invoiceToSave.total <= 0) {
      alert(
        'Invoice total must be greater than $0.00. Add items or increase amounts.'
      );
      return;
    }

    addInvoice(invoiceToSave);

    // Reset form
    setForm({
      clientName: '',
      issueDate: '',
      dueDate: '',
      invoiceNumber: '',
      purchaseOrder: '',
      items: [emptyItem()],
    });

    setLogoPreview(null);
    setIsPreview(false);
    setMarkAsSent(false);
    setReceivedPayment(false);
    onClose();
  };

  // Handle Logo Change
  const handleLogoChange = e => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a local URL to preview the image
    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white dark:bg-gray-800 w-full max-w-6xl h-[90vh] rounded-xl shadow-lg flex flex-col overflow-hidden mx-2'>
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
            <button className='hidden md:block px-4 py-2 border border-blue-600 dark:border-indigo-300 text-blue-600 dark:text-indigo-300 rounded-full text-sm'>
              Save as Draft
            </button>

            {/* Mobile version */}
            <button
              onClick={handleSaveAndSend}
              className='md:hidden flex items-center justify-center w-8 h-8 bg-blue-600 dark:bg-indigo-300 text-white dark:text-gray-800 hover:bg-blue-700 dark:hover:bg-indigo-200 rounded-full'
            >
              <FaPlus className='text-sm' />
            </button>
            {/* Desktop version */}
            <button
              onClick={handleSaveAndSend}
              className='hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-indigo-300 text-white dark:text-gray-800 hover:bg-blue-700 dark:hover:bg-indigo-200 rounded-full text-sm'
            >
              Save and Sent
              <FaChevronDown className='text-xs' />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className='flex flex-col lg:flex-row flex-1 overflow-y-auto'>
          <div className='w-full lg:w-3/4 p-4'>
            {isPreview ? (
              <InvoicePreview
                form={form}
                logoPreview={logoPreview}
                nextInvoiceId={nextInvoiceId}
              />
            ) : (
              <InvoiceEditor
                form={form}
                setForm={setForm}
                logoPreview={logoPreview}
                setLogoPreview={setLogoPreview}
                handleLogoChange={handleLogoChange}
                nextInvoiceId={nextInvoiceId}
              />
            )}
          </div>

          {/* Customization Panel */}
          <div className='w-full lg:w-1/4 py-4 pr-2 space-y-2'>
            <div className='bg-gray-50 dark:bg-gray-900 rounded-md px-3 py-2 flex items-center justify-between'>
              <p className='text-xs font-semibold text-gray-700 dark:text-gray-200'>
                Preview Invoice
              </p>

              {/* Toggle */}
              <div
                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${
                  isPreview ? 'bg-blue-600' : 'bg-gray-400 dark:bg-gray-600'
                }`}
                onClick={() => setIsPreview(prev => !prev)}
              >
                <div
                  className={`w-4 h-4 bg-white dark:bg-gray-300 rounded-full absolute top-0.5 transition-all ${
                    isPreview ? 'left-5' : 'left-0.5'
                  }`}
                ></div>
              </div>
            </div>

            {/* Customization Section */}
            <div className='bg-gray-50 dark:bg-gray-900 rounded-md px-3 py-3'>
              <div className='flex items-center justify-between'>
                <h3 className='text-sm font-bold text-gray-800 dark:text-gray-200'>
                  Customization
                </h3>
                <FaChevronDown className='text-gray-600 dark:text-gray-300 rotate-180 text-sm' />
              </div>

              <div className='mt-4'>
                <div className='flex items-center justify-between'>
                  <p className='text-xs font-medium text-gray-700 dark:text-gray-300'>
                    Template style
                  </p>

                  <div className='flex items-center bg-gray-200 dark:bg-gray-950 rounded-full p-1'>
                    <div className='px-2 text-[11px] font-semibold text-gray-800 dark:text-gray-300'>
                      Simple
                    </div>
                    <div className='px-2 py-[2px] text-[11px] font-bold bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-full'>
                      Modern
                    </div>
                  </div>
                </div>
              </div>

              {/* Font Section */}
              <div className='mt-2'>
                <div className='flex items-center justify-between'>
                  <p className='text-xs font-medium text-gray-700 dark:text-gray-300'>
                    Font
                  </p>

                  <div className='flex items-center bg-gray-200 dark:bg-gray-950 rounded-full p-1'>
                    <div className='px-2 text-[11px] font-semibold text-gray-800 dark:text-gray-300'>
                      Classic
                    </div>
                    <div className='px-2 py-[2px] text-[11px] font-bold bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-full'>
                      Modern
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Record Invoice */}
            <div className='bg-gray-50 text-gray-800 font-bold dark:bg-gray-900 rounded-md px-3 py-3 space-y-3'>
              <div className='flex items-center justify-between'>
                <h3 className='text-sm dark:text-gray-200'>
                  Record the invoice
                </h3>
                <FaChevronDown className='text-gray-600 dark:text-gray-300 rotate-180 text-sm' />
              </div>

              <label className='flex items-center gap-2 mt-2'>
                <input
                  type='checkbox'
                  className='w-4 h-4'
                  checked={receivedPayment}
                  onChange={e => setReceivedPayment(e.target.checked)}
                />
                <span className='text-xs dark:text-gray-300'>
                  I have received the payment.
                </span>
              </label>

              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  className='w-4 h-4'
                  checked={markAsSent}
                  onChange={e => setMarkAsSent(e.target.checked)}
                />
                <span className='text-xs dark:text-gray-300'>
                  Mark it as sent.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInvoiceModal;
