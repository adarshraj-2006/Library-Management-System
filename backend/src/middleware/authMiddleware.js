import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(400).json({ message: "Not authorized " });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token " });
    }
}