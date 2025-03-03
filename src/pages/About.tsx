import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

//import React from "react";

export function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
          About Us
        </h1>

        <p className="text-lg text-gray-700 text-center mb-8">
          <strong>LocalPro</strong> is the go-to platform for finding and offering local services. Whether you're a skilled professional, a small business owner, or someone looking for trusted help, we connect you with the right people in your community.
        </p>

        {/* Features Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>📌 <strong>Find Services</strong> – Browse from various categories like home repairs, beauty, and tech support.</li>
            <li>📌 <strong>List Your Skills</strong> – Create a profile and attract new clients.</li>
            <li>📌 <strong>Book & Communicate</strong> – Connect with professionals in just a few clicks.</li>
            <li>📌 <strong>Support Local Businesses</strong> – Help independent professionals grow.</li>
          </ul>
        </div>

        {/* Categories Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Categories We Cover</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
            <span>🏠 Home Services</span>
            <span>💪 Personal Training</span>
            <span>💻 Tech Support</span>
            <span>📚 Education</span>
            <span>💅 Beauty & Wellness</span>
            <span>🎉 Events</span>
            <span>🚗 Automotive</span>
            <span>🐶 Pet Services</span>
            <span>🎨 Creative & Media</span>
            <span>🍽️ Food & Catering</span>
            <span>🎵 Music & Entertainment</span>
            <span>🚚 Rental & Moving</span>
            <span>❓ Other</span>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>✅ <strong>Simple & Easy to Use</strong> – No complicated sign-ups or hidden fees.</li>
            <li>✅ <strong>Trust & Safety</strong> – Verified providers and user reviews help you make the right choice.</li>
            <li>✅ <strong>Local First</strong> – Support businesses in your community.</li>
            <li>✅ <strong>Flexible & Affordable</strong> – Find services that match your budget and schedule.</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join Us Today!</h2>
          <p className="text-lg text-gray-700 mb-6">
            Start browsing services or create your own listing now. Whether you're looking to hire or offer a service, <strong>LocalPro</strong> is the place to connect.
          </p>
          <Button
            onClick={() => navigate('/signup')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl text-lg font-semibold"
          >
            Sign Up Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
