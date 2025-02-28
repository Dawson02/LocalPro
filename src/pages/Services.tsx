import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Services() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Search services..."
          />
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <select className="form-select rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
            <option>Newest First</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Popular</option>
          </select>
        </div>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              src={service.image}
              alt={service.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <div className="flex items-center">
                <img
                  src={service.provider.avatar}
                  alt={service.provider.name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{service.provider.name}</p>
                  <p className="text-sm text-gray-500">{service.provider.rating} ⭐️</p>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{service.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{service.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-primary font-medium">{service.price}</span>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const services = [
  {
    id: 1,
    title: 'Professional House Cleaning',
    description: 'Experienced cleaners providing thorough home cleaning services.',
    price: 'From $80',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80',
    provider: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
      rating: 4.9,
    },
  },
  {
    id: 2,
    title: 'Personal Fitness Training',
    description: 'Customized workout plans and one-on-one training sessions.',
    price: 'From $50/hr',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80',
    provider: {
      name: 'Mike Thompson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
      rating: 4.8,
    },
  },
  {
    id: 3,
    title: 'Computer Repair & IT Support',
    description: 'Expert tech support for all your computer and device needs.',
    price: 'From $45/hr',
    image: 'https://images.unsplash.com/photo-1531492053556-cc188a61c7b5?auto=format&fit=crop&q=80',
    provider: {
      name: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
      rating: 4.7,
    },
  },
];