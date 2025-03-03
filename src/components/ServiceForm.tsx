import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Camera } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface ServiceFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    price?: number;
    price_type: 'fixed' | 'hourly' | 'variable';
    image_url?: string;
    category_id?: string;
    location?: string;
  };
  onSubmit?: () => void;
}

export function ServiceForm({ initialData, onSubmit }: ServiceFormProps) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    price_type: 'fixed',
    image_url: '',
    category_id: '',
    location: '',
    ...initialData
  });

  // Fetch categories on component mount
  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name');
      
      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      setCategories(data || []);
    }

    fetchCategories();
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user?.id}/${fileName}`;

      // Upload the file to Supabase storage
      const { error: uploadError, data } = await supabase.storage
        .from('service-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('service-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const serviceData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        user_id: user?.id,
      };

      if (initialData?.id) {
        // Update existing service
        const { error: updateError } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', initialData.id);

        if (updateError) throw updateError;
      } else {
        // Create new service
        const { error: insertError } = await supabase
          .from('services')
          .insert(serviceData);

        if (insertError) throw insertError;
      }

      onSubmit?.();
      navigate('/profile');
    } catch (err) {
      console.error('Error saving service:', err);
      setError('Failed to save service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Service Title *
        </label>
        <input
          type="text"
          id="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          value={formData.category_id}
          onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          id="description"
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="price_type" className="block text-sm font-medium text-gray-700">
            Price Type
          </label>
          <select
            id="price_type"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            value={formData.price_type}
            onChange={(e) => setFormData(prev => ({ ...prev, price_type: e.target.value as 'fixed' | 'hourly' | 'variable' }))}
          >
            <option value="fixed">Fixed Price</option>
            <option value="hourly">Per Hour</option>
            <option value="variable">Variable</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Service Image</label>
        <div className="mt-1 flex items-center space-x-4">
          {formData.image_url && (
            <img
              src={formData.image_url}
              alt="Service preview"
              className="h-32 w-32 object-cover rounded-lg"
            />
          )}
          <label className="cursor-pointer">
            <Button
              type="button"
              variant="outline"
              className="relative"
              disabled={loading}
            >
              <Camera className="h-4 w-4 mr-2" />
              {formData.image_url ? 'Change Image' : 'Upload Image'}
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/profile')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Saving...' : initialData?.id ? 'Update Service' : 'Create Service'}
        </Button>
      </div>
    </form>
  );
} 