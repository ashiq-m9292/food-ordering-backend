import { Request, Response, NextFunction } from "express";
import {
  createRestaurantService,
  updateRestaurantService,
  getAllRestaurantService,
  getSingleRestaurantService,
  deleteRestaurantService
} from "../services/restaurant.services";
import AppError from "../errors/AppError";

class RestaurantController {

  // create restaurant
  async createRestaurantFunction(req: Request, res: Response, next: NextFunction) {
    const file = req.file;
    if (!file) throw new AppError("Please provided image", 400);
    const restaurant = await createRestaurantService(
      req.body,
      file
    );

    return res.status(200).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant
    })
  };

  // update restaurant
  async updateRestaurant(req: Request, res: Response, next: NextFunction) {
    const file = req.file;
    // find restaurant id
    const restaurant = await updateRestaurantService(
      req.params.id as string,
      req.body,
      file
    );

    return res.status(201).json({
      success: true,
      message: "Restaurant Updated Successfully",
      restaurant: restaurant
    })
  };


  // find all restaurant 
  async findAllRestaurnt(req: Request, res: Response, next: NextFunction) {
    const restaurants = await getAllRestaurantService();

    return res.status(201).json({
      success: true,
      message: "Restaurants fetched successfully",
      length: restaurants.length,
      restaurants
    })
  };

  // find single restaurant
  async findSingleRestaurnt(req: Request, res: Response, next: NextFunction) {

    const restaurant = await getSingleRestaurantService(req.params.id as string);
    return res.status(201).json({
      success: true,
      message: "Restaurant fetched successfully",
      restaurant
    })
  };

  // delete restaurant
  async deleteRestaurnt(req: Request, res: Response, next: NextFunction) {
    await deleteRestaurantService(req.params.id as string);

    return res.status(201).json({
      success: true,
      message: "Restaurant deleted successfully"
    })
  };


}

export default new RestaurantController();
