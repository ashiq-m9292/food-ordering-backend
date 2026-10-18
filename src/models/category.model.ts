import mongoose from "mongoose";

interface ICategory {
    restaurantId: mongoose.Types.ObjectId;
    name: string;
    isActive: boolean;
    categoryImage: {
        public_id: string,
        secure_url: string
    };
};


const restaurantCategorySchema = new mongoose.Schema<ICategory>({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    categoryImage: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String
        }
    }
}, { timestamps: true });

restaurantCategorySchema.index({
    name: 1,
    restaurantId: 1
}, { unique: true });

const Category = mongoose.model<ICategory>("Category", restaurantCategorySchema);

export default Category;