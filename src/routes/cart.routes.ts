import { Router } from "express";
import CartController from "../controllers/cart.controller";
import { protect } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate";
import asyncHandler from "../middlewares/asyncHandler";
import {
    addToCartSchema,
    getByCartIdSchema,
    increaseDecreaseQuantitySchema
} from "../validator/cart.validator";

const cartRoutes = Router();

// add to cart route
cartRoutes.post('/addtocart',
    protect,
    validate(addToCartSchema, "body"),
    asyncHandler(CartController.addToCartFun)
);

// remove from cart route
cartRoutes.delete('/removefromcart',
    protect,
    validate(getByCartIdSchema, "body"),
    asyncHandler(CartController.removeFromCartFun)
);

// get cart route
cartRoutes.get('/getallcart',
    protect,
    asyncHandler(CartController.getCartFun)
);

// increase decrease quantity route
cartRoutes.put('/increasedecreasequantity',
    protect,
    validate(increaseDecreaseQuantitySchema, "body"),
    asyncHandler(CartController.increaseDecreaseQuantityFun)
);


export default cartRoutes;