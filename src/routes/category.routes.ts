import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import authorize from "../middlewares/authorize";
import validate from "../middlewares/validate";
import asyncHandler from "../middlewares/asyncHandler";
import CategoryController from "../controllers/category.controller";
import upload from "../middlewares/multer";
import {
    createCategorySchema,
    updateCategorySchema,
    categoryByIdSchema
} from "../validator/category.validator";

const categoryRoutes = Router();

// create category route
categoryRoutes.post('/createcategory',
    protect,
    authorize("restaurantAdmin"),
    upload.single('image'),
    validate(createCategorySchema, "body"),
    asyncHandler(CategoryController.createCategoryFun)
);

// update category route
categoryRoutes.put('/updatecategory/:id',
    protect,
    authorize("restaurantAdmin"),
    validate(categoryByIdSchema, "params"),
    upload.single('image'),
    validate(updateCategorySchema, "body"),
    asyncHandler(CategoryController.updateCategoryFun)
);

// delete category route
categoryRoutes.delete('/deletecategory/:id',
    protect,
    authorize("restaurantAdmin"),
    validate(categoryByIdSchema, "params"),
    asyncHandler(CategoryController.deleteCategoryFun)
);

// get single category route
categoryRoutes.get('/getallcategory',
    protect,
    authorize("restaurantAdmin", "superAdmin"),
    asyncHandler(CategoryController.getSingleRestaurantCategoryFun)
);


export default categoryRoutes;