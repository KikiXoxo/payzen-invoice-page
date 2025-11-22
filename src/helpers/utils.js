// Format currency
export const formatCurrency = amount => {
  return `$${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Format invoice id to 5 digits (00011)
export const formatInvoiceId = id => {
  return id.toString().padStart(5, '0');
};

// Status styles
const STATUS_STYLES = {
  paid: {
    label: 'Paid',
    bg: 'bg-green-100',
    text: 'text-green-600',
    darkModeText: 'dark:text-green-500',
  },
  overdue: {
    label: 'Overdue',
    bg: 'bg-red-50',
    text: 'text-red-600',
    darkModeText: 'dark:text-red-400',
  },
  uncollectible: {
    label: 'Uncollectible',
    bg: 'bg-gray-200',
    text: 'text-gray-700',
    darkModeText: 'dark:text-gray-300',
  },
  outstanding: {
    label: 'Awaiting Payment',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    darkModeText: 'dark:text-indigo-300',
  },
};

export const getStatusStyles = status => {
  if (!status) return STATUS_STYLES.outstanding;

  const key = status.toString().trim().toLowerCase();
  return STATUS_STYLES[key] || STATUS_STYLES.outstanding;
};
