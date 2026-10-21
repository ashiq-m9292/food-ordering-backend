import mongoose from "mongoose";
import Wishlist from "../models/wishlist.model";
import User from "../models/user.model";
import Product from "../models/product.model";
import AppError from "../errors/AppError";


// add to wishlist service
export const addToWishlistService = async (userId: string, productId: string) => {
    // product id validation
    if (!mongoose.isValidObjectId(productId)) throw new AppError("Invalid product id", 400);

    // check user exist
    const user = await User.findById(userId).select("-password");
    if (!user) throw new AppError("User not found", 401);

    // product exist 
    const product = await Product.findById(productId);
    if (!product) throw new AppError("Product not found", 404);

    // check wishlist exist
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
        // create new wishlist
        const newWishlist = await Wishlist.create({
            userId,
            items: [
                {
                    productId: product._id
                }
            ]
        });
        return newWishlist;
    };

    // check item exist
    const item = wishlist.items.find((item) => item.productId.toString() === productId.toString());
    if (item) throw new AppError("Item already exist", 404);

    // add item to wishlist
    wishlist.items.push({
        productId: product._id
    });
    // update wishlist
    await wishlist.save();
    return wishlist;

};

// remove from wishlist service
export const removeFromWishlistService = async (userId: string, productId: string) => {
    // validate user id
    if (!mongoose.isValidObjectId(productId)) throw new AppError("Invalid product id", 400);

    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 400);

    // check wishlist exist
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist || wishlist.items.length === 0) throw new AppError("Wishlist not found", 404);

    // check item exist
    const item = wishlist.items.find((item) => item.productId.toString() === productId.toString());
    if (!item) throw new AppError("Item not found", 404);

    // remove item from wishlist
    wishlist.items = wishlist.items.filter((item) => item.productId.toString() !== productId.toString());

    // update wishlist
    await wishlist.save();
    return wishlist;
};

// get wishlist service
export const getWishlistService = async (userId: string) => {
    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 400);

    // find wishlist
    const wishlist = await Wishlist.findOne({ userId }).populate("items.productId");
    if (!wishlist || wishlist.items.length === 0) {
        return {
            success: true,
            message: "Wishlist is empty",
            items: []
        }
    };
    // get wishlist
    return {
        success: true,
        message: "fetched wishlist successfully",
        items: wishlist.items
    };
};