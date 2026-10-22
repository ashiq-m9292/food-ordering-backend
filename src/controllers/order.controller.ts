import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import {
    createOrderService,
    getAllOrderService,
    deleteOrderService
} from "../services/order.services";

class OrderController {

    // create order function
    async createOrderFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const order = await createOrderService();
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            order
        })
    };


    // get all order function
    async getAllOrderFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const order = await getAllOrderService(req.user.userId);
        res.status(200).json({
            success: true,
            message: "fetched all orders",
            length: order.length,
            orders: order
        })
    };

    // delete order function
    async deleteOrderFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const order = await deleteOrderService(req.user.userId, req.body.orderId);
        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        })
    };

};


export default new OrderController;