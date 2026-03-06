const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
  const token = req.cookies.token;
  console.log("\n=== AUTH ARTIST MIDDLEWARE ===");
  console.log("Token present:", !!token);

  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    console.log("User role:", decoded.role);

    if (decoded.role !== "artist") {
      console.log("User role is not 'artist', access denied");
      return res
        .status(403)
        .json({ message: "you dont have access to this route" });
    }

    console.log("Auth passed for artist:", decoded.id);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

async function authUser(req, res, next) {
  const token = req.cookies.token;
  console.log("\n=== AUTH USER MIDDLEWARE ===");
  console.log("Token present:", !!token);

  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    console.log("User role:", decoded.role);

    if (decoded.role !== "user") {
      console.log("User role is not 'user', access denied");
      return res
        .status(403)
        .json({ message: "you dont have access to this route" });
    }

    console.log("Auth passed for user:", decoded.id);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = {
  authArtist,
  authUser,
};
