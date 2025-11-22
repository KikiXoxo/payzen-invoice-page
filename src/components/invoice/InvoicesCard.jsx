import { useInvoicesApi } from '../../hooks/useInvoicesApi';
import InvoicesList from './InvoicesList';

const InvoicesCard = () => {
  const { invoices, loading, error } = useInvoicesApi();

  if (loading) return <p className='p-6'>Loading...</p>;
  if (error) return <p className='p-6 text-red-500'>{error}</p>;

  return (
    <div className='bg-white dark:bg-gray-800 py-4 md:py-6 px-2 md:px-4 rounded-md transition'>
      <InvoicesList invoices={invoices} />
    </div>
  );
};

export default InvoicesCard;
