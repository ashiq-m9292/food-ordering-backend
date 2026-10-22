import { Router } from "express";
import OrderController from "../controllers/order.controller";
import { protect } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate";
import asyncHandler from "../middlewares/asyncHandler";
import {
    createOrderSchema,
    deleteOrderSchema
} from "../validator/order.validator";

const orderRoutes = Router();

// create order route
orderRoutes.post('/createorder',
    protect,
    validate(createOrderSchema, "body"),
    asyncHandler(OrderController.createOrderFun)
);

// get all order route
orderRoutes.get('/getallorder',
    protect,
    asyncHandler(OrderController.getAllOrderFun)
);

// delete order route
orderRoutes.delete('/deleteorder',
    protect,
    validate(deleteOrderSchema, "body"),
    asyncHandler(OrderController.deleteOrderFun)
);

export default orderRoutes;