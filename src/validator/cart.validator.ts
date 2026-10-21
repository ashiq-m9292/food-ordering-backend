import { z } from "zod";

// add to cart validator
export const addToCartSchema = z.object({
    productId: z.string().min(1, "Product id required"),
    size: z.string().min(1, "Size required"),
    quantity: z.coerce.number().min(1, "Quantity required")
});

// remove from cart validator
export const getByCartIdSchema = z.object({
    productId: z.string().min(1, "Product id required")
});

// increase decrease quantity validator
export const increaseDecreaseQuantitySchema = z.object({
    productId: z.string().min(1, "Product id required"),
    quantity: z.coerce.number().min(1, "Quantity required")
});




