# Add Product Fix - Setup Instructions

## What Was Fixed

The "Failed to submit product" error was caused by a conflict between Express body parsers and Multer. When Express's `express.json()` or `express.urlencoded()` middleware runs before Multer, they consume the request stream, leaving nothing for Multer to parse.

### Changes Made:

1. **Backend (`server.js`)**:
   - Removed global body parsing middleware
   - Multer now receives the raw request stream

2. **Backend (`routes.js`)**:
   - Added selective body parsing with `jsonParser` only to routes that need it
   - Product upload route uses only Multer (no body parser)
   - Improved Multer storage configuration with proper file naming

3. **Frontend (`AddProductForm.jsx`)**:
   - Fixed category ID mapping (MongoDB uses `_id` not `id`)
   - Added fallback for API URL: `process.env.REACT_APP_API_URL || 'http://localhost:2000'`
   - Removed manual Content-Type header (Axios sets this automatically with boundary)

## Environment Setup

### For Local Development:

Create a `.env` file in the `Frontend` directory:

```env
REACT_APP_API_URL=http://localhost:2000
```

**Note**: After creating/modifying `.env`, you MUST restart your React dev server!

### For Production (Render):

Set the environment variable in your Render dashboard:
- Key: `REACT_APP_API_URL`
- Value: `https://alos-interiors-web-backend.onrender.com`

## Deploying Backend Changes to Render

Your backend changes need to be deployed to Render for production to work:

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Fix: Add product form - resolve multer body parsing conflict"
   ```

2. **Push to your repository**:
   ```bash
   git push origin main
   ```

3. **Render will auto-deploy** (if auto-deploy is enabled)
   - Or manually deploy from the Render dashboard

## Testing

### Local Testing:
1. Ensure backend is running: `cd Backend && npm run dev`
2. Ensure frontend is running: `cd Frontend && npm start`
3. Navigate to Add Product page
4. Fill in the form and submit
5. Check that the product appears in your database

### Production Testing:
1. After deploying backend to Render
2. Open your production frontend URL
3. Test adding a product
4. Verify it saves correctly

## Key Points to Remember

- **Always restart React** after changing `.env` files
- **Backend must be deployed** to Render for production to work
- **Don't commit `.env` files** - add them to `.gitignore`
- The `uploads/` folder stores product images locally
- MongoDB uses `_id` for IDs, not `id`

