import { create } from 'zustand';
import { getInvoices } from '../api/invoicesApi';

export const useInvoicesStore = create(set => ({
  invoices: [],
  loading: false,
  error: null,

  totals: {
    overdue: 0,
    outstanding: 0,
    paid: 0,
    uncollectible: 0,
  },

  fetchInvoices: async () => {
    set({ loading: true, error: null });

    try {
      const data = await getInvoices();

      // Calculate totals
      const totals = {
        overdue: 0,
        outstanding: 0,
        paid: 0,
        uncollectible: 0,
      };

      data.forEach(invoice => {
        const amount = invoice.total || 0;

        if (invoice.status === 'Overdue') totals.overdue += amount;
        if (invoice.status === 'Outstanding') totals.outstanding += amount;
        if (invoice.status === 'Paid') totals.paid += amount;
        if (invoice.status === 'Uncollectible') totals.uncollectible += amount;
      });

      set({
        invoices: data,
        totals: totals,
      });
    } catch (err) {
      set({ error: 'Failed to load invoices' });
    } finally {
      set({ loading: false });
    }
  },
}));
