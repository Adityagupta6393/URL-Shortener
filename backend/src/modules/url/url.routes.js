import express from "express";

import authenticate from "../../middleware/auth.middleware.js";

import urlController from "./url.controller.js";

import {
    createUrlValidation,
} from "./url.validation.js";

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

export default router;