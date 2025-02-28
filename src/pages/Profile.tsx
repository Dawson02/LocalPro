import React from 'react';
import { Camera, MapPin, Star, Clock, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Profile() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg">
        {/* Cover Image */}
        <div className="h-32 sm:h-48 w-full bg-gray-200 relative">
          <Button
            variant="ghost"
            className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm"
          >
            <Camera className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
        </div>

        {/* Profile Info */}
        <div className="px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between -mt-12 sm:-mt-16">
            <div className="flex items-end">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                alt="Profile"
                className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-white"
              />
              <div className="ml-4 mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Sarah Johnson</h1>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button>Edit Profile</Button>
              <Button variant="outline">Share Profile</Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Star className="h-6 w-6 text-yellow-400 mx-auto" />
              <div className="mt-2 font-semibold text-gray-900">4.9</div>
              <div className="text-sm text-gray-500">Rating</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Clock className="h-6 w-6 text-blue-500 mx-auto" />
              <div className="mt-2 font-semibold text-gray-900">127</div>
              <div className="text-sm text-gray-500">Jobs Completed</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Mail className="h-6 w-6 text-green-500 mx-auto" />
              <div className="mt-2 font-semibold text-gray-900">98%</div>
              <div className="text-sm text-gray-500">Response Rate</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Phone className="h-6 w-6 text-purple-500 mx-auto" />
              <div className="mt-2 font-semibold text-gray-900">24h</div>
              <div className="text-sm text-gray-500">Response Time</div>
            </div>
          </div>

          {/* About */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">About</h2>
            <p className="mt-4 text-gray-500">
              Professional house cleaner with over 5 years of experience. Specializing in deep cleaning,
              move-in/move-out services, and regular maintenance cleaning. Committed to providing
              high-quality service and ensuring customer satisfaction.
            </p>
          </div>

          {/* Services */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Services Offered</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{service.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-primary font-medium">{service.price}</span>
                    <Button variant="outline" size="sm">Book Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    id: 1,
    name: 'Regular House Cleaning',
    description: 'Weekly or bi-weekly cleaning services for your home',
    price: 'From $80',
  },
  {
    id: 2,
    name: 'Deep Cleaning',
    description: 'Thorough cleaning of all areas including hard-to-reach spots',
    price: 'From $150',
  },
  {
    id: 3,
    name: 'Move In/Out Cleaning',
    description: 'Complete cleaning service for moving transitions',
    price: 'From $200',
  },
  {
    id: 4,
    name: 'Office Cleaning',
    description: 'Professional cleaning services for commercial spaces',
    price: 'From $100',
  },
];