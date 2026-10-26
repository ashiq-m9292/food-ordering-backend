import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Restaurant from "../models/restaurant.model";
import User from "../models/user.model";
import generateToken from "../utills/generateToken";
import AppError from "../errors/AppError";
import { v2 as cloudinary } from 'cloudinary';
import uploadToCloudinary from "../utills/uploadToCloudinary";


// get me user service
export const getMeUserService = async (userId: string) => {
    const user = await User.findById(userId).select("-password");
    if (!user) throw new AppError("User not Found", 404)
    return user;
};

// create user service
export const createUserService = async (name: string, email: string, password: string) => {
    // check user 
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new AppError("User already Exist", 409);

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create user with hash password
    const user = await User.create({
        name,
        email,
        password: hashPassword
    });

    return user;
};

// login user service
export const loginUserService = async (email: string, password: string) => {
    // check user 
    const user = await User.findOne({ email });
    if (!user) throw new AppError("User not Found", 404);

    // compare password
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw new AppError("Invalid password", 404);

    // generate jwt token
    const token = generateToken(user._id.toString(), user.role);

    return { user, token };
};

// find all user service
export const findAllUserService = async () => {
    const users = await User.find().select("-password");
    if (!users || users.length === 0) return [];
    return users
};

// find single user by id service
export const findSingleUserService = async (userId: string) => {
    // validate user id
    if (!mongoose.isObjectIdOrHexString(userId)) throw new AppError("Invalid user Id", 400);
    const user = await User.findById(userId).select("-password");
    if (!user) throw new AppError("User not Found", 404)
    return user;
};

// find all restaurant admin service
export const findAllRestaurantAdminService = async () => {
    const restaurantAdmin = await User.find({ role: "restaurantAdmin" }).select("-password");
    if (restaurantAdmin.length === 0) throw new AppError("No Restaurant Admin", 404)
    return restaurantAdmin;
};

// delete user service
export const deleteUserService = async (userId: string) => {
    // validate user id
    if (!mongoose.isObjectIdOrHexString(userId)) throw new AppError("Invalid user Id", 404);

    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not Found", 404)

    // image delete
    if (user.profilePic?.public_id) {
        await cloudinary.uploader.destroy(user.profilePic.public_id)
    };

    // delete user
    await user.deleteOne();

    return user;
};

// create or update profile pic service
export const createOrUpdatePicService = async (userId: string, file?: Express.Multer.File) => {
    // validate user id
    if (!mongoose.isObjectIdOrHexString(userId)) throw new AppError("Invalid user Id", 404);

    // check user exist
    const user = await User.findById(userId).select("-password");
    if (!user) throw new AppError("User not Found", 404)

    // image upload
    if (file) {
        if (user.profilePic?.public_id) {
            await cloudinary.uploader.destroy(user.profilePic.public_id);
        }
        const result = await uploadToCloudinary(file.buffer, "User_Profile_Pic");
        user.profilePic = {
            public_id: result.public_id,
            secure_url: result.secure_url
        };
    };
    // update user
    await user.save();
    return user;
};

// change password service
export const changePasswordService = async (userId: string, password: string, newPassword: string) => {
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not Found", 404)

    // compare password
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw new AppError("Invalid password", 404);

    // hash password
    const hashPassword = await bcrypt.hash(newPassword, 10);

    // update password
    user.password = hashPassword;
    // update user
    await user.save();
    return user;
};

// create restaurant admin service
export const createRestaurantAdminService = async (name: string, email: string, password: string, restaurantId: string) => {
    // check restaurant id
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) throw new AppError("Restaurant not Exist", 400);

    // check user 
    const existingUser = await User.findOne({ restaurantId: restaurant._id, role: "restaurantAdmin" });
    if (existingUser) throw new AppError("Restaurant already Exist", 401);

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create user with hash password
    const restaurantAdmin = await User.create({
        name,
        email,
        password: hashPassword,
        restaurantId: restaurant._id,
        role: "restaurantAdmin"
    });

    return restaurantAdmin;
};

