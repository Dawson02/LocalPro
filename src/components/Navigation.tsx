import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, User, Bell, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useAuthContext } from '../contexts/AuthContext';

export function Navigation() {
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">LocalPro</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/services" className="text-gray-700 hover:text-gray-900">Services</Link>
            <Link to="/categories" className="text-gray-700 hover:text-gray-900">Categories</Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}