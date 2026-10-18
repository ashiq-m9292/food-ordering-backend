import mongoose from "mongoose";

interface IUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    profilePic: {
        public_id: string,
        secure_url: string
    };
    role: "customer" | "restaurantAdmin" | "superAdmin";
    restaurantId: mongoose.Types.ObjectId;
    resetPasswordToken: string;
    resetPasswordExpire: Date;
    isActive: boolean;
};

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String
        }
    },
    role: {
        type: String,
        enum: ["customer", "restaurantAdmin", "superAdmin"],
        default: "customer"
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    resetPasswordToken: {
        type: String,
        default: undefined
    },
    resetPasswordExpire: {
        type: Date,
        default: undefined
    },
    isActive: {
        type: Boolean
    }
}, { timestamps: true });

userSchema.index(
    { restaurantId: 1 },
    { unique: true, partialFilterExpression: { role: "restaurantAdmin" } }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;