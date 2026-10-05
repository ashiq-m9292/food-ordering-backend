import { Router } from "express";
import RestaurantController from "../controllers/restaurant.controller";
import {
  createRestaurantSchema,
  restaurantIdSchema
} from "../validator/restaurant.validator";
import validate from "../middlewares/validate";
import upload from "../middlewares/multer";
import asyncHandler from "../middlewares/asyncHandler";

const restaurantRouter = Router();
// create a new restaurant
restaurantRouter.post('/createrestaurant',
  upload.single('image'),
  validate(createRestaurantSchema, "body"),
  asyncHandler(RestaurantController.createRestaurantFunction)
);

// update restaurant
restaurantRouter.put('/updaterestaurant/:id',
  upload.single('image'),
  validate(restaurantIdSchema, "params"),
  validate(createRestaurantSchema.partial(), "body"),
  asyncHandler(RestaurantController.updateRestaurant))

// get all restaurant
restaurantRouter.get('/getallrestaurants', asyncHandler(RestaurantController.findAllRestaurnt));

// get single restaurant 
restaurantRouter.get('/getsinglerestaurant/:id', validate(restaurantIdSchema, "params"), asyncHandler(RestaurantController.findSingleRestaurnt))

// delete restaurant 
restaurantRouter.delete('/deleterestaurant/:id', validate(restaurantIdSchema, "params"), asyncHandler(RestaurantController.deleteRestaurnt));


export default restaurantRouter;
