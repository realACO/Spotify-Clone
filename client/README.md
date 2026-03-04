# Spotify Clone - Frontend

A modern Spotify-like web application built with React, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **React 18** with **TypeScript**
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Context API** - State management
- **Lucide React** - Icon library

## 📁 Project Structure

```
client/
├── src/
│   ├── api/
│   │   └── axios.ts                 # Axios client with interceptors
│   ├── components/
│   │   ├── Layout.tsx               # Main layout wrapper
│   │   ├── Sidebar.tsx              # Left navigation sidebar
│   │   ├── Navbar.tsx               # Top navigation bar
│   │   ├── Player.tsx               # Bottom music player
│   │   └── ProtectedRoute.tsx       # Route guards (user & artist)
│   ├── contexts/
│   │   ├── AuthContext.tsx          # Authentication state & logic
│   │   └── PlayerContext.tsx        # Music player state & controls
│   ├── pages/
│   │   ├── LoginPage.tsx            # User login
│   │   ├── RegisterPage.tsx         # User registration
│   │   ├── HomePage.tsx             # All tracks (main page)
│   │   ├── AlbumsPage.tsx           # All albums
│   │   ├── AlbumDetailsPage.tsx     # Single album with tracks
│   │   ├── UploadMusicPage.tsx      # Upload track (artist only)
│   │   └── CreateAlbumPage.tsx      # Create album (artist only)
│   ├── services/
│   │   ├── auth.service.ts          # Auth API calls
│   │   └── music.service.ts         # Music API calls
│   ├── types/
│   │   ├── auth.types.ts            # Auth interfaces
│   │   ├── music.types.ts           # Music interfaces
│   │   └── index.ts                 # Type exports
│   ├── App.tsx                      # Main app with routing
│   ├── main.tsx                     # App entry point
│   └── index.css                    # Global styles + Tailwind
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
cd client
npm install
```

### 2. Configure Backend URL

Update the API base URL in `src/api/axios.ts`:

```typescript
const API_BASE_URL = "http://localhost:3000/api"; // Update to match your backend
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## 🎯 Features

### Authentication

- ✅ User registration (User/Artist role selection)
- ✅ User login
- ✅ JWT token stored in localStorage
- ✅ Protected routes with automatic redirect
- ✅ Axios interceptor attaches token to all requests
- ✅ Automatic logout on 401 responses

### Music Player

- ✅ HTML5 Audio API
- ✅ Play/Pause controls
- ✅ Progress bar with seek functionality
- ✅ Volume control with mute toggle
- ✅ Displays track info (title, artist, album art)
- ✅ Persistent player across all pages
- ✅ Streams audio from ImageKit URLs

### Pages & Features

#### Home Page (All Users)

- Grid view of all music tracks
- Click to play/pause tracks
- Visual indicator for currently playing track
- Responsive grid layout

#### Albums Page (All Users)

- Grid view of all albums
- Click to view album details
- Shows album art, title, artist, and year

#### Album Details (All Users)

- Album header with cover art
- Track listing with play controls
- Track duration display
- Visual current track indicator

#### Upload Music (Artists Only)

- Upload audio files (multipart/form-data)
- Optional cover image upload
- Select existing album or no album
- Upload progress indicator
- File type validation (audio/\*)

#### Create Album (Artists Only)

- Create new albums
- Add album metadata (title, artist, year)
- Optional cover image URL

## 🔐 Authentication Flow

1. User registers/logs in via `/register` or `/login`
2. Backend returns JWT token and user data
3. Token stored in localStorage
4. Axios interceptor attaches token to all requests:
   ```
   Authorization: Bearer <token>
   ```
5. Protected routes check for valid user
6. Artist routes check for artist role
7. On 401 response, token cleared and redirect to login

## 🎨 Design System

### Colors (Tailwind Config)

- `spotify-green`: #1DB954 (Primary)
- `spotify-black`: #191414 (Background)
- `spotify-dark-gray`: #121212 (Secondary background)
- `spotify-gray`: #282828 (Cards/containers)
- `spotify-light-gray`: #b3b3b3 (Secondary text)

### Layout

- Sidebar: 256px fixed width
- Navbar: 64px fixed height
- Player: 96px fixed height
- Main content: Flex-fill with scroll

## 🔌 API Integration

### Base URL

```typescript
http://localhost:3000/api
```

### Auth Endpoints

- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Music Endpoints (Protected)

- `GET /music/` - Get all tracks
- `GET /music/albums` - Get all albums
- `GET /music/albums/:id` - Get album by ID

### Artist Endpoints (Artist Role Required)

- `POST /music/upload` - Upload music (multipart/form-data)
- `POST /music/album` - Create album

## 📝 TODO Comments

The codebase includes TODO comments where backend field names may vary:

- User interface fields
- Track interface fields
- Album interface fields
- API response structures
- Form data field names

Search for `// TODO:` to find areas that may need adjustment based on actual backend responses.

## 🚦 Running the Full Stack

1. Start backend server (port 3000)
2. Start frontend dev server (port 5173)
3. Navigate to `http://localhost:5173`
4. Register as an artist to access upload features
5. Register as a user to test listener features

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Breakpoints: sm, md, lg, xl
- Custom scrollbar styling
- Touch-friendly controls

## 🎵 Custom Hooks

### useAuth()

```typescript
const { user, token, login, register, logout, isArtist } = useAuth();
```

### usePlayer()

```typescript
const {
  currentTrack,
  isPlaying,
  volume,
  currentTime,
  duration,
  playTrack,
  togglePlay,
  pause,
  setVolume,
  seek,
} = usePlayer();
```

## 🛠️ Development

### Code Quality

- TypeScript strict mode
- ESLint configuration
- Component-based architecture
- Separation of concerns (services, contexts, components)

### State Management

- Context API for global state
- Local state for component-specific data
- Service layer for API calls

## 📄 License

This project is part of a Spotify Clone full-stack application.
