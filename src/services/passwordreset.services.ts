import crypto from "crypto";
import User from "../models/user.model";
import AppError from "../errors/AppError";

export const createResetPasswordToken = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError("User not Found", 404);

    // generate reset password token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // store only the hashed token in the database
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // token expire in 10 minutes
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    return { user, resetToken };
};
