import mongoose from "mongoose";

interface IWishlist {
    userId: mongoose.Types.ObjectId;
    items: {
        productId: mongoose.Types.ObjectId
    }[];
};


const wishlistSchema = new mongoose.Schema<IWishlist>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            }
        }
    ]
}, { timestamps: true });

const Wishlist = mongoose.model<IWishlist>('Wishlist', wishlistSchema);

export default Wishlist;