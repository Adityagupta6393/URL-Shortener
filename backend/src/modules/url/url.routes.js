import express from "express";

import authenticate from "../../middleware/auth.middleware.js";

import urlController from "./url.controller.js";

import validate from "../../middleware/validate.js";
import { verifyUrlPasswordValidation } from "./url.validation.js";

import { createUrlValidation, } from "./url.validation.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    createUrlValidation,
    urlController.createShortUrl
);

router.get(
    "/",
    authenticate,
    urlController.getMyUrls
);

router.get(
    "/:id",
    authenticate,
    urlController.getUrlById
);

router.delete(
    "/:id",
    authenticate,
    urlController.deleteUrl
);

router.post(
    "/verify-password",
    verifyUrlPasswordValidation,
    validate,
    urlController.verifyUrlPassword
);

router.get(
    "/:id/qr",
    authenticate,
    urlController.getQrCode
);

router.get(
    "/:id/analytics",
    authenticate,
    urlController.getUrlAnalytics
);


export default router;