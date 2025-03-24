import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import PatientDashboard from './components/Dashboard/PatientDashboard';
import DoctorDashboard from './components/Dashboard/DoctorDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { auth } from './firebase';
import './App.css';
import ForumHome from './components/Forum/ForumHome';
import CreatePost from './components/Forum/CreatePost';

function App() {
  return (
    <Router>
      <div className="App">
      <nav>
  <div className="nav-container">
    <Link to="/" className="nav-link nav-brand">OrthoCare</Link>
    
    <div className="main-links">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
      <Link to="/forum" className="nav-link">Forum</Link>
    </div>

    <div className="auth-links">
      {auth.currentUser ? (
        <>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <button onClick={handleLogout} className="nav-link">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </>
      )}
    </div>
  </div>
</nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/patient-dashboard" element={<ProtectedRoute allowedRoles={['patient']}> <PatientDashboard />
            </ProtectedRoute>} />
          <Route path="/doctor-dashboard" element={<ProtectedRoute allowedRoles={['doctor']}> <DoctorDashboard />
            </ProtectedRoute>} />
          <Route path="/forum" element={<ForumHome />} /> <Route path="/create-post" element={<ProtectedRoute allowedRoles={['patient', 'doctor']}>
      <CreatePost />
    </ProtectedRoute>
  } 
/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;