const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);

const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");
app.use(express.static(frontendDistPath));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

module.exports = app;
