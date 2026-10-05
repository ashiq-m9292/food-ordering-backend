import { z } from "zod";

// create restaurant schema
export const createRestaurantSchema = z.object({
  name: z.string().min(3, "Name Must be at least 3 character").max(20, "Name must at most 20 character"),
  email: z.email("Invalid email address"),
  description: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 character"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
  openingTime: z.string(),
  closingTime: z.string(),
  deliveryFee: z.coerce.number().min(0, "Delivery Fee at least zero"),
  freeDeliveryAbove: z.coerce.number().min(0, "FreeDeliveryAbove at least zero"),
  isOpen: z.coerce.boolean(),
  isActive: z.coerce.boolean()
});

// find single restaurant 
export const restaurantIdSchema = z.object({
  id: z.string().min(1, "Restaurant ID is required")
});

