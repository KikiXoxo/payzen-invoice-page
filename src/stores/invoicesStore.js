import { create } from 'zustand';
import { getInvoices } from '../api/invoicesApi';
import { calculateTotals } from '../helpers/invoiceBuilder';

export const useInvoicesStore = create(set => ({
  invoices: [],
  loading: false,
  error: null,
  nextInvoiceId: 1,

  totals: {
    overdue: 0,
    outstanding: 0,
    paid: 0,
    uncollectible: 0,
  },

  // Fetch invoices from API
  fetchInvoices: async () => {
    set({ loading: true, error: null });

    try {
      const data = await getInvoices();
      const totals = calculateTotals(data);

      // Determine nextInvoiceId based on fetched data
      const maxId =
        data.length > 0 ? Math.max(...data.map(inv => Number(inv.id))) : 0;

      set({
        invoices: data,
        totals,
        nextInvoiceId: maxId + 1,
      });
    } catch (err) {
      set({ error: 'Failed to load invoices' });
    } finally {
      set({ loading: false });
    }
  },

  // Status Tabs
  selectedStatusTab: 'All',
  setSelectedStatusTab: tab => set({ selectedStatusTab: tab }),

  // Sorting
  sortOrder: 'default',
  setSortOrder: order => set({ sortOrder: order }),

  // Add invoice
  addInvoice: invoice =>
    set(state => {
      const newInvoice = { ...invoice, id: state.nextInvoiceId };
      const invoices = [...state.invoices, newInvoice];

      return {
        invoices,
        totals: calculateTotals(invoices), // recalculate totals
        nextInvoiceId: state.nextInvoiceId + 1,
      };
    }),
}));
