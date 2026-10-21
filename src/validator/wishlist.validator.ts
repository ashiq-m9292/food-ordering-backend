import { z } from "zod";

// add to wishlist validator
export const addToWishlistSchema = z.object({
    productId: z.string().min(1, "Product id required")
});

// remove from wishlist validator
export const getByWishlistIdSchema = z.object({
    productId: z.string().min(1, "Product id required")
});