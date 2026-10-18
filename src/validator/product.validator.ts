import { z } from "zod";

// create sizes schema
export const createSizesSchema = z.object({
    size: z.string().trim().min(1, "Min one character"),
    price: z.coerce.number().min(0, "Price can't be negative"),
    discountPrice: z.coerce.number().min(0, "Discount price can't be negative"),
    stockQuantity: z.coerce.number().int().min(1, "Min one quantity"),
    trackInventory: z.boolean().optional(),
    isAvailable: z.boolean().optional()
});

// create product schema
export const createUpdateProductSchema = z.object({
    categoryId: z.string().min(1, "Min one character"),
    name: z.string().trim().min(1, "Min one character"),
    description: z.string().trim().min(1, "Min one character"),
    sizes: z.array(createSizesSchema).min(1, "Min one size"),
    foodType: z.enum(["veg", "nonVeg", "egg"])
});

// product by id schema
export const productByIdSchema = z.object({
    id: z.string().min(1, "Min one character")
});