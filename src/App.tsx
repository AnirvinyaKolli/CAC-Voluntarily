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

// LATER please somone make a loading thing for the home page so that if it is trying to verify if you are logged or not it doesn't load the login page.
function App() {
  const {user, loading}  = useAuth();
  const {userData} = useUserData();
    
  if (loading || (user && userData == null)) {
    return <EllipseLoader></EllipseLoader>;
}
  // Someone fix this mess of routing PLEASE. I promise there is better ways to do this :/
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Navigate to = {user ? (userData?.completedSignup ? "/home" : "/completeProfile") : "/login"}/>}/> 
        <Route path = "/completeProfile" element = {<CompleteProfile/>}/>
        <Route path = "/login" element = {<Login />} />
        <Route element = {<Navbar />}>
          <Route path="/home" element={<Navigate to = {user ? "/dashboard" : "/login"}/>} />
          <Route path = "/dashboard" element={<Dashboard></Dashboard>} />
          <Route path="/list" element={<Opps />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App
