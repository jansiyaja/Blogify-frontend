import React from "react";
import { FaFacebook, FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa";

const About = () => {
  return (
    <div className="container mx-auto p-6 flex flex-col items-center text-center">
      <img
        src="https://foodieheaven.s3.eu-north-1.amazonaws.com/Avatar.jpeg"
        alt="Profile"
        className="w-40 h-40 rounded-full border-4 border-green-500"
      />
      <h1 className="text-3xl font-bold text-gray-800 mt-4">Hi, Jansiya!</h1>
      <p className="text-lg text-gray-600 mt-2 max-w-2xl">
        I’m a food stylist and photographer. I love nature, healthy food, and good coffee. 
        Welcome to my food blog, where I share delicious recipes, cooking tips, and beautiful food photography.
      </p>

      <div className="flex space-x-4 mt-6">
        <a href="#" className="text-gray-600 hover:text-green-600 transition">
          <FaFacebook size={24} />
        </a>
        <a href="#" className="text-gray-600 hover:text-green-600 transition">
          <FaInstagram size={24} />
        </a>
        <a href="#" className="text-gray-600 hover:text-green-600 transition">
          <FaPinterest size={24} />
        </a>
        <a href="#" className="text-gray-600 hover:text-green-600 transition">
          <FaYoutube size={24} />
        </a>
      </div>

      <div className="mt-8 bg-green-100 p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-800">Join the Community</h2>
        <p className="text-gray-600 mt-2">
          Subscribe to get the latest recipes and cooking tips straight to your inbox!
        </p>
        <div className="mt-4 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
