import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import {
    createProductService,
    getAllProductService,
    getSingleProductService,
    updateProductService,
    deleteProductService
} from "../services/product.services";


class ProductController {

    // create product function
    async createProductFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const { categoryId, name, description, sizes, foodType } = req.body;
        const files = req.files as Express.Multer.File[];
        const product = await createProductService(
            req.user.userId,
            categoryId,
            name,
            description,
            sizes,
            foodType,
            files
        );
        res.status(200).json({
            success: true,
            message: "Product Created Successfully",
            product
        })
    };

    // update product function
    async updateProductFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const { categoryId, name, description, sizes, foodType } = req.body;
        const files = req.files as Express.Multer.File[];
        const product = await updateProductService(
            req.user.userId,
            categoryId,
            req.params.id as string,
            name,
            description,
            sizes,
            foodType,
            files
        );
        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            product
        })
    };

    // delete product function
    async deleteProductFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        await deleteProductService(req.user.userId, req.params.id as string);
        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
        })
    };

    // get all product function
    async getAllProductFun(req: Request, res: Response, next: NextFunction) {
        const product = await getAllProductService();

        res.status(200).json({
            success: true,
            message: "fetched products list",
            length: product.length,
            products: product
        })
    };

    // get single product function
    async getSingleProductFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const product = await getSingleProductService(req.user.userId);
        res.status(200).json({
            success: true,
            message: "fetched single restaurant products",
            length: product.length,
            products: product
        })
    };

};

export default new ProductController;