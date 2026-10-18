import mongoose from "mongoose";

interface IProduct {
    restaurantId: mongoose.Types.ObjectId;
    categoryId: mongoose.Types.ObjectId;
    name: string;
    description: string;
    sizes: {
        size: string,
        price: number,
        discountPrice: number,
        stockQuantity: number,
        trackInventory: boolean,
        isAvailable: boolean
    }[];
    totalSold: number;
    foodType: string;
    isActive: boolean;
    productImages: {
        public_id: string,
        secure_url: string
    }[];
};


const productSchema = new mongoose.Schema<IProduct>({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RestaurantCategori",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    sizes: [
        {
            size: {
                type: String,
                required: true,
                trim: true
            },
            price: {
                type: Number,
                required: true
            },
            discountPrice: {
                type: Number,
                required: true
            },
            stockQuantity: {
                type: Number,
                required: true
            },
            trackInventory: {
                type: Boolean,
                default: true
            },
            isAvailable: {
                type: Boolean,
                default: true
            }
        }
    ],
    totalSold: {
        type: Number,
        default: 0
    },
    foodType: {
        type: String,
        enum: ["veg", "nonVeg", "egg"],
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    productImages: [
        {
            public_id: String,
            secure_url: String
        }
    ]
}, { timestamps: true });

productSchema.index({
    name: 1,
    restaurantId: 1
}, { unique: true });

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;