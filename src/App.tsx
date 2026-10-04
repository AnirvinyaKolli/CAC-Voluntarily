import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/DashboardPage';
import Opps from './pages/OpportunitiesPage';
import Navbar from './components/Navbar';
import Login from './pages/LoginPage';
import { useAuth } from './context/AuthContext';
import CompleteProfile from './pages/CompleteProfile';
import { useUserData } from './context/UserDataContext';
import EllipseLoader from './components/EllipsesLoading';

function App() {
  const { user, loading: authLoading } = useAuth();
  const { userData, loading: dataLoading } = useUserData();
  
  const waiting = authLoading || (!!user && (dataLoading || userData == null));

  const home = !user
    ? "/login"
    : userData?.completedSignup
      ? "/dashboard"
      : "/completeProfile";

  return (
    <BrowserRouter>
      {waiting ? (
        <EllipseLoader />
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to={home} replace />} />

          <Route path="/login" element={user ? <Navigate to={home} replace /> : <Login />} />

          <Route
            path="/completeProfile"
            element={
              !user ? <Navigate to="/login" replace />
              : userData?.completedSignup ? <Navigate to="/dashboard" replace />
              : <CompleteProfile />
            }
          />

          <Route
            element={
              !user ? <Navigate to="/login" replace />
              : !userData?.completedSignup ? <Navigate to="/completeProfile" replace />
              : <Navbar />
            }
          >
            <Route path="/home" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/list" element={<Opps />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App
