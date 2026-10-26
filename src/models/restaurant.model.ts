import mongoose from "mongoose";

interface IRestaurant {
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
  restaurantImage: {
    secure_url: string;
    public_id: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  deliveryRadiusKm: number;
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
      default: ""
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true
    },
    openingTime: {
      type: String,
      trim: true,
      default: "9:00 AM"
    },
    closingTime: {
      type: String,
      trim: true,
      default: "11:00 PM"
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
    restaurantImage: {
      public_id: {
        type: String
      },
      secure_url: {
        type: String
      }
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
  },
  { timestamps: true },
);

const Restaurant = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
export default Restaurant;
