import { Router } from "express";
import UserController from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware"
import authorize from "../middlewares/authorize";
import asyncHandler from "../middlewares/asyncHandler";
import upload from "../middlewares/multer";
import {
    createUserSchema,
    loginUserSchema,
    userIdSchema,
    changePasswordSchema,
    createRestaurantAdminSchema
} from "../validator/user.validator"
import validate from "../middlewares/validate";

const userRoutes = Router();


// me api
userRoutes.get('/me', protect, asyncHandler(UserController.getMe))

// create user route
userRoutes.post('/createuser', validate(createUserSchema, "body"), asyncHandler(UserController.createUserFun))

// login user route
userRoutes.post('/loginuser', validate(loginUserSchema, "body"), asyncHandler(UserController.loginUserFun))

// find all restaurant admin
userRoutes.get('/getallrestaurantadmin', protect, authorize("superAdmin"), asyncHandler(UserController.allRestaurantAdminFun))

// find all users
userRoutes.get('/getalluser', protect, authorize("superAdmin", "restaurantAdmin"), asyncHandler(UserController.allUserFun))

// find single user
userRoutes.get('/getsingleuser/:id', protect, authorize("superAdmin", "restaurantAdmin"), validate(userIdSchema, "params"), asyncHandler(UserController.singleUserFun))

// user deleled route 
userRoutes.delete('/deleteuser/:id', protect, validate(userIdSchema, "params"), validate(userIdSchema, "params"), asyncHandler(UserController.deleteUserFun))

// update profile pic
userRoutes.post('/updateprofilepic/:id', protect, upload.single('image'), validate(userIdSchema, "params"), asyncHandler(UserController.profilePicFun))

// change password
userRoutes.put('/changepassword/:id', protect, validate(changePasswordSchema, "body"), asyncHandler(UserController.changePassword))

// create restaurant admin
userRoutes.post('/createrestaurantadmin', protect, authorize("superAdmin"), validate(createRestaurantAdminSchema, "body"), asyncHandler(UserController.createRestaurantAdmin))

export default userRoutes;