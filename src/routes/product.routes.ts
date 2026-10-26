import { Router } from "express";
import ProductController from "../controllers/product.controller";
import { protect } from "../middlewares/auth.middleware";
import authorize from "../middlewares/authorize";
import asyncHandler from "../middlewares/asyncHandler";
import validate from "../middlewares/validate";
import {
    createUpdateProductSchema,
    productByIdSchema
} from "../validator/product.validator";
import upload from "../middlewares/multer";

const productRoutes = Router();

// create product route
productRoutes.post('/createproduct',
    protect,
    authorize("restaurantAdmin"),
    upload.array("images", 5),
    validate(createUpdateProductSchema, "body"),
    asyncHandler(ProductController.createProductFun)
);

// update product route
productRoutes.put('/updateproduct/:id',
    protect,
    authorize("restaurantAdmin"),
    validate(productByIdSchema, "params"),
    upload.array("images", 5),
    validate(createUpdateProductSchema.partial(), "body"),
    asyncHandler(ProductController.updateProductFun)
);

// delete product route
productRoutes.delete('/deleteproduct/:id',
    protect,
    authorize("restaurantAdmin"),
    validate(productByIdSchema, "params"),
    asyncHandler(ProductController.deleteProductFun)
);

// get all product route
productRoutes.get('/getallproducts',
    asyncHandler(ProductController.getAllProductFun)
);

// get single product route
productRoutes.get('/getallsinglerestaurantproducts',
    protect,
    authorize("restaurantAdmin"),
    asyncHandler(ProductController.getSingleProductFun)
);


export default productRoutes;