import mongoose from "mongoose";
import User from "../models/user.model";
import Restaurant from "../models/restaurant.model";
import AppError from "../errors/AppError";
import uploadToCloudinary from "../utills/uploadToCloudinary";
import { v2 as cloudinary } from 'cloudinary';



interface IRestaurant {
    name: string;
    email: string;
    description: string;
    address: string;
    phone: string;
    openingTime: string;
    closingTime: string;
    deliveryFee: number;
    freeDeliveryAbove: number;
    isOpen: boolean;
    isActive: boolean;
    location: {
        latitude: number;
        longitude: number;
    };
    deliveryRadiusKm: number;
};

// create restaurant service
export const createRestaurantService = async (
    data: IRestaurant,
    file?: Express.Multer.File
) => {

    // check restaurant
    const existingRestaurant = await Restaurant.findOne();
    if (existingRestaurant) throw new AppError("Already Exist Restaurant", 400)

    // image upload
    if (!file) throw new AppError("Please provided image", 400)
    const result = await uploadToCloudinary(file.buffer, "Restaurant_Image");
    const image = {
        secure_url: result.secure_url,
        public_id: result.public_id
    };

    // create restaurant
    const restaurant = await Restaurant.create({
        ...data,
        restaurantImage: image,
    });
    return restaurant;
};

// update restaurant service
export const updateRestaurantService = async (
    reetaurantId: string,
    data: IRestaurant,
    file?: Express.Multer.File
) => {
    // validate restaurant id
    if (!mongoose.isObjectIdOrHexString(reetaurantId)) throw new AppError("Invalid restaurant Id", 400);
    // find restaurant id
    const restaurant = await Restaurant.findById(reetaurantId);
    if (!restaurant) throw new AppError("No Restaurants", 400)

    // update field
    // update body field
    if (data.name !== undefined) restaurant.name = data.name;
    if (data.description !== undefined) restaurant.description = data.description;
    if (data.address !== undefined) restaurant.address = data.address;
    if (data.phone !== undefined) restaurant.phone = data.phone;
    if (data.openingTime !== undefined) restaurant.openingTime = data.openingTime;
    if (data.closingTime !== undefined) restaurant.closingTime = data.closingTime;
    if (data.deliveryFee !== undefined) restaurant.deliveryFee = data.deliveryFee;
    if (data.freeDeliveryAbove !== undefined) restaurant.freeDeliveryAbove = data.freeDeliveryAbove;
    if (data.isOpen !== undefined) restaurant.isOpen = data.isOpen;
    if (data.isActive !== undefined) restaurant.isActive = data.isActive;
    if (data.location !== undefined) restaurant.location = data.location;
    if (data.deliveryRadiusKm !== undefined) restaurant.deliveryRadiusKm = data.deliveryRadiusKm;

    // image upload
    if (file) {
        if (restaurant.restaurantImage?.public_id) {
            await cloudinary.uploader.destroy(restaurant.restaurantImage.public_id);
        }
        const result = await uploadToCloudinary(file.buffer, "Restaurant_Images");
        restaurant.restaurantImage = {
            secure_url: result.secure_url,
            public_id: result.public_id
        };
    };
    // update restaurant
    await restaurant.save();
    return restaurant;
};

// get all restaurant service
export const getAllRestaurantService = async () => {
    const restaurant = await Restaurant.find();
    if (!restaurant || restaurant.length === 0) return [];
    return restaurant;
};

// get single restaurant service
export const getSingleRestaurantService = async (restaurantId: string) => {
    // validate restaurant id
    if (!mongoose.isObjectIdOrHexString(restaurantId)) throw new AppError("Invalid restaurant Id", 400);

    // find restaurant
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) throw new AppError("Restaurant not found", 404);
    return restaurant;
};

// delete restaurant service
export const deleteRestaurantService = async (restaurantId: string) => {
    // validate restaurant id
    if (!mongoose.isObjectIdOrHexString(restaurantId)) throw new AppError("Invalid restaurant Id", 400);

    // check restaurant exist
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) throw new AppError("Restaurant not found", 404);

    // image delete
    if (restaurant.restaurantImage?.public_id) {
        await cloudinary.uploader.destroy(restaurant.restaurantImage.public_id);
    };

    // delete restaurant
    await restaurant.deleteOne();

    return restaurant;
};