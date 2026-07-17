import express from "express";

import authController from "./auth.controller.js";
import { registerValidator, loginValidator } from "./auth.validator.js";
import validate from "../../middleware/validate.js";
import authenticate from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post(
    "/register",
    registerValidator,
    validate,
    authController.register
);

router.post(
    "/login",
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

router.post("/refresh", authController.refresh);

export default router;