import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) throw new AppError("Authentication Required", 401)
        if (!roles.includes(req.user.role)) throw new AppError("You are not Authorize", 403)
        next();
    }
}

export default authorize;
