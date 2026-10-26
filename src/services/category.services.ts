import mongoose from "mongoose";
import User from "../models/user.model";
import Category from "../models/category.model";
import AppError from "../errors/AppError";
import uploadToCloudinary from "../utills/uploadToCloudinary";
import { v2 as cloudinary } from 'cloudinary';


// create category service
export const createCategoryService = async (userId: string, name: string, file?: Express.Multer.File) => {
    // check user exist
    const user = await User.findById(userId).select("-password");
    if (!user) throw new AppError("User not found", 404);

    // check restaurant exist
    if (!user.restaurantId) throw new AppError("Restaurant not found", 404)

    // image upload 
    if (!file) throw new AppError("Please provided image", 404);
    const result = await uploadToCloudinary(file.buffer, "Restaurant_Categories");
    const image = {
        secure_url: result.secure_url,
        public_id: result.public_id
    };

    // create restaurant category
    const restaurantCategory = await Category.create({
        restaurantId: user.restaurantId.toString(),
        name: name.trim(),
        categoryImage: image
    })

    return restaurantCategory;
};

// update category service
export const updateCategoryService = async (userId: string, categoryId: string, name: string, file?: Express.Multer.File) => {
    // validate category id
    if (!mongoose.isValidObjectId(categoryId)) throw new AppError("Invalid category id", 400);

    // check user exist
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    };

    // check restaurant exist
    if (!user.restaurantId) throw new AppError("Restaurant not found", 404);

    // check restaurant category exist
    const restaurantCategory = await Category.findOne({ restaurantId: user.restaurantId, _id: categoryId });
    if (!restaurantCategory) throw new AppError("Restaurant category not found", 404);

    // update restaurant category and image
    if (name !== undefined) restaurantCategory.name = name.trim();
    if (file) {
        if (restaurantCategory.categoryImage?.public_id) {
            await cloudinary.uploader.destroy(restaurantCategory.categoryImage.public_id);
        }
        const result = await uploadToCloudinary(file.buffer, "Restaurant_Categories");
        restaurantCategory.categoryImage = {
            secure_url: result.secure_url,
            public_id: result.public_id
        };
    };
    // update restaurant category
    await restaurantCategory.save();
    return restaurantCategory;
};

// delete category service
export const deleteCategoryService = async (userId: string, categoryId: string) => {
    // validate category id 
    if (!mongoose.isValidObjectId(categoryId)) throw new AppError("Invalid category id", 400);

    // check user exist
    const user = await User.findById(userId).select("-password");
    if (!user) throw new AppError("User not found", 404);

    // check restaurant exist
    if (!user.restaurantId) throw new AppError("Restaurant not found", 404);

    // check restaurant category exist
    const restaurantCategory = await Category.findOne({ restaurantId: user.restaurantId, _id: categoryId });
    if (!restaurantCategory) throw new AppError("Restaurant category not found", 404);

    // dellete categori image
    if (restaurantCategory.categoryImage?.public_id) {
        await cloudinary.uploader.destroy(restaurantCategory.categoryImage.public_id);
    };

    // delete restaurant categor
    await restaurantCategory.deleteOne();

    return restaurantCategory;
};

// get single restaurant category service
export const getSingleRestaurantCategoryService = async (userId: string) => {
    // check user exist
    const user = await User.findById(userId).select("-password");
    if (!user) throw new AppError("User not found", 404);

    // check restaurant exist
    if (!user.restaurantId) throw new AppError("Restaurant not found", 404);

    // get all single restaurant categori
    const restaurantCategory = await Category.find({ restaurantId: user.restaurantId });
    if (!restaurantCategory || restaurantCategory.length === 0) return [];
    return restaurantCategory;
};
