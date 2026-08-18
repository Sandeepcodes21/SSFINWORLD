import cloudinary from '../config/cloudinary.js';

// ============================================
// EXTRACT PUBLIC ID FROM CLOUDINARY URL
// ============================================
export const extractPublicId = (url) => {
  try {
    if (!url) return null;
    
    // Remove query parameters
    const cleanUrl = url.split('?')[0];
    
    // Cloudinary URL format examples:
    // https://res.cloudinary.com/demo/image/upload/v1234567890/folder/image.jpg
    // https://res.cloudinary.com/demo/image/upload/folder/image.jpg
    // https://res.cloudinary.com/demo/image/upload/v1234567890/image.jpg
    
    const parts = cleanUrl.split('/');
    
    // Find 'upload' in the URL
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) {
      // Try 'image/upload' pattern
      const imageIndex = parts.indexOf('image');
      if (imageIndex === -1) return null;
      const uploadIdx = parts.indexOf('upload', imageIndex);
      if (uploadIdx === -1) return null;
    }
    
    // Find version (starts with 'v') or use upload index
    const versionIndex = parts.findIndex(p => p.startsWith('v') && p.length > 1 && /^\d+$/.test(p.substring(1)));
    const startIndex = versionIndex !== -1 ? versionIndex + 1 : parts.indexOf('upload') + 1;
    
    // Build public_id (folder/filename without extension)
    const publicIdParts = parts.slice(startIndex);
    let publicId = publicIdParts.join('/');
    
    // Remove file extension
    publicId = publicId.replace(/\.[^/.]+$/, '');
    
    return publicId;
  } catch (error) {
    console.error('Error extracting public_id:', error);
    return null;
  }
};

// ============================================
// DELETE IMAGE FROM CLOUDINARY
// ============================================
export const deleteCloudinaryImage = async (imageUrl) => {
  try {
    const publicId = extractPublicId(imageUrl);
    if (!publicId) {
      console.warn('⚠️ Could not extract public_id from URL:', imageUrl);
      return { success: false, error: 'Invalid URL' };
    }
    
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`✅ Deleted from Cloudinary: ${publicId}`);
    return { success: true, publicId, result };
  } catch (error) {
    console.error('❌ Error deleting from Cloudinary:', error);
    return { success: false, error: error.message };
  }
};

// ============================================
// DELETE MULTIPLE IMAGES FROM CLOUDINARY
// ============================================
export const deleteMultipleCloudinaryImages = async (imageUrls) => {
  if (!imageUrls || imageUrls.length === 0) return [];
  
  console.log(`🗑️ Deleting ${imageUrls.length} images from Cloudinary...`);
  
  const results = [];
  for (const url of imageUrls) {
    try {
      const result = await deleteCloudinaryImage(url);
      results.push({ url, ...result });
    } catch (error) {
      results.push({ url, success: false, error: error.message });
    }
  }
  
  const successCount = results.filter(r => r.success).length;
  console.log(`✅ ${successCount}/${imageUrls.length} images deleted from Cloudinary`);
  
  return results;
};

// ============================================
// VERIFY CLOUDINARY CONFIGURATION
// ============================================
export const verifyCloudinaryConfig = () => {
  console.log('🔍 Cloudinary Config Check:');
  console.log(`  Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME || '❌ Missing'}`);
  console.log(`  API Key: ${process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing'}`);
  console.log(`  API Secret: ${process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing'}`);
  
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.warn('⚠️ Cloudinary configuration incomplete. Image deletion may fail.');
  }
};