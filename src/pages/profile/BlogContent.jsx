import React, { useEffect, useState } from 'react';
import {  Trash2 } from 'lucide-react';
import { 
  Card, CardContent, CardHeader, IconButton,
  List, ListItem, ListItemAvatar, ListItemText, Divider, Box, Typography
} from '@mui/material';
import { useSelector } from 'react-redux';
import { deleteSingleBlog, userBlogs } from '../../endpoints/useEndpoints';
import ErrorToast from '../../components/ErrorToast';

export const BlogsContent = () => {
  const { user } = useSelector((state) => state.auth);
    const [blogs, setBlogs] = useState([]);
    const [toast,setToast]=useState(null)

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await userBlogs(user.id); 
        console.log(response);
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
        const response = await deleteSingleBlog(blogId)
        if (response.staus == 200) {
            setToast({ message: "deleted successfully", type: "sucess" });
            window.location.reload()
        }
    } catch (error) {
       const errorMessage = error.response?.data?.error || 'Something went wrong';
  console.error('Error:', errorMessage);
 
         setToast({ message: errorMessage, type: "error" });  
    }
  };

  return (
    <Card sx={{ maxWidth: 800, margin: '20px auto' }}>
      <CardHeader title="Your Blogs" />
      <CardContent>
        <List>
          {blogs.map(blog => (
            <React.Fragment key={blog.id}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <>
                
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
    </Card>
  );
};
