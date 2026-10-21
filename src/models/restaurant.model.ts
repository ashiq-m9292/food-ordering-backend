import mongoose from "mongoose";

interface IRestaurant {
  name: string;
  email: string;
  description: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  deliveryRadiusKm: number;
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

const restaurantSchema = new mongoose.Schema<IRestaurant>(
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
    location: {
      latitude: {
        type: Number,
        min: -90,
        max: 90
      },
      longitude: {
        type: Number,
        min: -180,
        max: 180
      }
    },
    deliveryRadiusKm: {
      type: Number,
      min: 1,
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
      min: 0,
      default: 0,
    },
    freeDeliveryAbove: {
      type: Number,
      min: 0,
      default: 0,
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
      public_id: {
        type: String
      },
      secure_url: {
        type: String
      }
    },
  },
  { timestamps: true },
);

const Restaurant = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
export default Restaurant;
