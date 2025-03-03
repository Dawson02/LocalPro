import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ServiceForm } from '../../components/ServiceForm';
import { useAuthContext } from '../../contexts/AuthContext';

export function EditService() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [service, setService] = useState<{
    id: string;
    title: string;
    description: string;
    price?: number;
    price_type: string;
    image_url?: string;
    category_id?: string;
    location?: string;
    user_id: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchService() {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        // Check if the service belongs to the current user
        if (data.user_id !== user?.id) {
          navigate('/profile');
          return;
        }

        setService(data);
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Failed to load service');
      } finally {
        setLoading(false);
      }
    }

    fetchService();
  }, [id, user?.id, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Service</h1>
      {service && <ServiceForm initialData={{
        ...service,
        price_type: service.price_type as "fixed" | "hourly" | "variable"
      }} />}
    </div>
  );
}