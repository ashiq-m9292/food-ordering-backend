import { z } from "zod";

// create restaurant
export const createRestaurantSchema = z.object({
  name: z.string().min(4).max(20),
  description: z.string().min(10).max(50),
  address: z.string().min(10),
  phone: z.string().min(10).max(13),
  openingTime: z.string().min(2).max(10),
  closingTime: z.string().min(2).max(10),
  deliveryFee: z.number().min(0),
  freeDeliveryAbove: z.number().min(0),
  isOpen: z.boolean().optional(),
  isActive: z.boolean().optional(),
});
