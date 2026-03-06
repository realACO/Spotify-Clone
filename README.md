🎵 Spotify Clone

A full-stack Spotify-style music streaming application built using a modern JavaScript and TypeScript stack.
This project focuses on authentication, media handling, and a scalable backend architecture.

🧰 Tech Stack

Frontend:
- TypeScript
- JavaScript
- CSS
- React
- Vite

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)

Media & Storage:
- ImageKit

📦 Dependencies

All required dependencies are already included in:
- package.json
- package-lock.json

You do not need to manually install individual libraries.
Just install dependencies and run the project.

📂 Project Structure
```
spotify-clone/
│
├── client/               # Frontend (Vite + React + TypeScript)
│   ├── src/
│   ├── public/
│   └── vite.config.ts
│
├── src/                  # Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── middlewares/
│   └── db/
│
├── server.js
├── app.js
├── package.json
├── package-lock.json
├── .env.example
└── README.md
```

🔐 Environment Variables

Create a .env file in the root directory and add:
```
MONGO_URI=
JWT_SECRET=
IMAGEKIT_PRIVATE_KEY=
```

These variables are required for the project to work.

🚀 Getting Started

Clone the repository:

git clone https://github.com/your-username/spotify-clone.git
cd spotify-clone

Install dependencies:

Backend:
npm install

Frontend:
cd client
npm install

▶️ Run the Project

Start backend:
npm run dev

Start frontend:
cd client
npm run dev

🔑 Authentication

- JWT-based authentication
- Tokens issued on login
- Protected routes require a valid token

📸 Media Handling

- Media uploads and delivery handled using ImageKit
- Secure access using private API keys

📸 Screenshots
  <img width="1917" height="861" alt="1" src="https://github.com/user-attachments/assets/bd0d22e0-3ebb-40ea-9e2f-e38d14024abb" />
  <hr/>
  <img width="1918" height="868" alt="2" src="https://github.com/user-attachments/assets/4850c1ea-4c55-4469-b1d1-a28b895081b1" />
  <hr/>
  <img width="1918" height="850" alt="3" src="https://github.com/user-attachments/assets/2018f88d-f02a-45fd-9de3-86a4af8c4618" />


📌 Notes

- Project is for learning and demonstration purposes
- Not affiliated with Spotify
- All sensitive data is handled via environment variables

📜 License

MIT License
