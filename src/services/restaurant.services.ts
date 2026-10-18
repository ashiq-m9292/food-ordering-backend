import Restaurant from "../models/restaurant.model";
import AppError from "../errors/AppError";
import uploadToCloudinary from "../utills/uploadToCloudinary";
import { v2 as cloudinary } from 'cloudinary';


// create restaurant service
export const createRestaurantService = async (
    name: string,
    email: string,
    description: string,
    address: string,
    phone: string,
    openingTime: string,
    closingTime: string,
    file?: Express.Multer.File
) => {

    // check restaurant
    const existingRestaurant = await Restaurant.findOne({ email });
    if (existingRestaurant) throw new AppError("Already Exist Restaurant", 400)

    // image upload
    if (!file) throw new AppError("Please provided image", 400)
    const result = await uploadToCloudinary(file.buffer, "Restaurant_Images");
    const image = {
        secure_url: result.secure_url,
        public_id: result.public_id
    };

    // create restaurant
    const restaurant = await Restaurant.create({
        name,
        email,
        description,
        address,
        phone,
        openingTime,
        closingTime,
        image: image
    });
    return restaurant;
};

// get all restaurant service
export const getAllRestaurantService = async () => {
    const restaurant = await Restaurant.find();
    if (restaurant.length === 0) throw new AppError("No Restaurants", 300)
    return restaurant;
};

// get single restaurant service
export const getSingleRestaurantService = async (id: string) => {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) throw new AppError("No Restaurants", 400)
    return restaurant;
};

// update restaurant service
export const updateRestaurantService = async (
    id: string,
    name: string,
    description: string,
    address: string,
    phone: string,
    openingTime: string,
    closingTime: string,
    deliveryFee: number,
    freeDeliveryAbove: number,
    isOpen: boolean,
    isActive: boolean,
    file?: Express.Multer.File
) => {
    // find restaurant id
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) throw new AppError("No Restaurants", 400)

    // update field
    // update body field
    if (name !== undefined) restaurant.name = name;
    if (description !== undefined) restaurant.description = description;
    if (address !== undefined) restaurant.address = address;
    if (phone !== undefined) restaurant.phone = phone;
    if (openingTime !== undefined) restaurant.openingTime = openingTime;
    if (closingTime !== undefined) restaurant.closingTime = closingTime;
    if (deliveryFee !== undefined) restaurant.deliveryFee = deliveryFee;
    if (freeDeliveryAbove !== undefined) restaurant.freeDeliveryAbove = freeDeliveryAbove;
    if (isOpen !== undefined) restaurant.isOpen = isOpen;
    if (isActive !== undefined) restaurant.isActive = isActive;

    // image upload
    if (file) {
        if (restaurant.image?.public_id) {
            await cloudinary.uploader.destroy(restaurant.image.public_id);
        }
        const result = await uploadToCloudinary(file.buffer, "Restaurant_Images");
        restaurant.image = {
            secure_url: result.secure_url,
            public_id: result.public_id
        };
    };
    return restaurant;
};

// delete restaurant service
export const deleteRestaurantService = async (id: string) => {
    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (!restaurant) throw new AppError("No Restaurants", 400)
    // image delete
    if (restaurant.image.public_id) {
        await cloudinary.uploader.destroy(restaurant.image.public_id)
    };
    return restaurant;
};