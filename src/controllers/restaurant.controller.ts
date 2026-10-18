import { Request, Response, NextFunction } from "express";
import {
  createRestaurantService,
  updateRestaurantService,
  getAllRestaurantService,
  getSingleRestaurantService,
  deleteRestaurantService
} from "../services/restaurant.services";

class RestaurantController {

  // create restaurant
  async createRestaurantFunction(req: Request, res: Response, next: NextFunction) {
    const { name, email, description, address, phone, openingTime, closingTime } = req.body;
    const file = req.file;
    const restaurant = await createRestaurantService(
      name,
      email,
      description,
      address,
      phone,
      openingTime,
      closingTime,
      file
    );

    return res.status(200).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant: restaurant
    })
  };

  // update restaurant
  async updateRestaurant(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const file = req.file;
    const { name, description, address, phone, openingTime, closingTime, deliveryFee, freeDeliveryAbove, isOpen, isActive } = req.body;
    // find restaurant id
    const restaurant = await updateRestaurantService(
      id as string,
      name,
      description,
      address,
      phone,
      openingTime,
      closingTime,
      deliveryFee,
      freeDeliveryAbove,
      isOpen,
      isActive,
      file
    );

    // save restaurant
    await restaurant.save();

    return res.status(200).json({
      success: true,
      message: "Restaurant Updated Successfully",
      restaurant: restaurant
    })
  };


  // find all restaurant 
  async findAllRestaurnt(req: Request, res: Response, next: NextFunction) {
    const restaurant = await getAllRestaurantService();

    return res.status(200).json({
      success: true,
      message: "fetched all restaurant successfully",
      length: restaurant.length,
      restaurants: restaurant
    })
  };

  // find single restaurant
  async findSingleRestaurnt(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const restaurant = await getSingleRestaurantService(id as string);
    return res.status(200).json({
      success: true,
      message: "fetched restaurant successfully",
      restaurant: restaurant
    })
  };

  // delete restaurant
  async deleteRestaurnt(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    await deleteRestaurantService(id as string);

    return res.status(200).json({
      success: true,
      message: "delete restaurant successfully"
    })
  };


}

export default new RestaurantController();
