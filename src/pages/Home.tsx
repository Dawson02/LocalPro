import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Find Local Services</span>
              <span className="block text-primary">In Your Community</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Connect with trusted local service providers for all your needs. From home repairs to personal training, find the right professional near you.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Search for services..."
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Button size="lg">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {category.icon}
                <span className="mt-2 text-sm font-medium text-gray-900">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Featured Services
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
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
                  <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
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
      </section>
    </div>
  );
}

const categories = [
  { name: 'Home Services', icon: '🏠' },
  { name: 'Personal Training', icon: '💪' },
  { name: 'Tech Support', icon: '💻' },
  { name: 'Education', icon: '📚' },
  { name: 'Beauty & Wellness', icon: '💅' },
  { name: 'Events', icon: '🎉' },
];

const featuredServices = [
  {
    id: 1,
    title: 'Professional House Cleaning',
    description: 'Experienced cleaners providing thorough home cleaning services.',
    price: 'From $80',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Personal Fitness Training',
    description: 'Customized workout plans and one-on-one training sessions.',
    price: 'From $50/hr',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Computer Repair & IT Support',
    description: 'Expert tech support for all your computer and device needs.',
    price: 'From $45/hr',
    image: 'https://images.unsplash.com/photo-1531492053556-cc188a61c7b5?auto=format&fit=crop&q=80',
  },
];