import ApiResponse from "../../utils/ApiResponse.js";
import authService from "./auth.service.js";
import {
    cookieOptions,
    accessCookieOptions,
    refreshCookieOptions,
    clearAuthCookies
} from "../../config/cookies.js";

const register = async (req, res, next) => {

    try {

        const data = await authService.register(req.body);

        return res.status(201).json(
            new ApiResponse(
                201,
                "User registered successfully"
            )
        );

    } catch (error) {
        next(error);
    }

};

const login = async (req, res, next) => {

    try {

        const { user, accessToken, refreshToken } =
            await authService.login({
                ...req.body,
                ipAddress: req.ip,
                userAgent: req.get("User-Agent"),
            });

        return res
            .cookie(
                "accessToken",
                accessToken,
                accessCookieOptions
            )
            .cookie(
                "refreshToken",
                refreshToken,
                refreshCookieOptions
            )
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Login successful",
                    { user }
                )
            );

    } catch (err) {
        next(err);
    }

};

const refresh = async (req, res, next) => {
    try {

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw new ApiError(401, "Refresh token is required");
        }

        const { accessToken, refreshToken: newRefreshToken } =
            await authService.refresh({
                refreshToken,
                ipAddress: req.ip,
                userAgent: req.get("User-Agent"),
            });

        return res
            .cookie(
                "accessToken",
                accessToken,
                accessCookieOptions
            )
            .cookie(
                "refreshToken",
                newRefreshToken,
                refreshCookieOptions
            )
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Token refreshed successfully"
                )
            );

    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw new ApiError(401, "Refresh token is required");
        }

        await authService.logout({ refreshToken });

        return res
            .clearCookie("accessToken", cookieOptions)
            .clearCookie("refreshToken", cookieOptions)
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Logged out successfully"
                )
            );

    } catch (error) {
        next(error);
    }
};

const profile = async (req, res, next) => {
    try {

        const user = await authService.getCurrentUser(req.user.id);

        return res.status(200).json(
            new ApiResponse(
                200,
                "Current user retrieved successfully",
                { user }
            )
        );

    } catch (error) {
        next(error);
    }
};

const logoutAll = async (req, res, next) => {
    try {

        await authService.logoutAll(req.user.id);

        clearAuthCookies(res);

        return res.status(200).json(
            new ApiResponse(
                200,
                "Logged out from all devices successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        await authService.changePassword({ userId: req.user.id, currentPassword, newPassword });

        clearAuthCookies(res);

        return res.status(200).json(
            new ApiResponse(
                200,
                "Passowrd changed successfully"
            )
        )
    } catch(error){
        next(error);
    }
    
}

const updateProfile = async (req, res, next) => {
    try {

        const updatedUser = await authService.updateProfile({
            userId: req.user.id,
            ...req.body,
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                "Profile updated successfully",
                {
                    user: updatedUser,
                }
            )
        );

    } catch (error) {
        next(error);
    }
};

const verifyEmail = async (req, res, next) => {
    try {

        const { userId, token } = req.body;

        await authService.verifyEmail({
            token,
            userId,
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                "Email verified successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};


const forgotPassword = async (req, res, next) => {
    try {

        const { email } = req.body;

        await authService.forgotPassword({
            email,
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                "If an account with this email exists, a password reset link has been sent."
            )
        );

    } catch (error) {
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {

        const {
            userId,
            token,
            password,
        } = req.body;

        await authService.resetPassword({
            userId,
            token,
            password,
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                "Password reset successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};


const resendVerification = async (req, res, next) => {

    try {

        const { userId } = req.body;

        await authService.resendVerification({
            userId,
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                "Verification email sent successfully"
            )
        );

    } catch (error) {
        next(error);
    }

};

export default {
    register,
    login,
    refresh,
    logout,
    logoutAll,
    profile,
    changePassword,
    updateProfile,
    verifyEmail,
    forgotPassword,
    resetPassword,
    resendVerification
};