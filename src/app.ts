import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import restaurantRoutes from "./routes/restaurant.routes";
import errorHandler from "./errors/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/restaurants", restaurantRoutes);
app.use(errorHandler);

export default app;
