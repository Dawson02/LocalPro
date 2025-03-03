import { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '../lib/supabase';

interface Category {
  id: string;
  name: string;
}

interface SearchFilters {
  title: string;
  category: string;
  provider: string;
  location: string;
}

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    title: '',
    category: '',
    provider: '',
    location: '',
  });
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');
      
      if (data) {
        setCategories(data);
      }
    }

    fetchCategories();
  }, []);

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({
      title: '',
      category: '',
      provider: '',
      location: '',
    });
    onSearch({
      title: '',
      category: '',
      provider: '',
      location: '',
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Service Title */}
        <div>
          <Input
            type="text"
            placeholder="Search services..."
            value={filters.title}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
            className="w-full"
          />
        </div>

        {/* Category */}
        <div>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Provider Name */}
        <div>
          <Input
            type="text"
            placeholder="Provider name..."
            value={filters.provider}
            onChange={(e) => setFilters({ ...filters, provider: e.target.value })}
            className="w-full"
          />
        </div>

        {/* Location */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Location..."
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full pl-9"
          />
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
} 