import mongoose from "mongoose";
import User from "../models/user.model";
import Product from "../models/product.model";
import Cart from "../models/cart.model";
import Restaurant from "../models/restaurant.model";
import AppError from "../errors/AppError";


export const addToCartService = async (userId: string, productId: string, size: string, quantity: number) => {
    // product id validation
    if (!mongoose.isObjectIdOrHexString(productId)) throw new AppError("Invalid product id", 404);

    // check user exist
    const user = await User.findById(userId).select("-password");
    if (!user) throw new AppError("User not found", 404);

    // check existing cart item exist
    const cartItem = await Cart.findOne({ productId, userId });
    if (cartItem) return cartItem;

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
    if (selectedSize.stockQuantity < quantity) throw new AppError("Quantity greater than stock quantity", 404);


    // create new cart item
    const newCartItem = await Cart.create({
        userId,
        productId,
        restaurantId: restaurant._id.toString(),
        size,
        quantity
    });

    return newCartItem;
};

// remove from cart service
export const removeFromCartService = async (userId: string, productId: string) => {
    // validate user id
    if (!mongoose.isObjectIdOrHexString(productId)) throw new AppError("Invalid product id", 404);

    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    // check item exist in cart
    const cartItem = await Cart.findOne({ userId, productId });
    if (!cartItem) throw new AppError("Item not found", 404);

    await cartItem.deleteOne();
    return cartItem;
};

// get cart service
export const getCartService = async (userId: string) => {
    // check user exist
    const user = await User.findById(userId).select("-password");
    if (!user) throw new AppError("User not found", 404);

    // find cart item
    const cartItems = await Cart.find({ userId });
    if (!cartItems || cartItems.length === 0) return [];
    return cartItems;
};

// update cart item quantity service
export const updateCartItemQuantityService = async (userId: string, productId: string, quantity: number) => {
    // product id validation
    if (!mongoose.isObjectIdOrHexString(productId)) throw new AppError("Invalid product id", 404);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) throw new AppError("Quantity must be between 1 and 10", 404);

    // check user exist
    const user = await User.findById(userId).select("-password");
    if (!user) throw new AppError("User not found", 404);

    // check existing cart item exist
    const cartItem = await Cart.findOne({ productId, userId });
    if (!cartItem) throw new AppError("Item not found", 404);

    // update cart item
    cartItem.quantity = quantity;
    await cartItem.save();
    return cartItem;
}