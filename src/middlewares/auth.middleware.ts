import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { z } from "zod";
import AppError from "../errors/AppError";

const tokenSchema = z.object({
    userId: z.string().min(1, "UserId required"),
    role: z.enum(["customer", "restaurantAdmin", "superAdmin"])
});


export const protect = async (req: Request, res: Response, next: NextFunction) => {
    // get token from cookie
    const token = req.cookies.token;
    if (!token) {
        throw new AppError("Authentication Required", 401)
    };
    // jwt verify
    let decoded: string | jwt.JwtPayload;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as jwt.JwtPayload;
    } catch {
        return next(new AppError("Invalid or Expired token", 401))
    };

    // validate token schema
    const result = tokenSchema.safeParse(decoded);
    if (!result.success) {
        return next(new AppError("Invalid token", 401))
    };

    // validate mongodb object id
    if (!mongoose.isObjectIdOrHexString(result.data.userId)) return next(new AppError("Invalid user Id", 401))

    try {
        // check user exist in database
        const user = await User.findById(result.data.userId);
        if (!user) throw new AppError("User not found", 401)

        // set authenticated user info
        req.user = {
            userId: result.data.userId,
            role: result.data.role
        };
        next();
    } catch (error) {
        next(error);
    };

    // login user info in request
    // req.user = {
    //     userId: result.data.userId,
    //     role: result.data.role
    // };

    // next();

};