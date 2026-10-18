import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import authorize from "../middlewares/authorize";
import validate from "../middlewares/validate";
import asyncHandler from "../middlewares/asyncHandler";
import CategoryController from "../controllers/category.controller";
import upload from "../middlewares/multer";
import {
    createUpdateCategorySchema,
    categoryByIdSchema
} from "../validator/category.validator";

const categoryRoutes = Router();

// create category route
categoryRoutes.post('/createcategory',
    protect,
    authorize("restaurantAdmin"),
    upload.single('image'),
    validate(createUpdateCategorySchema, "body"),
    asyncHandler(CategoryController.createCategoryFun)
);

// update category route
categoryRoutes.put('/updatecategory/:id',
    protect,
    authorize("restaurantAdmin"),
    upload.single('image'),
    validate(createUpdateCategorySchema.partial(), "body"),
    asyncHandler(CategoryController.updateCategoryFun)
);

// delete category route
categoryRoutes.delete('/deletecategory/:id',
    protect,
    authorize("restaurantAdmin"),
    validate(categoryByIdSchema, "params"),
    asyncHandler(CategoryController.deleteCategoryFun)
);

// get all category route
categoryRoutes.get('/getallcategory',
    asyncHandler(CategoryController.getAllRestaurantCategoryFun)
);

// get all single category route
categoryRoutes.get('/getallsinglerestaurantcategori',
    protect,
    authorize("restaurantAdmin"),
    asyncHandler(CategoryController.getAllSingleRestaurantCategoryFun)
);

// get single categori route
categoryRoutes.get('/getallsinglecategori/:id',
    protect,
    authorize("superAdmin"),
    validate(categoryByIdSchema, "params"),
    asyncHandler(CategoryController.getSingleRestaurantCategoryFun)
);


export default categoryRoutes;