import React, { useState } from "react";
import { X } from "lucide-react"; 

const cookingTips = [
  {
    title: "Knife Skills 101",
    description:
      "Learn how to chop, dice, and julienne like a pro. In this detailed guide, we cover proper grip, cutting techniques, and safety tips to improve your skills in the kitchen.",
    image: "https://foodieheaven.s3.eu-north-1.amazonaws.com/KnifeSkills.jpg",
  },
  {
    title: "Perfecting Seasoning",
    description:
      "Understand how to balance flavors for a delicious meal. Discover which herbs and spices work best with different dishes and learn how to use them effectively.",
    image: "https://foodieheaven.s3.eu-north-1.amazonaws.com/Perfecting+Seasoning.jpg",
  },
  {
    title: "Baking Basics",
    description:
      "Get tips for achieving the perfect cake, cookies, and bread. Learn about ingredient substitutions, mixing techniques, and how to avoid common baking mistakes.",
    image: "https://foodieheaven.s3.eu-north-1.amazonaws.com/Baking.jpg",
  },
];

const TipsPage = () => {
  const [selectedTip, setSelectedTip] = useState(null);

  const handleOpenModal = (tip) => {
    setSelectedTip(tip);
  };

  const handleCloseModal = () => {
    setSelectedTip(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Cooking Tips & Techniques
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cookingTips.map((tip, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => handleOpenModal(tip)}
          >
            <img
              src={tip.image}
              alt={tip.title}
              className="w-full h-80 object-cover" 
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{tip.title}</h3>
              <p className="text-gray-600 mt-2 line-clamp-2">
                {tip.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close Modal"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedTip.image}
              alt={selectedTip.title}
              className="w-full h-80 object-cover rounded-lg mb-6" 
            />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {selectedTip.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {selectedTip.description}
            </p>
            <p className="text-gray-500">
              For more in-depth techniques and tips, be sure to check out our comprehensive guides and video tutorials that cover a wide range of cooking skills and kitchen hacks.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TipsPage;
