import mongoose from "mongoose";
import User from "../models/user.model";
import Restaurant from "../models/restaurant.model";
import Address from "../models/address.model";
import Product from "../models/product.model";
import Order from "../models/order.model";
import AppError from "../errors/AppError";


// create order service
export const createOrderService = async () => {

};

// get all order service
export const getAllOrderService = async (userId: string) => {
    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 400);

    // find order
    const order = await Order.find({ userId });
    if (!order || order.length === 0) {
        return [];
    };
    // get order
    return order;
};


// delete order service
export const deleteOrderService = async (userId: string, orderId: string) => {
    // validate order id
    if (!mongoose.isValidObjectId(orderId)) throw new AppError("Invalid order id", 400);

    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 400);

    // check order exist
    const order = await Order.findOne({ userId, _id: orderId });
    if (!order) throw new AppError("Order not found", 404);

    // delete order
    await order.deleteOne();
    return order;
};