import { z } from "zod";

// create restaurant schema
export const createRestaurantSchema = z.object({
  name: z.string().min(1, "Restaurant name is required").max(20, "Restaurant name must be at most 50 character"),
  email: z.email("Invalid Email Address"),
  description: z.string().max(50, "Description must be at most 50 character").optional(),
  address: z.string().min(3, "Address must be at least 3 character").max(50, "Address must at most 50 character"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
  openingTime: z.string().optional(),
  closingTime: z.string().optional(),
  deliveryFee: z.coerce.number().min(0, "Delivery fee must be greater than 0").optional(),
  freeDeliveryAbove: z.coerce.number().min(0, "Free delivery above must be greater than 0").optional(),
  isOpen: z.boolean().optional(),
  isActive: z.boolean().optional(),
  location: z.object({
    latitude: z.coerce.number().min(-90, "Latitude must be greater than -90").max(90, "Latitude must be less than 90"),
    longitude: z.coerce.number().min(-180, "Longitude must be greater than -180").max(180, "Longitude must be less than 180")
  }),
  deliveryRadiusKm: z.coerce.number().min(1, "Delivery radius must be greater than 1").optional(),
});

// update restaurant schema
export const updateRestaurantSchema = z.object({
  name: z.string().min(1, "Restaurant name is required").max(20, "Restaurant name must be at most 50 character").optional(),
  description: z.string().max(50, "Description must be at most 50 character").optional(),
  address: z.string().min(3, "Address must be at least 3 character").max(50, "Address must at most 50 character").optional(),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number").optional(),
  openingTime: z.string().optional(),
  closingTime: z.string().optional(),
  deliveryFee: z.coerce.number().min(0, "Delivery fee must be greater than 0").optional(),
  freeDeliveryAbove: z.coerce.number().min(0, "Free delivery above must be greater than 0").optional(),
  isOpen: z.boolean().optional(),
  isActive: z.boolean().optional(),
  location: z.object({
    latitude: z.coerce.number().min(-90, "Latitude must be greater than -90").max(90, "Latitude must be less than 90").optional(),
    longitude: z.coerce.number().min(-180, "Longitude must be greater than -180").max(180, "Longitude must be less than 180").optional()
  }).optional(),
  deliveryRadiusKm: z.coerce.number().min(1, "Delivery radius must be greater than 1").optional(),
});

// restaurant id schema
export const restaurantIdSchema = z.object({
  id: z.string().min(1, "Restaurant ID is required")
});

