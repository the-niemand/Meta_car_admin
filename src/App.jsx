import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth/Auth';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Adminpage/*" element={<Dashboard />} />
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
