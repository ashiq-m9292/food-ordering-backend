import mongoose from "mongoose";

interface IAddress {
    userId: mongoose.Types.ObjectId;
    street: string;
    houseNumber: string;
    village: string;
    pincode: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
    phone: string;
    isDefault: boolean;
};


const addressSchema = new mongoose.Schema<IAddress>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isDefault: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Address = mongoose.model<IAddress>('Address', addressSchema);

export default Address;