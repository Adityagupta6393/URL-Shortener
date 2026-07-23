import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import ApiError from "./utils/ApiError.js";
import HTTP_STATUS from "./constants/httpStatus.js";
import errorHandler from "./middleware/errorHandler.js";
import { redirectLimiter } from "./middleware/rateLimiter.js";

const app = express();

// Security
app.use(helmet());

// CORS
app.use(cors({
    origin : true,
    credentials : true
}));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Logger
app.use(morgan("dev"));

// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy 🚀"
    });
});

//import controller
import urlController from "./modules/url/url.controller.js";
// Routes
import authRoutes from "./modules/auth/auth.routes.js";
import urlRoutes from "./modules/url/url.routes.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js"

app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);
app.get("/:shortCode", redirectLimiter, urlController.redirectToOriginalUrl );
app.use("/api/analytics", analyticsRoutes);

app.get("/health", (req, res) => {

    res.status(200).json({

        status: "UP",

        timestamp: new Date(),

    });

});

app.use((req, res, next) => {
    next(new ApiError(HTTP_STATUS.NOT_FOUND, "Route not found"));
});

app.use(errorHandler);

app.set("trust proxy", 1);

export default app;