# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies

```bash
cd client
npm install
```

### Step 2: Configure Backend URL

Open `client/src/api/axios.ts` and update the API URL:

```typescript
const API_BASE_URL = "http://localhost:3000/api"; // Change to your backend URL
```

### Step 3: Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## 🎯 First-Time Usage

### Register & Login

1. **Go to** `http://localhost:5173/register`
2. **Choose account type:**
   - **Listener** - For regular users (browse and play music)
   - **Artist** - For content creators (upload music and create albums)
3. **Login** with your credentials

### For Regular Users

After logging in as a **Listener**:

- ✅ **Home** - Browse all music tracks
- ✅ **Albums** - Browse all albums
- ✅ Click any track to play
- ✅ Use the bottom player to control playback

### For Artists

After logging in as an **Artist**, you get access to:

- ✅ Everything regular users can do, PLUS:
- ✅ **Upload** - Upload your music tracks
- ✅ **Create Album** - Create albums for your music

---

## 🎵 How to Upload Music (Artists Only)

1. Click **"Upload"** in the sidebar
2. Fill in the form:
   - **Track Title** (required)
   - **Artist Name** (required)
   - **Album** (optional - select from existing albums)
   - **Music File** (required - select an audio file)
   - **Cover Image** (optional)
3. Click **"Upload Track"**
4. Wait for upload progress to complete
5. Your track is now available!

---

## 📀 How to Create an Album (Artists Only)

1. Click **"Create Album"** in the sidebar
2. Fill in the form:
   - **Album Title** (required)
   - **Artist Name** (required)
   - **Cover Image URL** (optional)
   - **Release Year** (optional)
3. Click **"Create Album"**
4. Your album is now created!
5. When uploading tracks, you can now select this album

---

## 🎮 Using the Music Player

The player at the bottom is **persistent** - it stays visible on all pages!

### Controls:

- **Play/Pause** - Large button in center
- **Seek** - Drag the progress bar
- **Volume** - Use the volume slider (right side)
- **Mute** - Click the volume icon

### Features:

- Displays current track info (title, artist, album art)
- Shows current time and total duration
- Automatically updates as the song plays

---

## 🔐 Authentication Details

### How it Works:

1. When you login, you get a **JWT token**
2. Token is stored in **localStorage**
3. All API requests automatically include the token
4. If token expires (401 error), you're auto-logged out

### Logout:

- Click the **logout icon** (arrow) in the top-right navbar
- This clears your token and returns you to login

---

## 🛠️ Troubleshooting

### Backend Connection Issues

**Problem:** Can't login or see any data

**Solution:**

1. Make sure your backend server is running
2. Check that the API URL in `client/src/api/axios.ts` is correct
3. Check browser console for CORS errors
4. Verify backend is on the correct port (default: 3000)

### Upload Issues

**Problem:** File upload fails

**Solution:**

1. Make sure you're logged in as an **Artist**
2. Check file size limits (backend configuration)
3. Ensure backend ImageKit configuration is correct
4. Check that the backend `/api/music/upload` endpoint is working

### Player Issues

**Problem:** Audio won't play

**Solution:**

1. Check that the track has a valid `audioUrl` from ImageKit
2. Open browser console to see any errors
3. Verify backend is returning proper ImageKit URLs
4. Make sure audio file was uploaded successfully

### Type Errors

**Problem:** TypeScript errors about field names

**Solution:**

1. Search for `// TODO:` comments in the code
2. Compare with actual backend API responses
3. Update TypeScript interfaces in `client/src/types/`

---

## 📁 Important Files

### Configuration

- `client/src/api/axios.ts` - Backend URL and Axios setup
- `client/tailwind.config.js` - UI colors and theme
- `client/vite.config.ts` - Vite build configuration

### Type Definitions

- `client/src/types/auth.types.ts` - User, Login, Register types
- `client/src/types/music.types.ts` - Track, Album types

### Services

- `client/src/services/auth.service.ts` - Auth API calls
- `client/src/services/music.service.ts` - Music API calls

---

## 🎨 Customization

### Change Colors

Edit `client/tailwind.config.js`:

```javascript
colors: {
  'spotify-green': '#1DB954',  // Change this
  'spotify-black': '#191414',  // Change this
  // etc.
}
```

### Change Logo

Edit `client/src/components/Sidebar.tsx`:

```tsx
<h1 className="text-2xl font-bold text-spotify-green">
  Your App Name {/* Change this */}
</h1>
```

---

## 📚 Learn More

- **Full Documentation:** See `README.md`
- **Project Summary:** See `PROJECT_SUMMARY.md`
- **React 18 Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **TypeScript:** https://www.typescriptlang.org

---

## ✅ Checklist

Before deploying to production:

- [ ] Update API_BASE_URL to production backend
- [ ] Test all features (login, register, play, upload, etc.)
- [ ] Build for production: `npm run build`
- [ ] Test the production build: `npm run preview`
- [ ] Configure environment variables (if needed)
- [ ] Set up proper error tracking (Sentry, etc.)
- [ ] Enable analytics (Google Analytics, etc.)
- [ ] Set up CI/CD pipeline
- [ ] Configure CDN for static assets

---

**🎉 You're all set! Enjoy your Spotify Clone!**
