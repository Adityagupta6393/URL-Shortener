import {
    ACCESS_TOKEN_MAX_AGE,
    REFRESH_TOKEN_MAX_AGE,
} from "../constants/auth.constants.js";
const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
};

export const accessCookieOptions = {
    ...cookieOptions,
    maxAge: ACCESS_TOKEN_MAX_AGE,
};

export const refreshCookieOptions = {
    ...cookieOptions,
    maxAge: REFRESH_TOKEN_MAX_AGE,
};

export const clearAuthCookies = async (res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
}

export { cookieOptions };