import { Request, Response, NextFunction } from "express";
import {
    createCategoryService,
    getAllRestaurantCategoryService,
    getSingleRestaurantCategoryService,
    getAllSingleRestaurantCategoryService,
    updateCategoryService,
    deleteCategoryService
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

        res.status(200).json({
            success: true,
            message: "Categori Updated Successfully",
            category
        })
    };

    // delete category function
    async deleteCategoryFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const { id } = req.params;
        if (!id) throw new AppError("ID is required", 401);
        const category = await deleteCategoryService(req.user.userId, id as string);

        res.status(200).json({
            success: true,
            message: "Categori Deleted Successfully"
        })
    };

    // get all restaurant category function
    async getAllRestaurantCategoryFun(req: Request, res: Response, next: NextFunction) {
        const restaurantCategory = await getAllRestaurantCategoryService();

        res.status(200).json({
            success: true,
            message: "fetched restaurant categories",
            length: restaurantCategory.length,
            restaurantCategory
        })
    };

    // get all single restaurant category function
    async getAllSingleRestaurantCategoryFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const restaurantCategory = await getAllSingleRestaurantCategoryService(req.user.userId);

        res.status(200).json({
            success: true,
            message: "fetched single restaurant categories",
            length: restaurantCategory.length,
            restaurantCategory
        })
    };

    // get single restaurant category function
    async getSingleRestaurantCategoryFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const restaurantCategory = await getSingleRestaurantCategoryService(req.user.userId, req.params.id as string);

        res.status(200).json({
            success: true,
            message: "fetched single restaurant categori",
            length: restaurantCategory.length,
            restaurantCategory
        })
    };

};

export default new CategoryController;