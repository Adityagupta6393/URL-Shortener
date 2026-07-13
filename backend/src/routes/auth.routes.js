import express from "express";

import authController from "../controllers/auth.controller.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import validate from "../middleware/validate.js";
import authenticate from "../middleware/auth.middleware.js";

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
    (req, res) => {

        res.json({
            success: true,
            user: req.user
        });

    }
);

export default router;