import React, { useState, ChangeEvent } from 'react';
import { Camera, Edit2, Save } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  IconButton,
  Avatar,
  Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { editProfile } from '../../endpoints/useEndpoints';
import ErrorToast from '../../components/ErrorToast';
import { RootState } from '../../redux/store/store';

interface ProfileState {
  name: string;
  email: string;
  about: string;
  image: string;
  imageFile: File | null;
}

interface Toast {
  message: string;
  type: 'error' | 'success';
}

export const ProfileContent: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [toast, setToast] = useState<Toast | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileState>({
    name: user?.name || '',
    email: user?.email || '',
    about: user?.about || '',
    image: user?.image || '',
    imageFile: null,
  });

  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('about', profile.about);
      if (profile.imageFile) {
        formData.append('image', profile.imageFile);
      }

      const response = await editProfile(formData);
      console.log(response);
      setIsEditing(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || 'Something went wrong';
      console.error('Error:', errorMessage);
      setToast({ message: errorMessage, type: 'error' });
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewImage = URL.createObjectURL(file);
      setProfile((prevProfile) => ({
        ...prevProfile,
        image: previewImage,
        imageFile: file,
      }));
    }
  };

  return (
    <Card>
      <CardHeader
        title="Profile Information"
        action={
          <IconButton onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <Save /> : <Edit2 />}
          </IconButton>
        }
      />
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Box position="relative">
            <Avatar
              src={profile.image || user?.image}
              alt="Profile"
              sx={{ width: 128, height: 128 }}
            />
            <IconButton component="label" sx={{ position: 'absolute', bottom: 0, right: 0 }}>
              <Camera />
              <input type="file" hidden onChange={handleImageUpload} />
            </IconButton>
          </Box>
        </Box>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            disabled={!isEditing}
            value={profile.name}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile,
                name: e.target.value,
              }))
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            disabled={!isEditing}
            value={profile.email}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile,
                email: e.target.value,
              }))
            }
          />
          <TextField
            label="About"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            disabled={!isEditing}
            value={profile.about}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile,
                about: e.target.value,
              }))
            }
          />
          {isEditing && (
            <Button variant="contained" onClick={handleProfileUpdate} fullWidth>
              Save Changes
            </Button>
          )}
        </Box>
      </CardContent>
      {toast && <ErrorToast type={toast.type} message={toast.message} />}
    </Card>
  );
};
