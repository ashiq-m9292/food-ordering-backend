import mongoose from "mongoose";

interface IOrder {
    userId: mongoose.Types.ObjectId;
    restaurantId: mongoose.Types.ObjectId;
    deliveryAddress: {
        addressId: mongoose.Types.ObjectId;
        street: string;
        houseNumber: string;
        village: string;
        pincode: string;
        city: string;
        state: string;
        latitude: number;
        longitude: number;
        phone: string;
    };
    products: {
        productId: mongoose.Types.ObjectId;
        image: string;
        name: string;
        price: number;
        size: string;
        quantity: number;
        subTotal: number;
    }[];
    deliveryFee: number;
    totalPrice: number;
    paymentMethod: "COD" | "ONLINE";
    orderStatus: "PENDING" | "DELIVERED" | "CANCELLED";
};

const orderSchema = new mongoose.Schema<IOrder>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    deliveryAddress: {
        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
            required: true,
        },
        street: {
            type: String,
            required: true,
            trim: true
        },
        houseNumber: {
            type: String,
            required: true,
            trim: true
        },
        village: {
            type: String,
            required: true,
            trim: true
        },
        pincode: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true
        },
        latitude: {
            type: Number,
            min: -90,
            max: 90
        },
        longitude: {
            type: Number,
            min: -180,
            max: 180
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            image: {
                type: String,
                required: true,
                trim: true
            },
            name: {
                type: String,
                required: true,
                trim: true
            },
            price: {
                type: Number,
                required: true
            },
            size: {
                type: String,
                required: true,
                trim: true
            },
            quantity: {
                type: Number,
                required: true
            },
            subTotal: {
                type: Number,
                required: true
            }
        }
    ],
    deliveryFee: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["COD", "ONLINE"]
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ["PENDING", "DELIVERED", "CANCELLED"]
    },
}, { timestamps: true });

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;