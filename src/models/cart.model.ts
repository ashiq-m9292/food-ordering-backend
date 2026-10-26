import mongoose from "mongoose";

interface ICart {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    restaurantId: mongoose.Types.ObjectId;
    size: string;
    quantity: number;
};


const cartSchema = new mongoose.Schema<ICart>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    size: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        default: 1
    }
}, { timestamps: true });

// one product id one time save honi chahiye
cartSchema.index(
    { userId: 1, productId: 1 },
    { unique: true }
);

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;