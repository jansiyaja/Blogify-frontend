import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';

const schema = yup.object().shape({
  heading: yup.string().required('Heading is required'),
  selectedTag: yup.string().required('Tag is required'),
  editorContent: yup
    .string()
    .test(
      'is-not-empty',
      'Content is required',
      (value) => value && value.replace(/<(.|\n)*?>/g, '').trim().length > 0
    ),
});

const CreateBlog = () => {
  const { quill, quillRef } = useQuill();
  const [imagePreview, setImagePreview] = useState('');
  const [tags, setTags] = useState([
    'HTML',
    'JavaScript',
    'TypeScript',
    'Socket.io',
    'AWS',
  ]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      heading: '',
      selectedTag: '',
      editorContent: '',
    },
  });

  const onSubmit = async (data) => {
    console.log('Form Data:', data);

    const { heading, selectedTag, editorContent } = data;
    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('tag', selectedTag);
    formData.append('content', editorContent);
    formData.append('status', data.status || 'draft');

    if (data.coverImage) {
      formData.append('coverImage', data.coverImage[0]);
    }

    try {
      const response = await createBlogPost(formData);
      if (response.status === 200) {
        console.log('Post created successfully:', response.data); 
        reset();
        setImagePreview(null);
      }
    } catch (error) {
      console.error('Failed to save the post. Please try again.', error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center top-4">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between mb-4 mt-4">
            <h1 className="text-2xl font-bold text-gray-800">Create a New Blog Post</h1>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Add Cover Image</label>
            <input
              type="file"
              accept="image/*"
              {...register('coverImage')}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md mb-2"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagePreview(reader.result);
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
          </div>

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

          <div className="mt-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Content</label>
            <Controller
              name="editorContent"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div
                  ref={quillRef}
                  onBlur={() => {
                    if (quill) {
                      field.onChange(quill.root.innerHTML.trim());
                    }
                  }}
                />
              )}
            />
            {errors.editorContent && <p className="text-red-500 text-sm">{errors.editorContent.message}</p>}
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => handleSubmit((data) => onSubmit({ ...data, status: 'draft' }))()}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => handleSubmit((data) => onSubmit({ ...data, status: 'published' }))()}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
