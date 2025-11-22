import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Invoices from './pages/Invoices';
import Clients from './pages/Clients';
import ServiceItems from './pages/ServiceItems';

function App() {
  return (
    <BrowserRouter>
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
