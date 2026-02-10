import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign({ user }, "jwtSecret", { expiresIn: "1h" });
};