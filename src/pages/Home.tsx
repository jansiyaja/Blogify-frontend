import React, { useState, useEffect } from 'react';
import BlogPostCard from './BlogPostCard';
import { getAllBlogs } from '../endpoints/useEndpoints';
import { Link } from 'react-router-dom';

interface BlogPost {
  _id: string;
  heading: string;
  tag: string;
  coverImageUrl: string;
  createdAt: string;
  authorId: string;
}

const Home: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const collections: string[] = [
    "Weeknight Dinners",
    "Healthy Breakfasts",
    "Decadent Desserts",
  ];

  const categories: string[] = [
    'BreakFast',
    'Lunch',
    'Dinner',
    'Dessert'
  ];

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response: BlogPost[] = await getAllBlogs();
        console.log("res",response)
        setBlogPosts(response);
        setLoading(false);
      } catch (err) {
        setError('Error fetching blog posts');
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">

      <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
        <img
          src={blogPosts[10]?.coverImageUrl || 'https://foodieheaven.s3.eu-north-1.amazonaws.com/pie.jpg'}
          alt="Featured Blog"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-4xl font-bold">
            {blogPosts[0]?.heading || 'Welcome to Our Food Blog'}
          </h2>
          <p className="text-lg mt-2">
            {blogPosts[0]?.tag || 'Delicious Recipes & Cooking Tips'}
          </p>
          <Link
            to={`/blog/${blogPosts[0]?._id}`}
            className="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Read More
          </Link>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6">Popular Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((collection) => {
            const fileName = collection.replace(/ /g, '+');
            const s3Url = `https://foodieheaven.s3.eu-north-1.amazonaws.com/${fileName}.jpg`;

            return (
              <div key={collection} className="relative h-48 rounded-lg overflow-hidden group">
                <img
                  src={s3Url}
                  alt={collection}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">{collection}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <h2 className="text-3xl font-semibold mb-6">Latest Blog Posts</h2>
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Link
                to={`/blog/${post._id}`}
                key={post._id}
                className="block hover:scale-105 transition-transform duration-300"
              >
                <BlogPostCard
                  heading={post.heading}
                  tag={post.tag}
                  coverImageUrl={post.coverImageUrl}
                  createdAt={post.createdAt}
                  authorId={post.authorId}
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="md:w-1/3 space-y-12">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Recipe Collections</h2>
            <div className="grid grid-cols-1 gap-6">
              {collections.map((collection) => {
                const fileName = collection.replace(/ /g, '+');
                const s3Url = `https://foodieheaven.s3.eu-north-1.amazonaws.com/${fileName}.jpg`;

                return (
                  <div key={collection} className="relative h-48 rounded-lg overflow-hidden group">
                    <img
                      src={s3Url}
                      alt={collection}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">{collection}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-6">Cooking Tips &amp; Techniques</h2>
            <div className="space-y-6">
              {['Knife Skills 101', 'How to Season Like a Pro', 'Baking Basics'].map((tip) => (
                <div key={tip} className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold mb-2">{tip}</h3>
                  <p className="text-gray-600">Learn essential techniques to elevate your cooking.</p>
                  <Link to="/tips" className="text-orange-500 mt-2 inline-block">
                    Learn More
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Seasonal Favorites</h2>
        <div className="relative h-64 rounded-lg overflow-hidden">
          <img
            src="https://foodieheaven.s3.eu-north-1.amazonaws.com/seadonalFavorites.jpg"
            alt="Seasonal Favorites"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
            <h3 className="text-4xl text-white font-bold">Seasonal Favorites</h3>
            <Link
              to="/seasonal"
              className="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-12 text-center">
        <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
        <p className="mb-4">Share your own recipes and kitchen tips with fellow food lovers.</p>
        <Link
          to="/community"
          className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
        >
          Get Involved
        </Link>
      </div>
    </div>
  );
};

export default Home;
