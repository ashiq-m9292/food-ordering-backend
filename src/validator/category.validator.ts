import { z } from "zod";

// create category schema

export const createUpdateCategorySchema = z.object({
    name: z.string().min(1, "Min one character")
});

// category by id schema
export const categoryByIdSchema = z.object({
    id: z.string().min(1, "Min one character")
});

