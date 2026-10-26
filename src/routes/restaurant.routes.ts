import { Router } from "express";
import RestaurantController from "../controllers/restaurant.controller";
import { protect } from "../middlewares/auth.middleware";
import authorize from "../middlewares/authorize";
import {
  createRestaurantSchema,
  updateRestaurantSchema,
  restaurantIdSchema
} from "../validator/restaurant.validator";
import validate from "../middlewares/validate";
import upload from "../middlewares/multer";
import asyncHandler from "../middlewares/asyncHandler";

const restaurantRouter = Router();


// create a new restaurant
restaurantRouter.post('/createrestaurant',
  protect,
  authorize("superAdmin"),
  upload.single('image'),
  validate(createRestaurantSchema, "body"),
  asyncHandler(RestaurantController.createRestaurantFunction)
);

// update restaurant
restaurantRouter.put('/updaterestaurant/:id',
  protect,
  authorize("superAdmin"),
  validate(restaurantIdSchema, "params"),
  upload.single('image'),
  validate(updateRestaurantSchema, "body"),
  asyncHandler(RestaurantController.updateRestaurant)
);

// get all restaurant
restaurantRouter.get('/getallrestaurants',
  protect,
  authorize("superAdmin"),
  asyncHandler(RestaurantController.findAllRestaurnt));

// get single restaurant 
restaurantRouter.get('/getsinglerestaurant/:id',
  protect,
  authorize("superAdmin"),
  validate(restaurantIdSchema, "params"),
  asyncHandler(RestaurantController.findSingleRestaurnt)
);

// delete restaurant 
restaurantRouter.delete('/deleterestaurant/:id',
  protect,
  authorize("superAdmin"),
  validate(restaurantIdSchema, "params"),
  asyncHandler(RestaurantController.deleteRestaurnt)
);


export default restaurantRouter;
