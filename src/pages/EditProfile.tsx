import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../contexts/AuthContext';
import { ProfileForm } from '../components/ProfileForm';

export function EditProfile() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    async function fetchProfile() {
      try {
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user?.id) // Add optional chaining to handle null user
          .single();

        if (fetchError) throw fetchError;
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user, navigate]);

  const handleProfileUpdate = () => {
    navigate('/profile');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>
      {profile && <ProfileForm initialData={profile} onSubmit={handleProfileUpdate} />}
    </div>
  );
} 