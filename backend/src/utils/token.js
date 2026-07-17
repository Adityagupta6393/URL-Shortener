import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY,
} from "../constants/auth.constants.js";

export const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });
};

export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    });
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

export const hashToken = async (token) => {
    return bcrypt.hash(token, 10);
};

export const compareToken = async (token, hashedToken) => {
    return bcrypt.compare(token, hashedToken);
};