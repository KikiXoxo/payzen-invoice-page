import { useEffect } from 'react';
import InvoicesList from './InvoicesList';
import { useInvoicesStore } from '../../stores/invoicesStore';

const InvoicesCard = () => {
  // Selectors to prevent unnecessary re-renders
  const fetchInvoices = useInvoicesStore(state => state.fetchInvoices);
  const invoices = useInvoicesStore(state => state.invoices);
  const loading = useInvoicesStore(state => state.loading);
  const error = useInvoicesStore(state => state.error);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return (
    <div className='bg-white dark:bg-gray-800 py-4 md:py-6 px-2 md:px-4 rounded-md transition'>
      <InvoicesList invoices={invoices} loading={loading} error={error} />
    </div>
  );
};

export default InvoicesCard;
