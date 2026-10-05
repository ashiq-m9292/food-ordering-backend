import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";

const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
): Promise<{ secure_url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          reject(new Error("No result returned from Cloudinary"));
          return;
        }
        resolve({ secure_url: result.secure_url, public_id: result.public_id });
      },
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export default uploadToCloudinary;
