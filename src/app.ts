import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import restaurantRoutes from "./routes/restaurant.routes";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import addressRoutes from "./routes/address.routes";
import orderRoutes from "./routes/order.routes";
import errorHandler from "./errors/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/wishlists", wishlistRoutes);
app.use("/api/v1/addresses", addressRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use(errorHandler);

export default app;
