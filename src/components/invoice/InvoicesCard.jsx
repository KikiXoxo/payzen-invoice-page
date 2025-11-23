// In InvoicesCard.jsx
import { useEffect, useMemo } from 'react';
import InvoicesList from './InvoicesList';
import { useInvoicesStore } from '../../stores/invoicesStore';
import { FaRegCalendarAlt } from 'react-icons/fa';

const tabs = ['All', 'Outstanding', 'Paid', 'Uncollectible'];

const InvoicesCard = () => {
  // Selectors to prevent unnecessary re-renders
  const fetchInvoices = useInvoicesStore(state => state.fetchInvoices);
  const invoices = useInvoicesStore(state => state.invoices);
  const loading = useInvoicesStore(state => state.loading);
  const error = useInvoicesStore(state => state.error);
  const selectedStatusTab = useInvoicesStore(state => state.selectedStatusTab);
  const setSelectedStatusTab = useInvoicesStore(
    state => state.setSelectedStatusTab
  );

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // Filter invoices based on selected tab
  const filteredInvoices = useMemo(() => {
    if (selectedStatusTab === 'All') return invoices;
    return invoices.filter(inv => inv.status === selectedStatusTab);
  }, [invoices, selectedStatusTab]);

  // Counts to display
  const counts = loading
    ? { All: 0, Outstanding: 0, Paid: 0, Uncollectible: 0 }
    : {
        All: invoices.length,
        Outstanding: invoices.filter(inv => inv.status === 'Outstanding')
          .length,
        Paid: invoices.filter(inv => inv.status === 'Paid').length,
        Uncollectible: invoices.filter(inv => inv.status === 'Uncollectible')
          .length,
      };

  return (
    <div className='bg-white dark:bg-gray-800 py-4 md:py-6 px-2 md:px-4 rounded-md transition'>
      {/* Active Tabs */}
      <div className='flex items-start justify-start gap-6 border-b border-gray-300 dark:border-gray-700 mb-4 transition'>
        {tabs.map(tab => (
          <div
            key={tab}
            onClick={() => setSelectedStatusTab(tab)}
            className={`cursor-pointer pb-2 font-medium text-sm ${
              selectedStatusTab === tab
                ? 'text-blue-600 dark:text-indigo-300 border-b-2 border-blue-600 dark:border-indigo-300'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {tab} ({counts[tab]})
          </div>
        ))}
      </div>

      {/* Dropdowns / Calendar / Sort */}
      <div className='flex items-center justify-between mb-2'>
        <div className='flex items-center gap-2'>
          <select className='min-w-[140px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-0 transition'>
            <option>All Clients</option>
          </select>
          <select className='min-w-[140px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-0 transition'>
            <option>All Status</option>
          </select>

          <div className='min-w-[140px] flex items-center justify-between px-3 h-8 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer select-none transition'>
            <span className='text-sm'>All Time</span>
            <FaRegCalendarAlt className='text-gray-500 dark:text-gray-300' />
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-gray-600 dark:text-gray-300 text-sm'>
            Sort by:
          </span>
          <select className='min-w-[100px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-0 transition'>
            <option>Invoice#</option>
          </select>
        </div>
      </div>

      {/* Invoice List */}
      <InvoicesList
        invoices={filteredInvoices}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default InvoicesCard;
