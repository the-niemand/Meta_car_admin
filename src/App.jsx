import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth/Auth';

function RedirectToMain() {
  // Redirect to /Adminpage/cars
  window.location.href = "/Adminpage/cars";
  return null;
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RedirectToMain />} />
        <Route path="/Adminpage/*" element={<Dashboard />} />
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
