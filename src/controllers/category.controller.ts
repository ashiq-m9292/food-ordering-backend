import { Request, Response, NextFunction } from "express";
import {
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
    getSingleRestaurantCategoryService
} from "../services/category.services";
import AppError from "../errors/AppError";

class CategoryController {

    // create category function
    async createCategoryFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const category = await createCategoryService(req.user.userId, req.body.name, req.file);

        res.status(200).json({
            success: true,
            message: "Categori Created Successfully",
            category
        })
    };

    // update category function
    async updateCategoryFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);

        const category = await updateCategoryService(req.user.userId, req.params.id as string, req.body.name, req.file);

        res.status(201).json({
            success: true,
            message: "Categori Updated Successfully",
            category
        })
    };

    // delete category function
    async deleteCategoryFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 404);
        await deleteCategoryService(req.user.userId, req.params.id as string);

        res.status(200).json({
            success: true,
            message: "Categori Deleted Successfully"
        })
    };

    // get single restaurant category function
    async getSingleRestaurantCategoryFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 404);
        const restaurantCategory = await getSingleRestaurantCategoryService(req.user.userId);
        res.status(201).json({
            success: true,
            message: "fetched single restaurant categori",
            length: restaurantCategory.length,
            restaurantCategory
        })
    };

};

export default new CategoryController;