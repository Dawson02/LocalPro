import { useState } from 'react';
import { Camera } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';

interface ProfileFormProps {
  initialData?: {
    id: string;
    email: string;
    full_name?: string;
    business_name?: string;
    avatar_url?: string;
    bio?: string;
    location?: string;
    phone?: string;
  };
  onSubmit?: () => void;
}

export function ProfileForm({ initialData, onSubmit }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    business_name: '',
    avatar_url: '',
    bio: '',
    location: '',
    phone: '',
    ...initialData
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${initialData?.id}/${fileName}`;

      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, avatar_url: publicUrl }));
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
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          business_name: formData.business_name,
          avatar_url: formData.avatar_url,
          bio: formData.bio,
          location: formData.location,
          phone: formData.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', initialData?.id);

      if (updateError) throw updateError;

      onSubmit?.();
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
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

      <div className="space-y-4">
        {/* Avatar Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <div className="mt-1 flex items-center space-x-4">
            {formData.avatar_url ? (
              <img
                src={formData.avatar_url}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
            )}
            <label className="cursor-pointer">
              <Button
                type="button"
                variant="outline"
                className="relative"
                disabled={loading}
              >
                <Camera className="h-4 w-4 mr-2" />
                {formData.avatar_url ? 'Change Photo' : 'Upload Photo'}
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

        {/* Full Name */}
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            value={formData.full_name}
            onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
          />
        </div>

        {/* Business Name */}
        <div>
          <label htmlFor="business_name" className="block text-sm font-medium text-gray-700">
            Business Name (Optional)
          </label>
          <input
            type="text"
            id="business_name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            value={formData.business_name}
            onChange={(e) => setFormData(prev => ({ ...prev, business_name: e.target.value }))}
          />
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            value={formData.bio}
            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
          />
        </div>

        {/* Location */}
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

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
} 