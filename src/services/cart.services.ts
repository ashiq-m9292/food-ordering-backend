import mongoose from "mongoose";
import User from "../models/user.model";
import Product from "../models/product.model";
import Cart from "../models/cart.model";
import Restaurant from "../models/restaurant.model";
import AppError from "../errors/AppError";


export const addToCartService = async (userId: string, productId: string, size: string, quantity: number) => {
    // product id validation
    if (!mongoose.isValidObjectId(productId)) throw new AppError("Invalid product id", 400);

    // check user exist
    const user = await User.findById(userId).select("-password");
    if (!user) throw new AppError("User not found", 401);

    // product exist 
    const product = await Product.findById(productId);
    if (!product) throw new AppError("Product not found", 404);

    // restaurant exist
    const restaurant = await Restaurant.findById(product.restaurantId);
    if (!restaurant) throw new AppError("Restaurant not found", 404);

    // selected size exist
    const selectedSize = product.sizes.find((item) => item.size === size);
    if (!selectedSize) throw new AppError("Size not found", 404);

    // quantity validation
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) throw new AppError("Quantity must be between 1 and 10", 400);

    // product stock quantity
    if (selectedSize.stockQuantity < quantity) throw new AppError("Quantity greater than stock quantity", 400);

    // check cart exist
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        // create new cart
        const newCart = await Cart.create({
            userId,
            items: [
                {
                    productId: product._id,
                    restaurantId: restaurant._id,
                    size: selectedSize.size,
                    quantity
                }
            ]
        });
        return newCart;
    };

    // check item exist
    const item = cart.items.find((item) => item.productId.toString() === productId.toString() && item.size === size);
    if (item) throw new AppError("Item already exist", 401);

    // add item to cart
    cart.items.push({
        productId: product._id,
        restaurantId: restaurant._id,
        size: selectedSize.size,
        quantity
    });
    // update cart
    await cart.save();
    return cart;

};

// remove from cart service
export const removeFromCartService = async (userId: string, productId: string) => {
    // validate user id
    if (!mongoose.isValidObjectId(productId)) throw new AppError("Invalid product id", 400);

    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 400);

    // check cart exist
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) throw new AppError("Cart not found", 404);

    // check item exist
    const item = cart.items.find((item) => item.productId.toString() === productId.toString());
    if (!item) throw new AppError("Item not found", 404);

    // remove item from cart
    cart.items = cart.items.filter((item) => item.productId.toString() !== productId.toString());

    // update cart
    await cart.save();
    return cart;
};

// get cart service
export const getCartService = async (userId: string) => {
    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 400);

    // find cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
        return {
            success: true,
            message: "Cart is empty",
            items: []
        }
    };
    // get cart
    return {
        success: true,
        message: "fetched cart",
        items: cart.items
    };
};

// increase decrease quantity service
export const increaseDecreaseQuantityService = async (userId: string, productId: string, quantity: number) => {
    // validate user id
    if (!mongoose.isValidObjectId(productId)) throw new AppError("Invalid product id", 400);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) throw new AppError("Quantity must be between 1 and 10", 400);

    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 400);

    // check cart exist
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) throw new AppError("Cart not found", 400);

    // check item exist
    const item = cart.items.find((item) => item.productId.toString() === productId.toString());
    if (!item) throw new AppError("Item not found", 400);

    // update item quantity
    item.quantity = quantity;
    // update cart
    await cart.save();
    return cart;

};