import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number | null;
  price_type: string;
  image_url: string | null;
  location: string | null;
  category_id: string | null;
  user_id: string;
  profiles: {
    email: string;
    business_name?: string;
    full_name?: string;
  } | null;
  category: {
    id: string;
    name: string;
  } | null;
}

interface Category {
  id: string;
  name: string;
}

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        // First, fetch services with related data
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select(`
            *,
            profiles:user_id(email, business_name, full_name),
            category:categories(id, name)
          `)
          .eq('active', true)
          .order('created_at', { ascending: false });

        if (servicesError) {
          console.error('Error fetching services:', servicesError);
          throw servicesError;
        }

        console.log('Fetched services:', servicesData); // Debug log
        setServices(servicesData || []);

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('id, name')
          .order('name');

        if (categoriesError) {
          console.error('Error fetching categories:', categoriesError);
          throw categoriesError;
        }

        setCategories(categoriesData || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter services based on search term and category
  const filteredServices = services.filter(service => {
    const matchesSearch = searchTerm === '' || 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || service.category_id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-lg">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Available Services</h1>
        <Link to="/services/new">
          <Button>Add New Service</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No services found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {service.image_url && (
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{service.description}</p>
                
                {service.location && (
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{service.location}</span>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-primary font-medium">
                    {service.price ? (
                      <>
                        ${service.price}
                        {service.price_type === 'hourly' && '/hr'}
                        {service.price_type === 'variable' && '+'}
                      </>
                    ) : (
                      'Price on request'
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    by {service.profiles?.business_name || service.profiles?.full_name || 'Unknown Provider'}
                  </div>
                </div>

                {service.category && (
                  <div className="mt-2 text-sm text-gray-500">
                    Category: {service.category.name}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}