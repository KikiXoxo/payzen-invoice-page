// Calculate totals by invoice status
export const calculateTotals = invoices => {
  const totals = {
    overdue: 0,
    outstanding: 0,
    paid: 0,
    uncollectible: 0,
  };

  invoices.forEach(inv => {
    const amount = inv.total || 0;
    if (inv.status === 'Overdue') totals.overdue += amount;
    if (inv.status === 'Outstanding') totals.outstanding += amount;
    if (inv.status === 'Paid') totals.paid += amount;
    if (inv.status === 'Uncollectible') totals.uncollectible += amount;
  });

  return totals;
};

// Build an empty invoice item row
export const emptyItem = () => ({
  description: '',
  quantity: 1,
  rate: 0,
  discount: 0, // percentage
});

// Compute item total
export const computeItemTotal = item => {
  const qty = Number(item.quantity) || 0;
  const rate = Number(item.rate) || 0;
  const discount = Number(item.discount) || 0;

  const subtotal = qty * rate;
  const discountAmount = subtotal * (discount / 100);

  return subtotal - discountAmount;
};

// Compute totals for entire invoice
export const computeInvoiceTotals = items => {
  const subtotal = items.reduce((sum, item) => sum + computeItemTotal(item), 0);
  return subtotal;
};

// Build final invoice object before saving
export const buildInvoice = (id, formState) => {
  const items = formState.items.map(itm => ({
    ...itm,
    total: computeItemTotal(itm),
  }));

  return {
    id,
    status: formState.status || 'Outstanding',
    issueDate: formState.issueDate,
    dueDate: formState.dueDate,
    clientName: formState.clientName,
    items,
    total: computeInvoiceTotals(items),
  };
};
