import { Request, Response, NextFunction } from 'express';
import AppError from "../errors/AppError";
import {
    addAddressService,
    updateAddressService,
    getAddressService,
    deleteAddressService,
    defaultAddressService
} from "../services/address.services";

class AddressController {

    // add address function
    async addAddressFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const { street, houseNumber, village, pincode, city, state, latitude, longitude, phone } = req.body;
        const address = await addAddressService(req.user.userId, street, houseNumber, village, pincode, city, state, latitude, longitude, phone);
        res.status(200).json({
            success: true,
            message: "Added address successfully",
            address
        })
    };

    // update address function
    async updateAddressFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const { addressId, street, houseNumber, village, pincode, city, state, latitude, longitude, phone } = req.body;
        const address = await updateAddressService(req.user.userId, addressId, street, houseNumber, village, pincode, city, state, latitude, longitude, phone);
        res.status(200).json({
            success: true,
            message: "Updated address successfully",
            address
        })
    };

    // delete address function
    async deleteAddressFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        await deleteAddressService(req.user.userId, req.body.addressId);
        res.status(200).json({
            success: true,
            message: "Deleted address successfully"
        })
    };

    // get address function
    async getAddressFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const address = await getAddressService(req.user.userId);
        res.status(200).json({
            success: true,
            message: "fetched address successfully",
            length: address.length,
            address
        })
    };

    // default address function
    async defaultAddressFun(req: Request, res: Response, next: NextFunction) {
        if (!req.user) throw new AppError("User not found", 401);
        const address = await defaultAddressService(req.user.userId, req.body.addressId);
        res.status(200).json({
            success: true,
            message: "Default address updated successfully",
            address
        })
    };


};


export default new AddressController;