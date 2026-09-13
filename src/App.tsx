import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import {auth} from './firebase'
import Dashboard from './pages/DashboardPage';
import Opps from './pages/OpportunitiesPage';
import Navbar from './components/Navbar';
import Login from './pages/LoginPage';
function App() {
  const user  = auth.currentUser

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Navigate to = {user ? "/home" : "/login"}/>}/>

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
