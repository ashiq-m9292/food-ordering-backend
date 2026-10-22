import { z } from "zod";

// create order validator
export const createOrderSchema = z.object({
    restaurantId: z.string().min(1, "Restaurant id required"),
    deliveryAddressId: z.string().min(1, "Delivery address id required"),
    products: z.array(
        z.object({
            productId: z.string().min(1, "Product id required"),
            size: z.string().min(1, "Size required"),
            quantity: z.coerce.number().min(1, "Quantity required")
        })
    ),
    deliveryFee: z.coerce.number().min(0, "Delivery fee required"),
    paymentMethod: z.enum(["COD", "ONLINE"]),
});

// delete order validator
export const deleteOrderSchema = z.object({
    orderId: z.string().min(1, "Order id required"),
});