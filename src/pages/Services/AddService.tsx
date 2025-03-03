import { ServiceForm } from '../../components/ServiceForm';

export function AddService() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Service</h1>
      <ServiceForm />
    </div>
  );
} 