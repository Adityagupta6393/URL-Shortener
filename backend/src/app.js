import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import ApiError from "./utils/ApiError.js";
import HTTP_STATUS from "./constants/httpStatus.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Security
app.use(helmet());

// CORS
app.use(cors());

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

// Routes
import authRoutes from "./modules/auth/auth.routes.js";

app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
    next(new ApiError(HTTP_STATUS.NOT_FOUND, "Route not found"));
});

app.use(errorHandler);

export default app;