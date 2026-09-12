import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/Dashboard';
import OppList from './pages/OppList';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element = {<Navbar />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/list" element={<OppList />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App
