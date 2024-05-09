import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth/Auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/maktabati_client_side/Adminpage/*' element={<Dashboard />} />
        <Route exact path='/maktabati_client_side/Auth' element={<Auth />} />
      </Routes>
    </Router>
  )
}

export default App