import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import SingUp from './pages/SingUp';
import EmailVerification from './pages/EmailVerification';

function App() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      <Routes>
        <Route path='/' element={'Home'} />
        <Route path='/signup' element={<SingUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-email' element={<EmailVerification />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
