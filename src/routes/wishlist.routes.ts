import { Router } from "express";
import WishlistController from "../controllers/wishlist.controller";
import { protect } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate";
import asyncHandler from "../middlewares/asyncHandler";
import {
    addToWishlistSchema,
    getByWishlistIdSchema
} from "../validator/wishlist.validator";

const wishlistRoutes = Router();

// add to wishlist route
wishlistRoutes.post('/addtowishlist',
    protect,
    validate(addToWishlistSchema, "body"),
    asyncHandler(WishlistController.addToWishlistFun)
);

// remove from wishlist route
wishlistRoutes.delete('/removefromwishlist',
    protect,
    validate(getByWishlistIdSchema, "body"),
    asyncHandler(WishlistController.removeFromWishlistFun)
);

// get wishlist route
wishlistRoutes.get('/getallwishlist',
    protect,
    asyncHandler(WishlistController.getWishlistFun)
);

export default wishlistRoutes;