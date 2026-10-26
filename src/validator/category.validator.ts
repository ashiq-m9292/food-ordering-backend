import { z } from "zod";

// create category schema
export const createCategorySchema = z.object({
    name: z.string().min(1, "Min one character")
});

// update category schema
export const updateCategorySchema = z.object({
    name: z.string().min(1, "Min one character").optional(),
});
// category by id schema
export const categoryByIdSchema = z.object({
    id: z.string().min(1, "Min one character")
});

