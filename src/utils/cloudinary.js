import axios from 'axios';

// ============================================
// ENVIRONMENT VARIABLES CHECK KAREIN
// ============================================
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Debug - Check if variables are loaded
console.log('Cloudinary Config:', {
  cloudName: CLOUD_NAME,
  uploadPreset: UPLOAD_PRESET,
  hasCloudName: !!CLOUD_NAME,
  hasUploadPreset: !!UPLOAD_PRESET
});

// ============================================
// VALIDATION - Agar keys missing hain toh error throw karein
// ============================================
if (!CLOUD_NAME) {
  console.error('❌ VITE_CLOUDINARY_CLOUD_NAME is not set in environment variables');
}

if (!UPLOAD_PRESET) {
  console.error('❌ VITE_CLOUDINARY_UPLOAD_PRESET is not set in environment variables');
}

export const uploadImage = async (file) => {
  // Validation
  if (!CLOUD_NAME) {
    throw new Error('Cloudinary cloud name is not configured. Please check your environment variables.');
  }

  if (!UPLOAD_PRESET) {
    throw new Error('Cloudinary upload preset is not configured. Please check your environment variables.');
  }

  const formData = new FormData();
  
  // If file is base64, convert to blob
  if (typeof file === 'string' && file.startsWith('data:image')) {
    try {
      const response = await fetch(file);
      const blob = await response.blob();
      formData.append('file', blob);
    } catch (error) {
      console.error('Error converting base64 to blob:', error);
      throw new Error('Failed to process image');
    }
  } else {
    formData.append('file', file);
  }
  
  formData.append('upload_preset', UPLOAD_PRESET);

  // ============================================
  // CLOUDINARY URL - Cloud Name properly set
  // ============================================
  const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  
  console.log('Uploading to Cloudinary:', {
    url: uploadUrl,
    cloudName: CLOUD_NAME,
    uploadPreset: UPLOAD_PRESET,
    fileSize: file.size || 'unknown'
  });

  try {
    const response = await axios.post(
      uploadUrl,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Upload progress: ${percentCompleted}%`);
          }
        }
      }
    );
    
    console.log('✅ Upload successful:', response.data.secure_url);
    return response.data.secure_url;
  } catch (error) {
    console.error('❌ Error uploading image:', error);
    
    // Detailed error logging
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      
      if (error.response.status === 401) {
        throw new Error('Cloudinary authentication failed. Please check your cloud name and upload preset.');
      } else if (error.response.status === 400) {
        throw new Error('Invalid image or upload preset. Please check your configuration.');
      }
    }
    
    throw new Error(error.response?.data?.error?.message || 'Failed to upload image to Cloudinary');
  }
};

export const uploadMultipleImages = async (files) => {
  if (!files || files.length === 0) {
    return [];
  }

  console.log(`Uploading ${files.length} images to Cloudinary...`);
  
  const uploadPromises = Array.from(files).map(file => uploadImage(file));
  const results = await Promise.all(uploadPromises);
  
  console.log(`✅ ${results.length} images uploaded successfully`);
  return results;
};

// ============================================
// Helper function to check Cloudinary config
// ============================================
export const checkCloudinaryConfig = () => {
  const config = {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    isConfigured: !!(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME && import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
  };
  
  console.log('Cloudinary Configuration:', config);
  return config;
};