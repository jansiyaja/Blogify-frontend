import React, { useEffect, useState } from 'react';
import { Trash2, Edit } from 'lucide-react';
import {
  Card, CardContent, CardHeader, IconButton,
  List, ListItem, ListItemAvatar, ListItemText, Divider, Box, Typography, Dialog, DialogContent, DialogActions, TextField, Button
} from '@mui/material';
import { useSelector } from 'react-redux';
import { deleteSingleBlog, userBlogs, updateSingleBlog } from '../../endpoints/useEndpoints';
import ErrorToast from '../../components/ErrorToast';

export const BlogsContent = () => {
  const { user } = useSelector((state) => state.auth);
  const [blogs, setBlogs] = useState([]);
  const [toast, setToast] = useState(null);
  const [editBlog, setEditBlog] = useState(null); 
  const [editForm, setEditForm] = useState({ heading: '', description: '', coverImageUrl: '' });

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
        setBlogs(blogs.filter((blog) => blog.id !== blogId));
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Something went wrong';
      setToast({ message: errorMessage, type: 'error' });
    }
  };

  const handleEditBlog = (blog) => {
    setEditBlog(blog);
    setEditForm({ heading: blog.heading, description: blog.description, coverImageUrl: blog.coverImageUrl });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateBlog = async () => {
    try {
      const response = await updateSingleBlog(editBlog.id, editForm);
      if (response.status === 200) {
        setToast({ message: 'Updated successfully', type: 'success' });
        setBlogs((prev) =>
          prev.map((blog) =>
            blog.id === editBlog.id ? { ...blog, ...editForm } : blog
          )
        );
        setEditBlog(null);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Something went wrong';
      setToast({ message: errorMessage, type: 'error' });
    }
  };

  return (
    <Card sx={{ maxWidth: 800, margin: '20px auto' }}>
      <CardHeader title="Your Blogs" />
      <CardContent>
        <List>
          {blogs.map((blog) => (
            <React.Fragment key={blog.id}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <>
                    <IconButton edge="end" onClick={() => handleEditBlog(blog)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteBlog(blog.id)}>
                      <Trash2 />
                    </IconButton>
                  </>
                }
              >
                <ListItemAvatar>
                  <Box
                    component="img"
                    src={blog.coverImageUrl}
                    alt="Blog Cover"
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {blog.heading}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="textSecondary">
                      {blog.description}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
      {toast && <ErrorToast type={toast.type} message={toast.message} />}

      {/* Edit Modal */}
      <Dialog open={!!editBlog} onClose={() => setEditBlog(null)}>
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
            label="Description"
            name="description"
            value={editForm.description}
            onChange={handleEditFormChange}
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Cover Image URL"
            name="coverImageUrl"
            value={editForm.coverImageUrl}
            onChange={handleEditFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditBlog(null)}>Cancel</Button>
          <Button onClick={handleUpdateBlog} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
