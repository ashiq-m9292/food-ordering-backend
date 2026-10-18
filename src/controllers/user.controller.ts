import { Request, Response, NextFunction } from "express";
import {
    createUserService,
    findAllUserService,
    findAllRestaurantAdminService,
    loginUserService,
    getMeUserService,
    deleteUserService,
    findSingleUserService,
    createOrUpdatePicService,
    changePasswordService,
    createRestaurantAdminService
} from "../services/user.services";
import AppError from "../errors/AppError";

class UserController {
    // create user function
    async createUserFun(req: Request, res: Response, next: NextFunction) {
        const { name, email, password } = req.body;

        const user = await createUserService(name, email, password);

        res.status(200).json({
            success: true,
            message: "User Created Successfully",
            user
        })

    };

    // login user function
    async loginUserFun(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        const user = await loginUserService(email, password);

        // save token in cookies
        res.cookie("token", user.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.status(200).json({
            success: true,
            message: "Login User Successfully",
            user
        })

    };

    // find all users
    async allUserFun(req: Request, res: Response, next: NextFunction) {
        const users = await findAllUserService();
        res.status(200).json({
            success: true,
            message: "User fetched Successfully",
            userLength: users.length,
            users
        })
    };


    // find single user
    async singleUserFun(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const user = await findSingleUserService(id as string);
        res.status(200).json({
            success: true,
            message: "User Found success",
            user
        })
    };

    // find all restaurant admin
    async allRestaurantAdminFun(req: Request, res: Response, next: NextFunction) {
        const restaurantAdmin = await findAllRestaurantAdminService();
        res.status(200).json({
            success: true,
            message: "Restaurant Admin found",
            length: restaurantAdmin.length,
            restaurantAdmin
        })
    };

    // me profile api
    async getMe(req: Request, res: Response, next: NextFunction) {
        if (!req.user) {
            throw new AppError("Authentication Required", 401);
        };
        const user = await getMeUserService(req.user.userId);
        res.status(200).json({
            success: true,
            message: "You Are Logged In",
            user
        })
    };

    // delete user
    async deleteUserFun(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        await deleteUserService(id as string)
        res.status(200).json({
            success: true,
            message: "User deleted Successfully"
        })
    };

    async profilePicFun(req: Request, res: Response, next: NextFunction) {
        const user = req.user.userId;
        const file = req.file;
        const updatedUser = await createOrUpdatePicService(user, file);
        // save image
        await updatedUser.save();
        res.status(200).json({
            success: true,
            message: "Profile Picture Updated Successfully",
            user: updatedUser
        })
    };

    // forgot password
    async changePassword(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("Authentication Required", 401);
        const { password, newPassword } = req.body;

        const user = await changePasswordService(req.user.userId, password, newPassword);
        // save password
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password Reset Successfully",
            user
        })
    };

    // create restaurant admin
    async createRestaurantAdmin(req: Request, res: Response, next: NextFunction) {
        const { name, email, password, restaurantId } = req.body;
        const restaurantAdmin = await createRestaurantAdminService(name, email, password, restaurantId);
        res.status(200).json({
            success: true,
            message: "Restaurant Admin Created Successfully",
            restaurantAdmin
        })
    };

};

export default new UserController;