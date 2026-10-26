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

    // me profile api
    async getMe(req: Request, res: Response, next: NextFunction) {
        if (!req.user) {
            throw new AppError("Authentication Required", 404);
        };
        const user = await getMeUserService(req.user.userId);
        res.status(201).json({
            success: true,
            message: "You Are Logged In",
            user
        })
    };

    // create user function
    async createUserFun(req: Request, res: Response, next: NextFunction) {
        const { name, email, password } = req.body;
        const user = await createUserService(name, email, password);

        res.status(200).json({
            success: true,
            message: "User Created Successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })

    };

    // login user function
    async loginUserFun(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        const result = await loginUserService(email, password);

        // save token in cookies
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.status(201).json({
            success: true,
            message: "Login User Successfully",
            user: {
                _id: result.user._id,
                name: result.user.name,
                email: result.user.email,
                role: result.user.role,
            }
        });

    };

    // find all users
    async allUserFun(req: Request, res: Response, next: NextFunction) {
        const users = await findAllUserService();
        res.status(201).json({
            success: true,
            message: "User fetched Successfully",
            userLength: users.length,
            users
        })
    };


    // find single user
    async singleUserFun(req: Request, res: Response, next: NextFunction) {
        const user = await findSingleUserService(req.params.id as string);
        res.status(201).json({
            success: true,
            message: "User Fetched Successfully",
            user
        })
    };

    // find all restaurant admin
    async allRestaurantAdminFun(req: Request, res: Response, next: NextFunction) {
        const restaurantAdmin = await findAllRestaurantAdminService();
        res.status(201).json({
            success: true,
            message: "Restaurant Admin found",
            length: restaurantAdmin.length,
            restaurantAdmin
        })
    };

    // delete user
    async deleteUserFun(req: Request, res: Response, next: NextFunction) {
        await deleteUserService(req.params.id as string)
        res.status(201).json({
            success: true,
            message: "User deleted Successfully"
        })
    };

    // update profile pic
    async profilePicFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("Authentication Required", 404);
        const file = req.file;
        const user = await createOrUpdatePicService(req.params.id as string, file);
        res.status(201).json({
            success: true,
            message: "Profile Picture Updated Successfully",
            user
        })
    };

    // forgot password
    async changePassword(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("Authentication Required", 401);
        const { password, newPassword } = req.body;

        const user = await changePasswordService(req.params.id as string, password, newPassword);
        res.status(201).json({
            success: true,
            message: "Password Updated Successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    };

    // create restaurant admin
    async createRestaurantAdmin(req: Request, res: Response, next: NextFunction) {
        const { name, email, password, restaurantId } = req.body;
        const restaurantAdmin = (await createRestaurantAdminService(name, email, password, restaurantId));
        res.status(200).json({
            success: true,
            message: "Restaurant Admin Created Successfully",
            restaurantAdmin: {
                _id: restaurantAdmin._id,
                name: restaurantAdmin.name,
                email: restaurantAdmin.email,
                role: restaurantAdmin.role,
            }
        })
    };

};

export default new UserController;