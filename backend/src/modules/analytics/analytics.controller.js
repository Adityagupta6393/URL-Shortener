import analyticsService from "./analytics.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getDashboardStats = async (
    req,
    res,
    next
) => {

    try {

        const data =
            await analyticsService.getDashboardStats(
                req.user.id
            );

        return res.status(200).json(

            new ApiResponse(

                200,

                data,

                "Dashboard statistics fetched successfully"

            )

        );

    } catch (error) {

        next(error);

    }

};

const getTopUrls = async (
    req,
    res,
    next
) => {

    try {
        const limit = Number(req.query.limit) || 10;
        const data =
            await analyticsService.getTopUrls(
                req.user.id,
                limit
            );

        return res.status(200).json(

            new ApiResponse(

                200,

                data,

                "Top performing URLs fetched successfully"

            )

        );

    } catch (error) {

        next(error);

    }

};

const getClickTrends = async (
    req,
    res,
    next
) => {

    try {

        const data =
            await analyticsService.getClickTrends({

                urlId: req.params.urlId,

                userId: req.user.id,

            });

        return res.status(200).json(

            new ApiResponse(

                200,

                data,

                "Click trends fetched successfully"

            )

        );

    } catch (error) {

        next(error);

    }

};

const getRecentActivity = async (
    req,
    res,
    next
) => {

    try {

        const limit =
            Number(req.query.limit) || 20;

        const data =
            await analyticsService.getRecentActivity(

                req.user.id,

                limit

            );

        return res.status(200).json(

            new ApiResponse(

                200,

                data,

                "Recent activity fetched successfully"

            )

        );

    } catch (error) {

        next(error);

    }

};


export default {
    getDashboardStats,
    getTopUrls,
    getClickTrends,
    getRecentActivity,
}