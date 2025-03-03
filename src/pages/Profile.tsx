import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Camera, MapPin, Star, Clock, Mail, Phone, Pencil, Trash2, Building2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuthContext } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

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
  } | null;
  category: {
    id: string;
    name: string;
  } | null;
}

interface Profile {
  id: string;
  email: string;
  full_name?: string;
  business_name?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  phone?: string;
  cover_image_url?: string;
}

export function Profile() {
  const { user, loading: authLoading } = useAuthContext();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [uploadingCover, setUploadingCover] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoadingProfile(false);
      }
    }

    fetchProfile();
  }, [user]);

  useEffect(() => {
    async function fetchServices() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setServices(data || []);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoadingServices(false);
      }
    }

    fetchServices();
  }, [user]);

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      if (error) throw error;

      // Remove the service from the local state
      setServices(services.filter(service => service.id !== serviceId));
    } catch (err) {
      console.error('Error deleting service:', err);
      alert('Failed to delete service. Please try again.');
    }
  };

  const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    if (!file) return;

    setUploadingCover(true);

    try {
      const { data, error } = await supabase
        .storage
        .from('covers')
        .upload(`${user.id}/${Date.now()}-${file.name}`, file);

      if (error) throw error;

      const { data: updatedProfileData, error: updateError } = await supabase
        .from('profiles')
        .update({ cover_image_url: data.path })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setProfile(updatedProfileData);
    } catch (err) {
      console.error('Error uploading cover image:', err);
      alert('Failed to upload cover image. Please try again.');
    } finally {
      setUploadingCover(false);
    }
  };

  if (authLoading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-48">
          {profile.cover_image_url ? (
            <img
              src={profile.cover_image_url}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
          <label className="absolute bottom-4 right-4">
            <Button
              variant="ghost"
              className="relative bg-white/80 backdrop-blur-sm"
              disabled={uploadingCover}
            >
              <Camera className="h-4 w-4 mr-2" />
              {uploadingCover ? 'Uploading...' : 'Change Cover'}
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleCoverImageUpload}
                disabled={uploadingCover}
              />
            </Button>
          </label>
        </div>

        {/* Profile Info */}
        <div className="relative px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
            {/* Profile Picture and Basic Info */}
            <div className="flex items-end -mt-16 sm:-mt-20 relative z-10">
              <div className="relative">
                <img
                  src={profile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.email}`}
                  alt="Profile"
                  className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-white bg-gray-200 object-cover"
                />
              </div>
              <div className="ml-4 mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.full_name || profile.email}
                </h1>
                {profile.business_name && (
                  <div className="flex items-center text-gray-600 mt-1">
                    <Building2 className="h-4 w-4 mr-1" />
                    <span>{profile.business_name}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </div>
            {/* Action Buttons */}
            <div className="mt-6 sm:mt-0 flex space-x-3">
              <Link to="/profile/edit">
                <Button>Edit Profile</Button>
              </Link>
              <Button variant="outline">Share Profile</Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.phone && (
              <div className="flex items-center text-gray-500">
                <Phone className="h-4 w-4 mr-2" />
                <span>{profile.phone}</span>
              </div>
            )}
            <div className="flex items-center text-gray-500">
              <Mail className="h-4 w-4 mr-2" />
              <span>{profile.email}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Star className="h-6 w-6 text-yellow-400 mx-auto" />
              <div className="mt-2 font-semibold text-gray-900">0.0</div>
              <div className="text-sm text-gray-500">Rating</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Clock className="h-6 w-6 text-blue-500 mx-auto" />
              <div className="mt-2 font-semibold text-gray-900">0</div>
              <div className="text-sm text-gray-500">Jobs Completed</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Mail className="h-6 w-6 text-green-500 mx-auto" />
              <div className="mt-2 font-semibold text-gray-900">0%</div>
              <div className="text-sm text-gray-500">Response Rate</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Phone className="h-6 w-6 text-purple-500 mx-auto" />
              <div className="mt-2 font-semibold text-gray-900">N/A</div>
              <div className="text-sm text-gray-500">Response Time</div>
            </div>
          </div>

          {/* About */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">About</h2>
            </div>
            <p className="text-gray-500">
              {profile.bio || 'No bio added yet.'}
            </p>
          </div>

          {/* Services */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Services Offered</h2>
              <Link to="/services/new">
                <Button>Add New Service</Button>
              </Link>
            </div>
            
            {loadingServices ? (
              <div className="text-center py-4">Loading services...</div>
            ) : services.length === 0 ? (
              <div className="text-gray-500">
                No services added yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
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
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/services/${service.id}/edit`)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}