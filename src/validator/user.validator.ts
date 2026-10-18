import { z } from "zod";

// create user validator
export const createUserSchema = z.object({
  name: z.string().min(4).max(20),
  email: z.email("Invalid email address"),
  password: z.string().min(4, "minimum required 4 character").max(10, "maximum 10 character")
});

// login user validator
export const loginUserSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(4, "minimum required 4 character").max(10, "maximum 10 character")
});

// userId schema
export const userIdSchema = z.object({
  id: z.string().min(1, "User ID is required")
});

// change password schema
export const changePasswordSchema = z.object({
  password: z.string().min(4, "minimum required 4 character").max(10, "maximum 10 character"),
  newPassword: z.string().min(4, "minimum required 4 character").max(10, "maximum 10 character")
});

// create restaurant admin schema
export const createRestaurantAdminSchema = z.object({
  name: z.string().min(4).max(20),
  email: z.email("Invalid email address"),
  password: z.string().min(4, "minimum required 4 character").max(10, "maximum 10 character"),
  restaurantId: z.string().min(1, "Restaurant ID is required")
});

