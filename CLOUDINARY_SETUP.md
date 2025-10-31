# Cloudinary Setup for Production Image Storage

## Why Cloudinary?

Render uses **ephemeral storage** - any files uploaded to the server are **deleted when the server restarts or redeploys**. This is why images disappear in production.

**Solution**: Use cloud storage like Cloudinary (free tier available).

## Setup Instructions

### 1. Create Cloudinary Account

1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up for a free account
3. After signup, go to your Dashboard
4. Note down these values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 2. Install Cloudinary in Backend

```bash
cd Backend
npm install cloudinary multer-storage-cloudinary
```

### 3. Update Backend Environment Variables

Add to your `Backend/.env` file:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

And in **Render Dashboard** → Your Backend Service → Environment:
- Add the same three variables

### 4. Update Backend Code

Replace the multer configuration in `Backend/routers/routes.js`:

```javascript
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'alos-interiors-products', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }] // Optional: resize images
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});
```

### 5. Update Product Creation Route

In the `/productpost` route, change:

```javascript
const image = req.file ? req.file.path : null; // Cloudinary returns full URL in path

const addProduct = await productDatabase.create({
  productname,
  description,
  price,
  category,
  imageUrl: image // Now stores full Cloudinary URL
});
```

### 6. Update Frontend

Since Cloudinary returns full URLs, update frontend components to use the URL directly:

```javascript
// In AllProducts.jsx, ShopCategory.jsx, etc.
const imageUrl = prod.imageUrl || "fallback.png"; // imageUrl is already full URL

// Instead of:
// const imageUrl = `${API_BASE_URL}/${prod.imageUrl}`;
```

## Benefits of Cloudinary

✅ **Persistent storage** - Images never deleted  
✅ **CDN delivery** - Fast image loading worldwide  
✅ **Automatic optimization** - Images compressed and optimized  
✅ **Image transformations** - Resize, crop, format conversion on the fly  
✅ **Free tier** - 25GB storage, 25k transformations/month  

## Testing

1. Deploy updated backend to Render
2. Add a new product with image
3. Check that the image URL in database starts with `https://res.cloudinary.com/`
4. Verify image displays correctly
5. Redeploy backend - image should still be visible (not deleted)

## Alternative Solutions

If you don't want to use Cloudinary:
- **AWS S3** - More complex setup, pay-as-you-go pricing
- **Google Cloud Storage** - Similar to S3
- **Uploadcare** - Similar to Cloudinary
- **ImgBB** - Free image hosting API

## Current Quick Fix

For now, I've fixed the image URL path issue so images work temporarily. But they will still be lost on redeploy until you implement cloud storage.

