const mockInvoices = [
  {
    id: 11,
    clientName: 'Arcadia Systems',
    clientEmail: 'billing@arcadia.com',
    issueDate: '2025-01-12',
    dueDate: '2025-01-22',
    status: 'Paid',
    items: [
      {
        description: 'Server Migration',
        qty: 1,
        rate: 950,
        discount: 0,
        amount: 950,
      },
    ],
    total: 950,
  },
  {
    id: 18,
    clientName: 'Neon Labs',
    clientEmail: 'finance@neonlabs.io',
    issueDate: '2025-01-20',
    dueDate: '2025-02-05',
    status: 'Outstanding',
    items: [
      {
        description: 'App UI Redesign',
        qty: 12,
        rate: 80,
        discount: 0,
        amount: 960,
      },
      {
        description: 'Landing Page',
        qty: 1,
        rate: 300,
        discount: 20,
        amount: 280,
      },
    ],
    total: 1240,
  },
  {
    id: 13,
    clientName: 'Blue Horizon',
    clientEmail: 'accounts@blueh.com',
    issueDate: '2025-01-05',
    dueDate: '2025-01-15',
    status: 'Paid',
    items: [
      {
        description: 'Brand Identity Package',
        qty: 1,
        rate: 1200,
        discount: 0,
        amount: 1200,
      },
    ],
    total: 1200,
  },
  {
    id: 14,
    clientName: 'Vanta Cruises',
    clientEmail: 'pay@vanta.co',
    issueDate: '2025-02-01',
    dueDate: '2025-02-20',
    status: 'Outstanding',
    items: [
      {
        description: 'Booking App Audit',
        qty: 8,
        rate: 90,
        discount: 10,
        amount: 710,
      },
    ],
    total: 710,
  },
  {
    id: 15,
    clientName: 'Nimbus Digital',
    clientEmail: 'billing@nimbus.io',
    issueDate: '2024-12-22',
    dueDate: '2025-01-10',
    status: 'Uncollectible',
    items: [
      {
        description: 'Annual Maintenance',
        qty: 2,
        rate: 200,
        discount: 0,
        amount: 400,
      },
    ],
    total: 400,
  },
  {
    id: 16,
    clientName: 'SkyNetix',
    clientEmail: 'accounts@skynetix.com',
    issueDate: '2025-02-10',
    dueDate: '2025-03-01',
    status: 'Overdue',
    items: [
      {
        description: 'Dashboard Development',
        qty: 20,
        rate: 60,
        discount: 0,
        amount: 1200,
      },
    ],
    total: 1200,
  },
];

export default mockInvoices;
