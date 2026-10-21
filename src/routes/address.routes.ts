import { Router } from "express";
import AddressController from "../controllers/address.controller";
import { protect } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate";
import asyncHandler from "../middlewares/asyncHandler";
import {
    addAddressSchema,
    updateAddressSchema,
    deleteAddressSchema
} from "../validator/address.validator";

const addressRoutes = Router();

// add address route
addressRoutes.post('/addaddress',
    protect,
    validate(addAddressSchema, "body"),
    asyncHandler(AddressController.addAddressFun)
);

// update address route
addressRoutes.put('/updateaddress',
    protect,
    validate(updateAddressSchema, "body"),
    asyncHandler(AddressController.updateAddressFun)
);

// delete address route
addressRoutes.delete('/deleteaddress',
    protect,
    validate(deleteAddressSchema, "body"),
    asyncHandler(AddressController.deleteAddressFun)
);

// get address route
addressRoutes.get('/getalladdress',
    protect,
    asyncHandler(AddressController.getAddressFun)
);

export default addressRoutes;