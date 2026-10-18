import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import AppError from "../errors/AppError";

const tokenSchema = z.object({
    userId: z.string().min(1, "UserId required"),
    role: z.enum(["customer", "restaurantAdmin", "superAdmin"])
});


export const protect = (req: Request, res: Response, next: NextFunction) => {
    // get token from cookie
    const token = req.cookies.token;
    if (!token) {
        throw new AppError("Authentication Required", 404)
    };
    // jwt verify
    let decoded: string | jwt.JwtPayload;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as jwt.JwtPayload;
    } catch {
        return next(new AppError("Invalid or Expired token", 401))
    }

    const result = tokenSchema.safeParse(decoded);
    if (!result.success) {
        return next(new AppError("Invalid token", 401))
    }

    // login user info in request
    req.user = {
        userId: result.data.userId,
        role: result.data.role
    };

    next();

};