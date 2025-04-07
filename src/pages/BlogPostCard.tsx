import React from "react";
import { Link } from "react-router-dom";

interface BlogPostCardProps {
  heading: string;
  tag: string;
  coverImageUrl: string;
  createdAt: string | Date;
  authorId: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  heading,
  tag,
  coverImageUrl,
  createdAt,
  authorId,
}) => {
  return (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="w-1/3 h-48 overflow-hidden">
        <img
          src={coverImageUrl}
          alt={heading}
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="w-2/3 p-4 flex flex-col justify-center">
        <p className="text-green-600 text-xs font-bold uppercase">{tag}</p>
        <Link to={`/blog/${authorId}`} className="hover:underline">
          <h3 className="text-xl font-bold text-gray-900 mt-1 transition-colors duration-300 hover:text-green-600">
            {heading}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mt-2">
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mt-3 line-clamp-3">
          A short excerpt from the blog post...
        </p>
        <Link to={`/blog/${authorId}`} className="mt-3 text-blue-600 font-semibold hover:underline">
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;
