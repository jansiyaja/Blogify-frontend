const BlogPostCard = ({ heading, tag, coverImageUrl, createdAt, authorId }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={coverImageUrl} alt={heading} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{heading}</h3>
        <p className="text-gray-500">{tag}</p>
        <p className="text-sm text-gray-400">{new Date(createdAt).toLocaleDateString()}</p>
        <div className="mt-4">
          <p>Author ID: {authorId}</p> 
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
