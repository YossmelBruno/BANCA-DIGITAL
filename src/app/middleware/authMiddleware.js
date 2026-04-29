import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const auth = req.headers["authorization"];

  if (!auth) return res.status(403).json({ msg: "No token" });

  const token = auth.split(" ")[1];

  jwt.verify(token, "secreto123", (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Token inválido" });

    req.user = decoded;
    next();
  });
}
