import mongoose from "mongoose";
import User from "../models/user.model";
import Address from "../models/address.model";
import AppError from "../errors/AppError";


// add address service
export const addAddressService = async (
    userId: string,
    street: string,
    houseNumber: string,
    village: string,
    pincode: string,
    city: string,
    state: string,
    latitude: number,
    longitude: number,
    phone: string,
) => {

    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 400);

    // check all field 
    if (!street || !houseNumber || !village || !pincode || !city || !state || !latitude || !longitude || !phone) throw new AppError("All fields are required", 400);

    // find first address
    const existingAddress = await Address.findOne({ userId });

    // create new address
    const newAddress = await Address.create({
        userId,
        street,
        houseNumber,
        village,
        pincode,
        city,
        state,
        latitude,
        longitude,
        phone,
        isDefault: !existingAddress
    });
    return newAddress;

};


// update address service
export const updateAddressService = async (
    userId: string,
    addressId: string,
    street: string,
    houseNumber: string,
    village: string,
    pincode: string,
    city: string,
    state: string,
    latitude: number,
    longitude: number,
    phone: string
) => {
    // address id validation
    if (!mongoose.isValidObjectId(addressId)) throw new AppError("Invalid address id", 400);

    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 400);

    // check product product exis with address id
    const address = await Address.findOne({ _id: addressId, userId });
    if (!address) throw new AppError("Address not found", 404);

    // update address
    if (street !== undefined) address.street = street;
    if (houseNumber !== undefined) address.houseNumber = houseNumber;
    if (village !== undefined) address.village = village;
    if (pincode !== undefined) address.pincode = pincode;
    if (city !== undefined) address.city = city;
    if (state !== undefined) address.state = state;
    if (latitude !== undefined) address.latitude = latitude;
    if (longitude !== undefined) address.longitude = longitude;
    if (phone !== undefined) address.phone = phone;

    // update address
    await address.save();
    return address;

};

// get address service
export const getAddressService = async (userId: string) => {
    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 400);

    // find address
    const address = await Address.find({ userId });
    if (!address || address.length === 0) {
        throw new AppError("Address not found", 404);
    };
    // get address
    return address;
};

// delete address service
export const deleteAddressService = async (userId: string, addressId: string) => {
    // address id validation
    if (!mongoose.isValidObjectId(addressId)) throw new AppError("Invalid address id", 400);

    // check user exist
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 400);

    // check product product exis with address id
    const address = await Address.findOne({ _id: addressId, userId });
    if (!address) throw new AppError("Address not found", 404);

    // delete address
    await address.deleteOne();
    return address;

};