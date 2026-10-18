import jwt from "jsonwebtoken";

const generateToken = (userId: string, role: string) => {
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET_KEY as string, { expiresIn: "7d", })
    return token;
};

export default generateToken;

