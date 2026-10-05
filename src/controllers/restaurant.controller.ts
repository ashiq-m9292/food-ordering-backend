import Restaurant from "../models/restaurant.model";
import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import uploadToCloudinary from "../utills/uploadToCloudinary";
import { v2 as cloudinary } from 'cloudinary';

class RestaurantController {
  // create restaurant
  async createRestaurantFunction(req: Request, res: Response, next: NextFunction) {
    const { name, email, description, address, phone, openingTime, closingTime, deliveryFee, freeDeliveryAbove, isOpen, isActive } = req.body;

    // check restaurant
    const existingRestaurant = await Restaurant.findOne({ email });
    if (existingRestaurant) throw new AppError("Already Exist Restaurant", 400)

    // check file and upload to cloudinary
    const file = req.file;
    if (!file) throw new AppError("Please provided image", 400)
    const result = await uploadToCloudinary(file.buffer, "Restaurant_Images");
    const image = {
      secure_url: result.secure_url,
      public_id: result.public_id
    };

    // create restaurant
    const restaurant = await Restaurant.create({
      name,
      email,
      description,
      address,
      phone,
      openingTime,
      closingTime,
      deliveryFee,
      freeDeliveryAbove,
      isOpen,
      isActive,
      image: image
    });
    return res.status(200).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant: restaurant
    })
  };

  // update restaurant
  async updateRestaurant(req: Request, res: Response, next: NextFunction) {
    // find restaurant id
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) throw new AppError("No Restaurants", 400)

    // update body field
    const { name, description, address, phone, openingTime, closingTime, deliveryFee, freeDeliveryAbove } = req.body;
    if (name !== undefined) restaurant.name = name;
    if (description !== undefined) restaurant.description = description;
    if (address !== undefined) restaurant.address = address;
    if (phone !== undefined) restaurant.phone = phone;
    if (openingTime !== undefined) restaurant.openingTime = openingTime;
    if (closingTime !== undefined) restaurant.closingTime = closingTime;
    if (deliveryFee !== undefined) restaurant.deliveryFee = deliveryFee;
    if (freeDeliveryAbove !== undefined) restaurant.freeDeliveryAbove = freeDeliveryAbove;

    if (req.file) {
      if (restaurant.image?.public_id) {
        await cloudinary.uploader.destroy(restaurant.image.public_id);
      }
      const result = await uploadToCloudinary(req.file.buffer, "Restaurant_Images");
      restaurant.image = {
        secure_url: result.secure_url,
        public_id: result.public_id
      };
    };

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
    const restaurant = await Restaurant.find();
    if (restaurant.length === 0) throw new AppError("No Restaurants", 400)
    return res.status(200).json({
      success: true,
      message: "fetched all restaurant successfully",
      length: restaurant.length,
      restaurants: restaurant
    })
  };

  // find single restaurant
  async findSingleRestaurnt(req: Request, res: Response, next: NextFunction) {
    const restaurant = await Restaurant.findById(req.params.id)
    if (!restaurant) throw new AppError("No Restaurants", 400)
    return res.status(200).json({
      success: true,
      message: "fetched restaurant successfully",
      restaurant: restaurant
    })
  };

  // delete restaurant
  async deleteRestaurnt(req: Request, res: Response, next: NextFunction) {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id)
    if (!restaurant) throw new AppError("No Restaurants", 400)

    // image delete
    if (restaurant.image.public_id) {
      await cloudinary.uploader.destroy(restaurant.image.public_id)
    };
    return res.status(200).json({
      success: true,
      message: "delete restaurant successfully"
    })
  };


}

export default new RestaurantController();
