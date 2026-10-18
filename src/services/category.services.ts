import User from "../models/user.model";
import Category from "../models/category.model";
import AppError from "../errors/AppError";
import uploadToCloudinary from "../utills/uploadToCloudinary";
import { v2 as cloudinary } from 'cloudinary';


// create category service
export const createCategoryService = async (userId: string, name: string, file?: Express.Multer.File) => {
    // check user exist
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    };

    // check restaurant exist
    if (!user.restaurantId) throw new AppError("Restaurant not found", 404);

    // image upload 
    if (!file) throw new AppError("Please provided image", 401);
    const result = await uploadToCloudinary(file.buffer, "Restaurant_Categories");
    const image = {
        secure_url: result.secure_url,
        public_id: result.public_id
    };

    // create restaurant category
    const restaurantCategory = await Category.create({
        restaurantId: user.restaurantId,
        name: name.trim(),
        categoryImage: image
    })

    return restaurantCategory;
};

// update category service
export const updateCategoryService = async (userId: string, id: string, name: string, file?: Express.Multer.File) => {
    // check user exist
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    };

    // check restaurant exist
    if (!user.restaurantId) throw new AppError("Restaurant not found", 404);

    // check restaurant category exist
    const restaurantCategory = await Category.findOne({ restaurantId: user.restaurantId, _id: id });
    if (!restaurantCategory) throw new AppError("Restaurant category not found", 404);

    // update restaurant category and image
    if (name !== undefined) restaurantCategory.name = name.trim();
    if (file) {
        if (restaurantCategory.categoryImage.public_id) {
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
export const deleteCategoryService = async (userId: string, id: string) => {
    // check user exist
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    };
    const category = await Category.findOne({ restaurantId: user.restaurantId, _id: id });
    if (!category) {
        throw new AppError("Restaurant categori not found", 404);
    };

    // dellete categori image
    if (category.categoryImage.public_id) {
        await cloudinary.uploader.destroy(category.categoryImage.public_id);
    };

    // delete restaurant category
    const restaurantCategory = await Category.findOneAndDelete({ restaurantId: user.restaurantId, _id: id });
    return restaurantCategory;
};

// get all restaurant category service
export const getAllRestaurantCategoryService = async () => {
    const restaurantCategory = await Category.find();
    return restaurantCategory;
};

// get all single restaurant category service
export const getAllSingleRestaurantCategoryService = async (userId: string) => {
    // check user exist
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    };

    // check restaurant exist
    if (!user.restaurantId) {
        throw new AppError("Restaurant not found", 404);
    };

    // get all single restaurant categori
    const restaurantCategory = await Category.find({ restaurantId: user.restaurantId });
    return restaurantCategory;
};


// get single restaurant category service
export const getSingleRestaurantCategoryService = async (userId: string, id: string) => {
    // check user exist
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    };

    // find one restaurant all categori
    const restaurantCategory = await Category.find({ restaurantId: id });
    if (!restaurantCategory) {
        throw new AppError("Restaurant category not found", 404);
    };

    return restaurantCategory;
};
