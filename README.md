# PayZen — Invoice UI (React)

A small, component-based invoice management UI built with React. Implements the primary screens from the design: Dashboard (invoices list), Empty state, loading state, and Add New Invoice Modal with advanced form logic (dynamic line items, logo preview, preview mode, and status logic).
Users can view, filter, and add invoices, with dynamic calculations and instant UI updates. Dark/light mode is supported and persists via global state.

## Features

- Dashboard: Displays invoices with sortable columns, status badges, and summary totals.

- Empty State: Shown when there are no invoices.

- Add Invoice Modal:

  - Supports dynamic, repeating line items.

  - Calculates subtotals and total instantly as items are added or edited.

  - Includes logo upload with instant live preview.

  - Offers both edit mode and document-style read-only preview modes.

- Filtering & Sorting: Filter invoices by status or sort by invoice ID; totals update accordingly.

- Dark/Light Mode: Toggles persist via global state.

- Loading & Error States: Skeleton loader shown during invoice fetch; errors displayed clearly.

- Validation: Ensures required fields are filled and values are valid.

## Tech & libraries

- Framework: React (with Vite)

- State: Zustand 

- Routing: react-router-dom

- Icons: react-icons

- Date: dayjs

- Toasts: react-toastify 

- Styling: TailwindCSS (used with dark/light utilities)

## Architecture and State Management

- Component-based UI: each UI piece is isolated and testable, InvoiceEditor handles editing of form, InvoicePreview renders read-only preview, and InvoiceItemsList composes list of repeating rows, etc.

- Global state: Implemented with Zustand to reduce unnecessary re-renders and improve performance, by means of selectors to manage:
  - Invoice creation, totals, next invoice ID. 
  -  Filtering by selected status, sort order.
  -   Theme mode.

- Performance: React.memo used to memoize invoice row components to prevent unnecessary re-renders.

 ## Data Layer and Mock Data:
- API Abstraction (invoicesApi.js): Simulates fetching invoice data with delays; handles loading states and errors.

- Mock Data: All functionality works entirely on mockInvoices.js and mockData.js.

## Add Invoice Modal / Dynamic Form Logic 

- Supports dynamic, repeating line items with instant subtotal and total updates.

- Includes logo upload with live preview in both Editor mode, and Preview mode.

- Modal offers both edit mode and read-only preview mode.

- Validation ensures required fields are filled; "Mark it as sent" must be checked before submission.

- Invoice status determined automatically based on due date and 'Received Payment' checkbox.

- Invoices list updated immediately after successful creation without component re-render.

- Display toast message after successfuly creating new invoice.

