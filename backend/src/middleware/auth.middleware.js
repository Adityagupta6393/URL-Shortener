import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/token.js";

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            return next(new ApiError(401, "Access token is required"));
        }

        const decoded = verifyAccessToken(token);

        req.user = decoded;

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return next(new ApiError(401, "Access token has expired"));
        }

        if (err.name === "JsonWebTokenError") {
            return next(new ApiError(401, "Invalid access token"));
        }

        return next(new ApiError(500, "Authentication failed"));
    }
};

export default authenticate;