import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { SearchBar } from '../../components/SearchBar';
import { supabase } from '../../lib/supabase';

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
    full_name: string | null;
    email: string;
    business_name: string | null;
  };
  categories: {
    id: string;
    name: string;
  } | null;
}

interface SearchFilters {
  title: string;
  category: string;
  provider: string;
  location: string;
}

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    title: '',
    category: '',
    provider: '',
    location: '',
  });

  const fetchServices = async (searchFilters: SearchFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      // Start with the base query
      let query = supabase
        .from('services')
        .select(`
          *,
          profiles!services_user_id_fkey (
            full_name,
            email,
            business_name
          ),
          categories!services_category_id_fkey (
            id,
            name
          )
        `);

      // Apply basic filters
      if (searchFilters.title) {
        query = query.ilike('title', `%${searchFilters.title}%`);
      }

      if (searchFilters.category) {
        query = query.eq('category_id', searchFilters.category);
      }

      if (searchFilters.location) {
        query = query.ilike('location', `%${searchFilters.location}%`);
      }

      // Handle provider name search
      if (searchFilters.provider) {
        const providerFilter = searchFilters.provider.toLowerCase();
        query = query.or(
          `or(profiles.full_name.ilike.%${providerFilter}%,profiles.business_name.ilike.%${providerFilter}%)`
        );
      }

      const { data, error } = await query;

      if (error) {
        console.error('Supabase query error:', error);
        setError(error.message);
        setServices([]);
        return;
      }

      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Failed to fetch services. Please try again.');
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(filters);
  }, []);

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    fetchServices(newFilters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {error && (
        <div className="text-center py-4 text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No services found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="block"
            >
              <div className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                {service.image_url && (
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="mt-2 text-sm text-gray-600">
                    By {service.profiles.business_name || service.profiles.full_name || service.profiles.email}
                  </div>

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
                    {service.categories && (
                      <span className="text-sm text-gray-500">
                        {service.categories.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 