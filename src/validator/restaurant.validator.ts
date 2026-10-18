import { z } from "zod";

// create restaurant schema
export const createRestaurantSchema = z.object({
  name: z.string().min(3, "Name Must be at least 3 character").max(20, "Name must at most 20 character"),
  email: z.email("Invalid email address").min(5, "Email must be at least 5 character"),
  description: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 character").max(50, "Address must at most 50 character"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
  openingTime: z.string(),
  closingTime: z.string(),
  deliveryFee: z.coerce.number().min(0, "Delivery fee must be greater than 0").optional(),
  freeDeliveryAbove: z.coerce.number().min(0, "Free delivery above must be greater than 0").optional(),
  isOpen: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

// find single restaurant 
export const restaurantIdSchema = z.object({
  id: z.string().min(1, "Restaurant ID is required")
});

