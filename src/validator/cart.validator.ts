import { z } from "zod";

// add to cart validator
export const addToCartSchema = z.object({
    size: z.string().min(1, "Size required"),
    quantity: z.coerce.number().min(1, "Quantity required")
});

// remove from cart validator
export const getByCartIdSchema = z.object({
    productId: z.string().min(1, "Product Id required")
});


// update cart item quantity validator
export const updateCartItemQuantitySchema = z.object({
    quantity: z.coerce.number().min(1, "Quantity required")
});

