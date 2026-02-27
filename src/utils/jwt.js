import jwt from "jsonwebtoken";

const buildJwtUser = (user) => ({
    _id: user._id?.toString?.() ?? user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    cart: user.cart?._id?.toString?.() ?? user.cart?.toString?.() ?? user.cart
});

export const generateToken = (user) => {
    const safeUser = buildJwtUser(user);
    return jwt.sign({ user: safeUser }, process.env.JWT_SECRET, { expiresIn: "1h" });
};