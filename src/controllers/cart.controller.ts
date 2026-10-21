import { Request, Response, NextFunction } from 'express';
import {
    addToCartService,
    getCartService,
    removeFromCartService,
    increaseDecreaseQuantityService
} from "../services/cart.services";
import AppError from "../errors/AppError";

class CartController {

    // add to cart function
    async addToCartFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const cart = await addToCartService(req.user.userId, req.body.productId, req.body.size, req.body.quantity);

        res.status(200).json({
            success: true,
            message: "Added to cart",
            cart
        })
    };

    // remove from cart function
    async removeFromCartFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 400);
        const cart = await removeFromCartService(req.user.userId, req.body.productId);
        res.status(200).json({
            success: true,
            message: "Removed from cart successfully",
            cart
        })
    };

    // get cart function
    async getCartFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const cart = await getCartService(req.user.userId);
        res.status(200).json({
            success: true,
            length: cart.items.length,
            message: "fetched cart successfully",
            cart
        })
    };

    // increase decrease quantity function
    async increaseDecreaseQuantityFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const cart = await increaseDecreaseQuantityService(req.user.userId, req.body.productId, req.body.quantity);
        res.status(200).json({
            success: true,
            message: "Increased/decreased quantity successfully",
            cart
        })
    };

};

export default new CartController;