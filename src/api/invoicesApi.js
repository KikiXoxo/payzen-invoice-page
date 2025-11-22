import mockInvoices from '../data/mockInvoices';

// Delay helper
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

// Get all invoices
export const getInvoices = async () => {
  await wait(600);
  return JSON.parse(JSON.stringify(mockInvoices));
};
