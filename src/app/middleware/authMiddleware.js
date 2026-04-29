import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secreto123";

export default function verifyToken(req, res, next) {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res.status(403).json({ msg: "No token" });
  }

  const token = auth.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("JWT ERROR:", err.message);
      return res.status(403).json({ msg: "Token inválido" });
    }

    req.user = decoded;
    next();
  });
}