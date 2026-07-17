import bcrypt from "bcrypt";
import ApiError from "../../utils/ApiError.js";
import userRepository from "./auth.repository.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    compareToken,
    hashToken
} from "../../utils/token.js";

import refreshTokenRepository from "./refresh-token.repository.js";

import { REFRESH_TOKEN_MAX_AGE } from "../../constants/auth.constants.js";

import { UAParser } from "ua-parser-js";
import authRepository from "./auth.repository.js";

import { clearAuthCookies } from "../../config/cookies.js";

import User from "./auth.model.js";

const register = async ({ name, email, password }) => {

    const existingUser = await userRepository.findUserByEmail(email);

    if (existingUser) {
        throw new ApiError(409, "Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser({
        name,
        email,
        password: hashedPassword,
    });

    return;
};

const login = async ({ email, password, ipAddress, userAgent }) => {
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await createSession({
        user,
        ipAddress,
        userAgent,
    });

    return {
        user,
        accessToken,
        refreshToken,
    };
};

const refresh = async ({ refreshToken, ipAddress, userAgent }) => {

    const {
        decoded,
        matchedToken,
    } = await findValidRefreshToken(refreshToken);

    const accessToken =
        generateAccessToken({
            id: decoded.id,
        });

    const newRefreshToken =
        await rotateRefreshToken(
            {
                matchedToken,
                userId: decoded.id,
                ipAddress,
                userAgent
            }

        );

    return {
        accessToken,
        refreshToken: newRefreshToken,
    };
};

const logout = async ({ refreshToken }) => {

    const { matchedToken } =
        await findValidRefreshToken(refreshToken);

    await refreshTokenRepository.deleteById(
        matchedToken._id
    );
};

const getCurrentUser = async (userId) => {

    const user = await userRepository.findUserById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};

const logoutAll = async (userId) => {

    await refreshTokenRepository.deleteAllByUser(userId);

};

const changePassword = async ({
    userId,
    currentPassword,
    newPassword,
}) => {

    const user = await userRepository.findUserById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isMatch = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isMatch) {
        throw new ApiError(
            401,
            "Current password is incorrect"
        );
    }

    const isSamePassword = await bcrypt.compare(
        newPassword,
        user.password
    );

    if (isSamePassword) {
        throw new ApiError(
            400,
            "New password must be different from the current password"
        );
    }

    const hashedPassword = await bcrypt.hash(
        newPassword,
        10
    );

    await userRepository.updatePassword(
        userId,
        hashedPassword
    );

    await refreshTokenRepository.deleteAllByUser(
        userId
    );
};

const createSession = async ({ user, ipAddress, userAgent }) => {

    const accessToken = generateAccessToken({
        id: user._id,
        role: user.role,
    });

    const refreshToken = generateRefreshToken({
        id: user._id,
    });

    const hashedToken = await hashToken(refreshToken);

    const parser = new UAParser(userAgent);

    const deviceInfo = {
        browser: parser.getBrowser().name || "Unknown",
        os: parser.getOS().name || "Unknown",
        device: parser.getDevice().type || "Desktop",
    };

    const expiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    await refreshTokenRepository.create({
        userId: user._id,
        hashedToken,
        ipAddress,
        deviceInfo,
        expiresAt,
    });

    return {
        accessToken,
        refreshToken,
    };
};

const findValidRefreshToken = async (refreshToken) => {

    const decoded = verifyRefreshToken(refreshToken);

    const tokens =
        await refreshTokenRepository.findByUserId(decoded.id);

    let matchedToken = null;

    for (const tokenDoc of tokens) {

        const isMatch = await compareToken(
            refreshToken,
            tokenDoc.hashedToken
        );

        if (isMatch) {
            matchedToken = tokenDoc;
            break;
        }
    }

    if (!matchedToken) {
        throw new ApiError(
            401,
            "Invalid refresh token"
        );
    }

    await refreshTokenRepository.updateLastUsedAt(
        matchedToken._id
    );

    return {
        decoded,
        matchedToken,
    };
};

const rotateRefreshToken = async (
    {
        matchedToken,
        userId,
        ipAddress,
        userAgent,
    }
) => {

    const refreshToken =
        generateRefreshToken({
            id: userId,
        });

    const hashedToken =
        await hashToken(refreshToken);

    await refreshTokenRepository.deleteById(
        matchedToken._id
    );

    const parser = new UAParser(userAgent);

    const deviceInfo = {
        browser: parser.getBrowser().name || "Unknown",
        os: parser.getOS().name || "Unknown",
        device: parser.getDevice().type || "Desktop",
    };

    const expiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    await refreshTokenRepository.create({
        userId,
        hashedToken,
        ipAddress,
        deviceInfo,
        expiresAt,
    });

    return refreshToken;
};




export default {
    register,
    login,
    refresh,
    logout,
    logoutAll,
    getCurrentUser,
    changePassword
};