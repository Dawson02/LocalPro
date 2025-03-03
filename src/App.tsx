//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Services } from './pages/Services/Services';
import { Profile } from './pages/Profile';
import { EditProfile } from './pages/EditProfile';
import { Categories } from './pages/Categories';
import { About } from './pages/About';
import { Login } from './pages/Auth/Login';
import { SignUp } from './pages/Auth/SignUp';
import { ForgotPassword } from './pages/Auth/ForgotPassword';
import { AddService } from './pages/Services/AddService';
import { EditService } from './pages/Services/EditService';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/new" element={<AddService />} />
              <Route path="/services/:id/edit" element={<EditService />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;