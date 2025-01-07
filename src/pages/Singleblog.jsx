import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { getSingleBlog } from '../endpoints/useEndpoints';

const SingleBlog = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await getSingleBlog(id);
        console.log(response);
        setBlogPost(response);
        setLoading(false);
      } catch (err) {
        setError('Error fetching the blog post');
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5">
      <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-lg">
        {blogPost.tag}
      </span>

      <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-4">
        {blogPost.heading}
      </h1>

      {blogPost.coverImageUrl && (
        <div className="mb-6">
          <img
            src={blogPost.coverImageUrl}
            alt={blogPost.heading}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      <div className="text-lg text-gray-700 leading-relaxed mb-6">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {blogPost.content}
        </ReactMarkdown>
      </div>

      <div className="flex items-center mt-6 p-4 bg-gray-100 rounded-lg">
        <img
          src={`https://api.example.com/users/${blogPost.authorId}/avatar`}
          alt="Author"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <p className="text-md text-gray-500">
            <span className="font-semibold">Author ID: {blogPost.authorId}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
