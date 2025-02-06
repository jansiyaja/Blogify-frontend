import React, { useEffect, useState } from 'react';
import { Trash2, Edit } from 'lucide-react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { deleteSingleBlog, userBlogs } from '../../endpoints/useEndpoints';
import ErrorToast from '../../components/ErrorToast';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export const BlogsContent = () => {
  const { user } = useSelector((state) => state.auth);
  const [blogs, setBlogs] = useState([]);
  const [toast, setToast] = useState(null);
  const [editBlog, setEditBlog] = useState(null);
  const [editForm, setEditForm] = useState({
    heading: '',
    tag: '',
    content: '',
    coverImageUrl: '',
  });

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await userBlogs(user.id);
        setBlogs(response);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    if (user?.id) {
      fetchUserBlogs();
    }
  }, [user]);

  const handleDeleteBlog = async (blogId) => {
    try {
      const response = await deleteSingleBlog(blogId);
      if (response.status === 200) {
        setToast({ message: 'Deleted successfully', type: 'success' });
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Something went wrong';
      setToast({ message: errorMessage, type: 'error' });
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenEditDialog = (blog) => {
    setEditBlog(blog);
    setEditForm({
      heading: blog.heading,
      tag: blog.tag || '',
      content: blog.content, // HTML content from QuillJS
      coverImageUrl: blog.coverImageUrl,
    });
  };

  const handleCloseEditDialog = () => {
    setEditBlog(null);
  };

  return (
    <Box className="container mx-auto px-4 py-8">
      {/* Static Header */}
      <Typography variant="h4" className="font-bold text-center mb-6">
        Your Delicious Food Blog Posts
      </Typography>
      <Typography variant="body1" className="text-center mb-8 text-gray-600">
        Manage your latest recipes, tips, and food stories below.
      </Typography>

      {/* Responsive Flex Layout */}
      <div className="flex flex-wrap -mx-2">
        {blogs.map((blog) => (
          <div key={blog.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
            <Card className="relative rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-80">
              <CardMedia
                component="img"
                height="200"
                image={blog.coverImageUrl}
                alt={blog.heading}
                className="object-cover"
              />
            
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
          
              <CardContent className="absolute bottom-0 z-10 text-white">
                <Typography variant="h6" className="font-bold">
                  {blog.heading}
                </Typography>
                <Typography variant="body2">
                   <ReactMarkdown rehypePlugins={[rehypeRaw]}>
             {blog.content?.length > 100
                    ? blog.content.slice(0, 100) + '...'
                    : blog.content || ''}
            </ReactMarkdown>
                 
                </Typography>
              </CardContent>
      
              <CardActions className="absolute top-2 right-2 z-10">
                <IconButton onClick={() => handleOpenEditDialog(blog)} className="text-white">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteBlog(blog.id)} className="text-white">
                  <Trash2 />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>

      {toast && <ErrorToast type={toast.type} message={toast.message} />}

 
      <Dialog open={!!editBlog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Heading"
            name="heading"
            value={editForm.heading}
            onChange={handleEditFormChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Tag"
            name="tag"
            value={editForm.tag}
            onChange={handleEditFormChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Cover Image URL"
            name="coverImageUrl"
            value={editForm.coverImageUrl}
            onChange={handleEditFormChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Content (HTML)"
            name="content"
            value={editForm.content}
            onChange={handleEditFormChange}
            multiline
            rows={8}
          />
          
          <Box className="mt-4 p-4 border rounded">
            <Typography variant="subtitle1" className="mb-2">
              Preview:
            </Typography>

             <ReactMarkdown
       
          rehypePlugins={[rehypeRaw]}
      >
          {editForm.content}
      </ReactMarkdown>
           
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseEditDialog}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
