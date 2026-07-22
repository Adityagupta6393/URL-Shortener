import express from "express";
import authenticate from "../../middleware/auth.middleware.js";
import analyticsController from "./analytics.controller.js";

const router = express.Router();

router.get(
    "/dashboard",
    authenticate,
    analyticsController.getDashboardStats
);

router.get(
    "/top-urls",
    authenticate,
    analyticsController.getTopUrls
);

router.get(
    "/click-trends/:urlId",
    authenticate,
    analyticsController.getClickTrends
);

router.get(
    "/recent-activity",
    authenticate,
    analyticsController.getRecentActivity
);

export default router;