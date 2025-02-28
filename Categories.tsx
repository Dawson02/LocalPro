export function Categories() {
    const categories = [
      { name: "Home Services", icon: "🏠" },
      { name: "Personal Training", icon: "💪" },
      { name: "Tech Support", icon: "💻" },
      { name: "Education", icon: "📚" },
      { name: "Beauty & Wellness", icon: "💅" },
      { name: "Events", icon: "🎉" },
      { name: "Automotive Services", icon: "🚗" },
      { name: "Pet Services", icon: "🐾" },
      { name: "Creative & Media", icon: "🎨" },
      { name: "Food & Catering", icon: "🍽️" },
      { name: "Music & Entertainment", icon: "🎵" },
      { name: "Rental & Moving Services", icon: "📦" },
      { name: "Other", icon: "❓" },
    ];
  
    return (
      <div className="min-h-screen bg-white flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Categories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-6xl">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center p-4 rounded-lg shadow-md bg-gray-100">
              <div className="text-3xl">{category.icon}</div>
              <p className="mt-2 font-semibold text-center">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
}
  