import React, { useState } from 'react';
import { User, BookOpen } from 'lucide-react';
import { ProfileContent } from './ProfileContent';
import { BlogsContent } from './BlogContent';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex min-h-screen bg-gray-100">
     
      <div className="hidden lg:flex lg:w-60 bg-white p-4">
        <div className="flex flex-col">
          <button
            className={`flex items-center py-2 px-4 mb-2 text-lg font-medium rounded ${
              activeTab === 0
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab(0)}
          >
            <User className="mr-2" />
            Profile
          </button>
          <button
            className={`flex items-center py-2 px-4 text-lg font-medium rounded ${
              activeTab === 1
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab(1)}
          >
            <BookOpen className="mr-2" />
            Your Blogs
          </button>
        </div>
      </div>

      <div className="flex-1 p-8">
        {activeTab === 0 ? <ProfileContent /> : <BlogsContent />}
      </div>

  
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md">
        <div className="flex justify-around p-2">
          <button
            className={`flex items-center p-2 text-lg rounded ${
              activeTab === 0
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab(0)}
          >
            <User />
          </button>
          <button
            className={`flex items-center p-2 text-lg rounded ${
              activeTab === 1
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab(1)}
          >
            <BookOpen />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
