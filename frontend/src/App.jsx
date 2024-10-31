import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import SingUp from './pages/SingUp';
import EmailVerification from './pages/EmailVerification';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  // protect routes that require authentication
  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
      return <Navigate to='/login' replace />;
    }

    if (!user.isVerified) {
      return <Navigate to='/verify-email' replace />;
    }
    return children;
  };

  // redirect to home page if user is authenticated
  const RedirectAuthenticatedUser = ({ children }) => {
    if (isAuthenticated && user.isVerified) {
      return <Navigate to='/' replace />;
    }

    return children;
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <RedirectAuthenticatedUser>
              <SingUp />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/login'
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path='/verify-email' element={<EmailVerification />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
