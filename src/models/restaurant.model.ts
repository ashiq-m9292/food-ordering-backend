import mongoose from "mongoose";

interface IRestaurant extends Document {
  name: string;
  email: string;
  description: string;
  address: string;
  phone: string;
  openingTime: string;
  closingTime: string;
  deliveryFee: number;
  freeDeliveryAbove: number;
  isOpen: boolean;
  isActive: boolean;
  image: {
    secure_url: string;
    public_id: string;
  };
}

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    openingTime: {
      type: String,
      required: true
    },
    closingTime: {
      type: String,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
      min: 0,
    },
    freeDeliveryAbove: {
      type: Number,
      required: true,
      min: 0,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    image: {
      secure_url: String,
      public_id: String,
    },
  },
  { timestamps: true },
);

const Restaurant = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
export default Restaurant;
