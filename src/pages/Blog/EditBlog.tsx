import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getSingleBlog, updateBlog } from '../../endpoints/useEndpoints';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../routes/frontend_Api';

type BlogFormInputs = {
  heading: string;
  selectedTag: string;
  editorContent: string;
  coverImage?: FileList;
};

type BlogResponse = {
  heading: string;
  tag: string;
  content: string;
  coverImage: string;
};

const schema = yup.object({
  heading: yup
    .string()
    .required('Heading is required')
    .min(5, 'Heading must be at least 5 characters long')
    .max(100, 'Heading cannot exceed 100 characters'),

  selectedTag: yup
    .string()
    .required('Tag is required'),

  editorContent: yup
    .string()
    .required('Content is required') 
    .test(
      'is-not-empty',
      'Content is required',
      (value?: string) => {
        if (!value) return false;
        const stripped = value.replace(/<(.|\n)*?>/g, '').trim();
        return stripped.length > 0;
      }
    ),

  coverImage: yup
    .mixed<FileList>()
    .test('fileType', 'Only JPG/PNG files are allowed', (value?: FileList) => {
      if (!value || value.length === 0) return true; 
      const file = value[0];
      return file && ['image/jpeg', 'image/png'].includes(file.type);
    }),
});



const EditBlog: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tags] = useState(['Dinner', 'Desert', 'BreakFast', 'Lunch', 'Healthy']);

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<BlogFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      heading: '',
      selectedTag: '',
      editorContent: '',
    },
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!blogId) return;
        const response = await getSingleBlog(blogId);
        if (response.status === 200) {
          const { heading, tag, content, coverImage }: BlogResponse = response.data;
          reset({
            heading,
            selectedTag: tag,
            editorContent: content,
          });
          setImagePreview(coverImage);
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlog();
  }, [blogId, reset]);

  const savePost = async (isPublished: boolean) => {
    const formData = new FormData();
    const { heading, selectedTag, editorContent, coverImage } = getValues();

    formData.append('heading', heading);
    formData.append('tag', selectedTag);
    formData.append('content', editorContent);
    if (coverImage && coverImage[0]) {
      formData.append('coverImage', coverImage[0]);
    }
    formData.append('status', isPublished ? 'published' : 'draft');

    try {
      if (!blogId) return;
      const response = await updateBlog(blogId, formData);
      if (response.status === 200) {
        console.log('Blog updated successfully!');
        navigate(ROUTES.PUBLIC.HOME);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit(() => {})}>
          <div className="flex justify-between mb-4 mt-4">
            <h1 className="text-2xl font-bold text-gray-800">Edit Blog Post</h1>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Edit Cover Image</label>
            <input
              type="file"
              accept="image/jpeg, image/png"
              {...register('coverImage')}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md mb-2"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                } else {
                  setImagePreview(null);
                }
              }}
            />
            {imagePreview && (
              <div className="w-full h-48 border border-gray-300 rounded-md overflow-hidden">
                <img src={imagePreview} alt="Cover Preview" className="w-full h-full object-cover" />
              </div>
            )}
            {errors.coverImage && <p className="text-red-500 text-sm">{errors.coverImage.message}</p>}
          </div>

          {/* Heading Input */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Heading..."
              {...register('heading')}
              className={`w-full p-4 text-3xl font-bold border rounded-md ${
                errors.heading ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.heading && <p className="text-red-500 text-sm">{errors.heading.message}</p>}
          </div>

          {/* Tag Selection */}
          <div className="mt-4">
            <label className="block text-lg font-medium text-gray-700">Select Tag</label>
            <select
              {...register('selectedTag')}
              className={`w-full p-3 border rounded-md ${
                errors.selectedTag ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a tag</option>
              {tags.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            {errors.selectedTag && <p className="text-red-500 text-sm">{errors.selectedTag.message}</p>}
          </div>

          {/* Rich Text Editor */}
          <div className="mt-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Content</label>
            <Controller
              name="editorContent"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Write something amazing..."
                  className="bg-white border rounded-md"
                />
              )}
            />
            {errors.editorContent && <p className="text-red-500 text-sm">{errors.editorContent.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => handleSubmit(() => savePost(false))()}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(() => savePost(true))()}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
