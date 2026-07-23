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

import { generateRandomToken } from "../../utils/randomToken.js";
import tokenRepository from "./repositories/token.repository.js";
import emailService from "../../services/email.service.js";

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

    await issueEmailVerification(user);

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

    if (!user.isVerified) {
        throw new ApiError(
            403,
            "Please verify your email before logging in."
        );
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

const updateProfile = async ({ userId, name, email }) => {

    const user = await userRepository.findUserById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const updates = {};

    if (name !== undefined) {
        updates.name = name.trim();
    }

    if (email !== undefined) {

        if (email !== user.email) {

            const existingUser = await userRepository.findUserByEmail(email);

            if (existingUser) {
                throw new ApiError(409, "Email already exists");
            }
        }

        updates.email = email;
    }

    if (Object.keys(updates).length === 0) {
        throw new ApiError(
            400,
            "No fields provided for update"
        );
    }

    const updatedUser = await userRepository.updateProfile(
        userId,
        updates
    );

    return updatedUser;
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

const verifyEmail = async ({
    userId,
    token,
}) => {

    const user =
        await userRepository.findUserById(userId);

    if (!user) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    if (user.isVerified) {
        throw new ApiError(
            400,
            "Email is already verified"
        );
    }

    const verificationToken =
        await tokenRepository.findByUserIdAndType(
            userId,
            "email_verification"
        );

    if (!verificationToken) {
        throw new ApiError(
            400,
            "Verification token not found"
        );
    }

    const isMatch = await compareToken(
        token,
        verificationToken.hashedToken
    );

    if (!isMatch) {
        throw new ApiError(
            400,
            "Invalid verification token"
        );
    }

    await userRepository.verifyUser(userId);

    await tokenRepository.deleteById(
        verificationToken._id
    );

    return;
};


const issueEmailVerification = async (user) => {

    if (user.isVerified) {
        throw new ApiError(
            400,
            "Email is already verified"
        );
    }

    const token = generateRandomToken();
    const hashedToken = await hashToken(token);

    await tokenRepository.deleteAllByUserIdAndType(
        user._id,
        "email_verification"
    );

    await tokenRepository.create({
        userId: user._id,
        type: "email_verification",
        hashedToken,
        expiresAt: new Date(
            Date.now() + 24 * 60 * 60 * 1000
        ),
    });

    const verificationUrl =
        `${process.env.CLIENT_URL}/verify-email?token=${token}&userId=${user._id}`;


    try {
        await emailService.sendVerificationEmail({
            name: user.name,
            email: user.email,
            verificationUrl,
        });
    } catch (error) {
        console.log("send verifcation error : ", error);
    }

};


const forgotPassword = async ({ email }) => {

    const user = await userRepository.findUserByEmail(email);

    // Don't reveal whether the email exists
    if (!user) {
        return;
    }

    const token = generateRandomToken();
    const hashedToken = await hashToken(token);

    await tokenRepository.deleteAllByUserIdAndType(
        user._id,
        "password_reset"
    );

    await tokenRepository.create({
        userId: user._id,
        type: "password_reset",
        hashedToken,
        expiresAt: new Date(
            Date.now() + 60 * 60 * 1000 // 1 hour
        ),
    });

    const resetPasswordUrl =
        `${process.env.CLIENT_URL}/reset-password?token=${token}&userId=${user._id}`;

    try {
        await emailService.sendResetPasswordEmail({
            name: user.name,
            email: user.email,
            resetPasswordUrl,
        });
    }catch(error){
        console.log("send verification error : " , error);
    }
    
};


const resetPassword = async ({
    userId,
    token,
    password,
}) => {

    const user = await userRepository.findUserById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const resetToken =
        await tokenRepository.findByUserIdAndType(
            userId,
            "password_reset"
        );

    if (!resetToken) {
        throw new ApiError(
            400,
            "Reset token not found or expired"
        );
    }

    const isMatch = await compareToken(
        token,
        resetToken.hashedToken
    );

    if (!isMatch) {
        throw new ApiError(
            400,
            "Invalid reset token"
        );
    }

    const hashedPassword = await bcrypt.hash(
        password,
        10
    );

    await userRepository.updatePassword(
        userId,
        hashedPassword
    );

    // Delete the used reset token
    await tokenRepository.deleteById(
        resetToken._id
    );

    // Logout from all devices
    await refreshTokenRepository.deleteAllByUser(
        userId
    );
};

const resendVerification = async ({ email }) => {

    const user = await userRepository.findUserByEmail(email);

    if (!user) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    if (user.isVerified) {
        throw new ApiError(
            400,
            "Email is already verified"
        );
    }

    await issueEmailVerification(user);
};

export default {
    register,
    login,
    refresh,
    logout,
    logoutAll,
    getCurrentUser,
    changePassword,
    updateProfile,

    verifyEmail,
    issueEmailVerification,
    forgotPassword,
    resetPassword,
    resendVerification
};