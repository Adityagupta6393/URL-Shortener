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

const login = async ({ email, password }) => {
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    const existingRefreshToken = await refreshTokenRepository.findByUserId(user._id);

    if (existingRefreshToken) {
        await refreshTokenRepository.deleteById(existingRefreshToken._id);
    }

    const { accessToken, refreshToken } = await createSession(user);

    return {
        user,
        accessToken,
        refreshToken,
    };
};

const refresh = async ({ refreshToken }) => {

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
            matchedToken,
            decoded.id
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


const createSession = async (user) => {

    const accessToken = generateAccessToken({
        id: user._id,
        role: user.role,
    });

    const refreshToken = generateRefreshToken({
        id: user._id,
    });

    const hashedToken = await hashToken(refreshToken);

    await refreshTokenRepository.create({
        userId: user._id,
        hashedToken,
        expiresAt: new Date(
            Date.now() + REFRESH_TOKEN_MAX_AGE
        ),
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

    return {
        decoded,
        matchedToken,
    };
};

const rotateRefreshToken = async (
    matchedToken,
    userId
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

    await refreshTokenRepository.create({
        userId,
        hashedToken,
        expiresAt: new Date(
            Date.now() + REFRESH_TOKEN_MAX_AGE
        ),
    });

    return refreshToken;
};




export default {
    register,
    login,
    refresh,
    logout,
    getCurrentUser,
};