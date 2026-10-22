import { z } from "zod";


// add address validator
export const addAddressSchema = z.object({
    street: z.string().min(1, "Street required"),
    houseNumber: z.string().min(1, "House number required"),
    village: z.string().min(1, "Village required"),
    pincode: z.string().min(1, "Pincode required"),
    city: z.string().min(1, "City required"),
    state: z.string().min(1, "State required"),
    latitude: z.coerce.number().min(-90, "Latitude must be between -90 and 90").max(90, "Latitude must be between -90 and 90"),
    longitude: z.coerce.number().min(-180, "Longitude must be between -180 and 180").max(180, "Longitude must be between -180 and 180"),
    phone: z.string().min(10, "Phone number required"),
});


// update address validator
export const updateAddressSchema = z.object({
    addressId: z.string().min(1, "Address id required"),
    street: z.string().min(1, "Street required"),
    houseNumber: z.string().min(1, "House number required"),
    village: z.string().min(1, "Village required"),
    pincode: z.string().min(1, "Pincode required"),
    city: z.string().min(1, "City required"),
    state: z.string().min(1, "State required"),
    latitude: z.coerce.number().min(-90, "Latitude must be between -90 and 90").max(90, "Latitude must be between -90 and 90"),
    longitude: z.coerce.number().min(-180, "Longitude must be between -180 and 180").max(180, "Longitude must be between -180 and 180"),
    phone: z.string().min(10, "Phone number required"),
});

// delte address validator
export const deleteAddressSchema = z.object({
    addressId: z.string().min(1, "Address id required"),
});

// default address validator
export const defaultAddressSchema = z.object({
    addressId: z.string().min(1, "Address id required"),
});

