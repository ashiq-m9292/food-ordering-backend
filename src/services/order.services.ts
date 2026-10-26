import mongoose from "mongoose";
import User from "../models/user.model";
import Restaurant from "../models/restaurant.model";
import Address from "../models/address.model";
import Product from "../models/product.model";
import Order from "../models/order.model";
import AppError from "../errors/AppError";

interface IAddress {
    addressId: string;
    street: string;
    houseNumber: string;
    village: string;
    pincode: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
    phone: string;
};

interface IProduct {
    productId: string;
    image: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    subTotal: number;
};


// create order service
export const createOrderService = async (
    userId: string,
    deliveryAddress: IAddress,
    products: IProduct[],
) => {
    // validate restaurant id address id product id
    // if (!mongoose.isValidObjectId(restaurantId)) throw new AppError("Invalid restaurant id", 400);
    if (!mongoose.isValidObjectId(deliveryAddress.addressId)) throw new AppError("Invalid delivery address id", 400);
    // if (!mongoose.isValidObjectId(products[0].productId)) throw new AppError("Invalid product id", 400);
    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 401);

    // check user address exist 
    const userAddress = await Address.findOne({ _id: deliveryAddress.addressId, userId });
    if (!userAddress) throw new AppError("User address not found", 400);

    // products array validation
    if (!products || products.length === 0) throw new AppError("Products not found", 400);

    // check product available in database using promise all
    const checkProducts = await Promise.all(products.map(async (product) => {
        const productInDb = await Product.findById(product.productId);
        if (!productInDb) throw new AppError("Product not found", 400);
        return productInDb;
    }));

    // selected size exist
    checkProducts.forEach((productInDb, index) => {
        const selectedSize = productInDb.sizes.find((size) => size.size === products[index].size);
        if (!selectedSize) throw new AppError("Size not found", 400);
    });

    // check quantity
    products.forEach((product) => {
        if (!Number.isInteger(product.quantity) || product.quantity < 1 || product.quantity > 10) throw new AppError("Quantity must be between 1 and 10", 400);
    });

    // check restaurant exist
    const restaurant = await Promise.all(checkProducts.map(async (productInDb) => {
        const restaurantInDb = await Restaurant.findById(productInDb.restaurantId);
        if (!restaurantInDb) throw new AppError("Restaurant not found", 400);
        return restaurantInDb;
    }));

    // price calculation
    const orderProducts = checkProducts.map((productInDb, index) => {
        const selectedSize = productInDb.sizes.find((size) => size.size === products[index].size);
        if (!selectedSize) throw new AppError("Size not found", 400);

        // unit price calculation
        const unitPrice = selectedSize.discountPrice > 0 ? selectedSize.discountPrice : selectedSize.price;
        const subTotal = unitPrice * products[index].quantity;

        return {
            productId: productInDb._id,
            image: productInDb.productImages[0].secure_url,
            name: productInDb.name,
            price: unitPrice,
            size: selectedSize.size,
            quantity: products[index].quantity,
            subTotal: subTotal,
        }
    })

};

// get all order service
export const getAllOrderService = async (userId: string) => {
    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 401);

    // find order
    const order = await Order.find({ userId });
    if (!order || order.length === 0) return [];
    // get order
    return order;
};


// delete order service
export const deleteOrderService = async (userId: string, orderId: string) => {
    // validate order id
    if (!mongoose.isValidObjectId(orderId)) throw new AppError("Invalid order id", 400);

    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 401);

    // check order exist
    const order = await Order.findOne({ userId, _id: orderId });
    if (!order) throw new AppError("Order not found", 404);

    // delete order
    await order.deleteOne();
    return order;
};