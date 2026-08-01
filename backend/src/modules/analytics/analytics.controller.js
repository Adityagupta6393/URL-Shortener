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
                "Dashboard statistics fetched successfully",
                data

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
                "Top performing URLs fetched successfully",
                data

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
                "Click trends fetched successfully",
                data

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
                "Recent activity fetched successfully",
                data

            )

        );

    } catch (error) {

        next(error);

    }

};

const getOverallClickTrends = async (req, res) => {
    const data = await analyticsService.getOverallClickTrends(
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Overall click trends fetched successfully",
            data
        ));
};

const getCountryStats = async (req, res) => {

    const data = await analyticsService.getCountryStats(
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Country statistics fetched successfully",
            data
        )
    );

};

const getBrowserStats = async (req, res) => {

    const data = await analyticsService.getBrowserStats(
        req.user.id
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "Browser statistics fetched successfully",
            data
        )
    );

};

const getDeviceStats = async (req, res) => {

    const data = await analyticsService.getDeviceStats(
        req.user.id
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "Device statistics fetched successfully",
            data
        )
    );

};


export default {
    getDashboardStats,
    getTopUrls,
    getClickTrends,
    getRecentActivity,
    getOverallClickTrends,
    getCountryStats,
    getBrowserStats,
    getDeviceStats
}