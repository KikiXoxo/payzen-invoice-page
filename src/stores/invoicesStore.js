import { create } from 'zustand';
import { getInvoices } from '../api/invoicesApi';

export const useInvoicesStore = create(set => ({
  invoices: [],
  loading: false,
  error: null,

  fetchInvoices: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getInvoices();
      set({ invoices: data });
    } catch (err) {
      set({ error: 'Failed to load invoices' });
    } finally {
      set({ loading: false });
    }
  },
}));
