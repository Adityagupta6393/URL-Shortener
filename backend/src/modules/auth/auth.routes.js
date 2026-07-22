import express from "express";

import authController from "./auth.controller.js";
import { registerValidator, loginValidator, changePasswordValidator, updateProfileValidator, verifyEmailValidator, resetPasswordValidator, resendVerificationValidator } from "./auth.validator.js";
import validate from "../../middleware/validate.js";
import authenticate from "../../middleware/auth.middleware.js";
import { authLimiter, registerLimiter, passwordLimiter, } from "../../middleware/rateLimiter.js";
const router = express.Router();

router.post(
    "/register",
    registerLimiter,
    registerValidator,
    validate,
    authController.register
);

router.post(
    "/login",
    authLimiter,
    loginValidator,
    validate,
    authController.login
);

router.get(
    "/profile",
    authenticate,
    authController.profile
);

router.post("/logout", authenticate, authController.logout);

router.post("/logoutall", authenticate, authController.logoutAll)

router.post("/refresh", authController.refresh);

router.post(
    "/changepassword", 
    authenticate, 
    changePasswordValidator, 
    validate, 
    authController.changePassword
);

router.patch(
    "/updateprofile",
    authenticate,
    updateProfileValidator,
    validate,
    authController.updateProfile
)

router.post(
    "/verify-email",
    verifyEmailValidator,
    validate,
    authController.verifyEmail
);

router.post(
    "/forgot-password",
    passwordLimiter,
    authController.forgotPassword
);

router.post(
    "/reset-password",
    passwordLimiter,
    resetPasswordValidator,
    validate,
    authController.resetPassword
);

router.post(
    "/resend-verification",
    authLimiter,
    resendVerificationValidator,
    validate,
    authController.resendVerification
);

export default router;