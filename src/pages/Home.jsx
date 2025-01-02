import React, { useState, useEffect } from 'react';
import BlogPostCard from './BlogPostCard';
import { getAllBlogs } from '../endpoints/useEndpoints';

const Home = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
          const response = await getAllBlogs();
          console.log(response);
          

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Latest Blog Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <BlogPostCard
            key={index}
            heading={post.heading}
            tag={post.tag}
            coverImageUrl={post.coverImageUrl}
            createdAt={post.createdAt}
            authorId={post.authorId} 
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
