import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/DashboardPage';
import Opps from './pages/OpportunitiesPage';
import Navbar from './components/Navbar';
import Login from './pages/LoginPage';
import { useAuth } from './context/AuthContext';

// LATER please somone make a loading thing for the home page so that if it is trying to verify if you are logged or not it doesn't load the login page.
function App() {
  const {user, loading}  = useAuth();
  if (loading) {
    //If anyone is bored at any point they can make a custom page for this idk 
    return <p>Loading</p>; 
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Navigate to = {user ? "/home" : "/list"}/>}/>

        <Route path = "/login" element = {<Login />} />
        <Route element = {<Navbar />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/list" element={<Opps />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App
