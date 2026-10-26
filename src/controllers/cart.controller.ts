import { Request, Response, NextFunction } from 'express';
import {
    addToCartService,
    getCartService,
    removeFromCartService,
    updateCartItemQuantityService
} from "../services/cart.services";
import AppError from "../errors/AppError";

class CartController {

    // add to cart function
    async addToCartFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const cart = await addToCartService(req.user.userId, req.params.productId as string, req.body.size, req.body.quantity);

        res.status(200).json({
            success: true,
            message: "Added to cart",
            cart
        })
    };

    // remove from cart function
    async removeFromCartFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 400);
        await removeFromCartService(req.user.userId, req.params.productId as string);
        res.status(201).json({
            success: true,
            message: "Removed from cart successfully"
        })
    };

    // get cart function
    async getCartFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 404);
        const cart = await getCartService(req.user.userId);
        res.status(201).json({
            success: true,
            length: cart.length,
            message: "fetched Cart successfully",
            cart
        })
    };

    // update cart item quantity function
    async updateCartItemQuantityFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 404);
        const cart = await updateCartItemQuantityService(req.user.userId, req.params.productId as string, req.body.quantity);
        res.status(201).json({
            success: true,
            message: "Updated cart item quantity successfully",
            cart
        })
    };

};

export default new CartController;