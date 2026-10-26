import { Router } from "express";
import CartController from "../controllers/cart.controller";
import { protect } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate";
import asyncHandler from "../middlewares/asyncHandler";
import {
    addToCartSchema,
    getByCartIdSchema,
    updateCartItemQuantitySchema
} from "../validator/cart.validator";

const cartRoutes = Router();

// add to cart route
cartRoutes.post('/addtocart/:productId',
    protect,
    validate(getByCartIdSchema, "params"),
    validate(addToCartSchema, "body"),
    asyncHandler(CartController.addToCartFun)
);

// remove from cart route
cartRoutes.delete('/removefromcart/:productId',
    protect,
    validate(getByCartIdSchema, "params"),
    asyncHandler(CartController.removeFromCartFun)
);

// get cart route
cartRoutes.get('/getallcart',
    protect,
    asyncHandler(CartController.getCartFun)
);

cartRoutes.put('/updatequantity/:productId',
    protect,
    validate(getByCartIdSchema, "params"),
    validate(updateCartItemQuantitySchema, "body"),
    asyncHandler(CartController.updateCartItemQuantityFun)
);


export default cartRoutes;