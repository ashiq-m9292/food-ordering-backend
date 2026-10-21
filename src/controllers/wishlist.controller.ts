import { Request, Response, NextFunction } from 'express';
import AppError from "../errors/AppError";
import {
    addToWishlistService,
    getWishlistService,
    removeFromWishlistService
} from "../services/wishlist.services";

class WishlistController {

    // add to wishlist function
    async addToWishlistFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const wishlist = await addToWishlistService(req.user.userId, req.body.productId);
        res.status(200).json({
            success: true,
            message: "Added to wishlist",
            wishlist
        })
    };

    // remove from wishlist function
    async removeFromWishlistFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 400);
        const wishlist = await removeFromWishlistService(req.user.userId, req.body.productId);
        res.status(200).json({
            success: true,
            message: "Removed from wishlist successfully",
            wishlist
        })
    };

    // get wishlist function
    async getWishlistFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const wishlist = await getWishlistService(req.user.userId);
        res.status(200).json({
            success: true,
            length: wishlist.items.length,
            message: "fetched wishlist successfully",
            wishlist
        })
    };

};


export default new WishlistController;