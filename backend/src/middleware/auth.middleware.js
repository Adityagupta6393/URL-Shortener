// import jwt from "jsonwebtoken";
// import ApiError from "../utils/ApiError.js";

// const authenticate = (req, res, next) => {
//     try {

//         const authHeader = req.headers.authorization;

//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             throw new ApiError(401, "Unauthorized");
//         }

//         const token = authHeader.split(" ")[1];

//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_ACCESS_SECRET
//         );

//         req.user = decoded;

//         next();

//     } catch (err) {
//         next(new ApiError(401, "Invalid or expired token"));
//     }
// };

// export default authenticate;

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