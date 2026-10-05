import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import connectDB from "./config/db";
import cloudinary from "./config/cloudinary";

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    await cloudinary.api.ping((error, result) => {
      if (error) {
        console.error("Error connecting to Cloudinary:", error);
        process.exit(1);
      } else {
        console.log("Connected to Cloudinary:", result);
      }
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
