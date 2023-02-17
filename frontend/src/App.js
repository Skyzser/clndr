import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Sidebar />}>
              <Route path="/about" element={<AboutUs />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;