import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { getSingleBlog } from '../endpoints/useEndpoints';

interface BlogPost {
  id: string;
  tag: string;
  heading: string;
  content: string;
  coverImageUrl?: string;
  authorId: string;
  author: {
    name: string;
    image: string;
  };
}

const SingleBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        if (!id) {
          setError('Blog ID is missing');
          setLoading(false);
          return;
        }

        const response: BlogPost = await getSingleBlog(id);
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

  if (loading) return <div className="text-center text-xl font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-xl font-semibold text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      <div className="flex justify-between items-center">
        <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-lg">
          {blogPost?.tag}
        </span>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-4">
        {blogPost?.heading}
      </h1>

      {blogPost?.coverImageUrl && (
        <div className="mb-6 overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300">
          <img
            src={blogPost.coverImageUrl}
            alt={blogPost.heading}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div className="text-lg text-gray-700 leading-relaxed mb-6">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {blogPost?.content}
        </ReactMarkdown>
      </div>

      <div className="flex items-center mt-8 p-4 bg-gray-100 rounded-lg">
        <img
          src={blogPost?.author.image || 'https://via.placeholder.com/150'}
          alt={blogPost?.author.name || 'Author'}
          className="w-16 h-16 rounded-full border-2 border-gray-300 mr-4"
        />
        <div>
          <p className="text-md text-gray-800">
            <span className="font-semibold text-gray-700">Author:</span> {blogPost?.author.name}
          </p>
          <p className="text-md text-gray-500">{new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
