import User from "../models/user.model";
import Product from "../models/product.model";
import Category from "../models/category.model";
import uploadToCloudinary from "../utills/uploadToCloudinary";
import { v2 as cloudinary } from 'cloudinary';
import AppError from "../errors/AppError";

interface ISizes {
    size: string;
    price: number;
    discountPrice: number;
    stockQuantity: number;
    trackInventory: boolean;
    isAvailable: boolean;
};

// create product service
export const createProductService = async (
    userId: string,
    categoryId: string,
    name: string,
    description: string,
    sizes: ISizes[],
    foodType: string,
    files: Express.Multer.File[]
) => {
    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 400);

    // check restaurant exist
    if (!user.restaurantId) throw new AppError("Restaurant not found", 400);

    // check restaurant category exist
    const restaurantCategory = await Category.findOne({ restaurantId: user.restaurantId, _id: categoryId });
    if (!restaurantCategory) throw new AppError("Restaurant categori not found", 400);

    if (!Array.isArray(sizes) || sizes.length === 0) throw new AppError("Sizes is not valid", 400);

    // check file
    if (!files || files.length === 0) throw new AppError("Please provided image", 400);
    if (files.length > 5) throw new AppError("Max 5 images", 400);

    // image upload
    const uploadImages = await Promise.all(files.map(async (file) => {
        const result = await uploadToCloudinary(file.buffer, "Restaurant_Products_Images");
        return {
            secure_url: result.secure_url,
            public_id: result.public_id
        };
    }));

    // check duplicate product
    const existingProduct = await Product.findOne({ name, restaurantId: user.restaurantId });
    if (existingProduct) throw new AppError("Already Exist Product", 400);

    // create product
    const product = await Product.create({
        restaurantId: user.restaurantId,
        categoryId,
        name,
        description,
        sizes,
        foodType,
        productImages: uploadImages
    });
    return product;

};

// get all product service
export const getAllProductService = async () => {
    const product = await Product.find();
    if (product.length === 0) throw new AppError("No Products", 300)
    return product;
};

// get single restaurant product service
export const getSingleProductService = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 400)

    // check restaurant exist
    if (!user.restaurantId) throw new AppError("Restaurant not found", 400)

    // get all single restaurant product
    const product = await Product.find({ restaurantId: user.restaurantId });
    if (!product) throw new AppError("No Restaurants", 400)
    if (product.length === 0) throw new AppError("No Products", 300)
    return product;
};

// update product service
export const updateProductService = async (
    userId: string,
    categoryId: string,
    id: string,
    name: string,
    description: string,
    sizes: ISizes[],
    foodType: string,
    files: Express.Multer.File[]
) => {

    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 400);

    // check restaurant exist
    if (!user.restaurantId) throw new AppError("Restaurant not found", 400);

    // check restaurant category exist
    const restaurantCategori = await Category.findOne({ restaurantId: user.restaurantId, _id: categoryId });
    if (!restaurantCategori) throw new AppError("Restaurant categori not found", 400);

    // check product exist
    const product = await Product.findOne({ _id: id, restaurantId: user.restaurantId });
    if (!product) throw new AppError("Product not found", 400);

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (sizes !== undefined) product.sizes = sizes;
    if (foodType !== undefined) product.foodType = foodType;

    // image upload
    if (files && files.length > 0) {
        if (product.productImages.length > 0) {
            await Promise.all(product.productImages.map(async (image) => {
                await cloudinary.uploader.destroy(image.public_id);
            }));
        };
        const uploadImages = await Promise.all(files.map(async (file) => {
            const result = await uploadToCloudinary(file.buffer, "Restaurant_Products_Images");
            return {
                secure_url: result.secure_url,
                public_id: result.public_id
            };
        }));
        product.productImages = uploadImages;
    };

    // update product
    await product.save();
    return product;
};


// delete product service
export const deleteProductService = async (userId: string, id: string) => {
    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 400);

    // check restaurant exist
    if (!user.restaurantId) throw new AppError("Restaurant not found", 400);

    // check product exist
    const product = await Product.findOne({ _id: id, restaurantId: user.restaurantId });
    if (!product) throw new AppError("Product not found", 400);

    // delete product image
    if (product.productImages.length > 0) {
        await Promise.all(product.productImages.map(async (image) => {
            await cloudinary.uploader.destroy(image.public_id);
        }));
    };
    // delete product
    const productDelete = await Product.findOneAndDelete({ _id: id, restaurantId: user.restaurantId });
    return productDelete;

};