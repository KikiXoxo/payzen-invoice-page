import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Invoices from './pages/Invoices';
import Clients from './pages/Clients';
import ServiceItems from './pages/ServiceItems';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme='colored'
      />

      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Invoices />} />
          <Route path='clients' element={<Clients />} />
          <Route path='service-items' element={<ServiceItems />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
