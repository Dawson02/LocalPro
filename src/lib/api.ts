import { supabase } from './supabase';
import type { Database } from './database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Service = Database['public']['Tables']['services']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];
type Review = Database['public']['Tables']['reviews']['Row'];

// Profiles
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { data, error };
}

export async function updateProfile(profile: Partial<Profile> & { id: string }) {
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', profile.id)
    .select()
    .single();
  
  return { data, error };
}

// Services
export async function getServices(filters?: {
  category_id?: string;
  user_id?: string;
  search?: string;
}) {
  let query = supabase.from('services').select(`
    *,
    profiles:user_id(*),
    categories:category_id(*)
  `);

  if (filters?.category_id) {
    query = query.eq('category_id', filters.category_id);
  }

  if (filters?.user_id) {
    query = query.eq('user_id', filters.user_id);
  }

  if (filters?.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  
  return { data, error };
}

export async function getService(id: string) {
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      profiles:user_id(*),
      categories:category_id(*),
      reviews(*)
    `)
    .eq('id', id)
    .single();
  
  return { data, error };
}

export async function createService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('services')
    .insert(service)
    .select()
    .single();
  
  return { data, error };
}

export async function updateService(service: Partial<Service> & { id: string }) {
  const { data, error } = await supabase
    .from('services')
    .update(service)
    .eq('id', service.id)
    .select()
    .single();
  
  return { data, error };
}

export async function deleteService(id: string) {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);
  
  return { error };
}

// Categories
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  return { data, error };
}

// Reviews
export async function createReview(review: Omit<Review, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('reviews')
    .insert(review)
    .select()
    .single();
  
  return { data, error };
}

export async function getReviewsByService(serviceId: string) {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      profiles:user_id(*)
    `)
    .eq('service_id', serviceId)
    .order('created_at', { ascending: false });
  
  return { data, error };
}