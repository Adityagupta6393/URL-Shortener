import urlRepository from "../url/url.repository.js"
import analyticsRepository from "./analytics.repository.js";

const getDashboardStats = async (userId) => {

    const urls =
        await urlRepository.findByUserId(userId);

    const urlIds =
        urls.map(url => url._id);

    const [

        totalUrls,

        activeUrls,

        expiredUrls,

        passwordProtectedUrls,

        totalClicks,

    ] = await Promise.all([

        urlRepository.countByUser(userId),

        urlRepository.countActiveByUser(userId),

        urlRepository.countExpiredByUser(userId),

        urlRepository.countPasswordProtectedByUser(userId),

        analyticsRepository.countTotalClicks(urlIds),

    ]);

    return {

        totalUrls,

        activeUrls,

        expiredUrls,

        passwordProtectedUrls,

        totalClicks,

        averageClicksPerUrl:

            totalUrls === 0
                ? 0
                : Number(
                    (
                        totalClicks /
                        totalUrls
                    ).toFixed(2)
                ),

    };

};

const getTopUrls = async (userId, limit) => {

    const urls =
        await analyticsRepository.getTopUrls(userId, limit);

    return urls.map((url) => ({

        shortCode: url.shortCode,

        shortUrl:
            `${process.env.BASE_URL}/${url.shortCode}`,

        originalUrl: url.originalUrl,

        totalClicks: url.totalClicks,

    }));

};

const getClickTrends = async ({
    urlId,
    userId,
}) => {

    const url =
        await urlRepository.findByIdAndUser(
            urlId,
            userId
        );

    if (!url) {

        throw new ApiError(
            404,
            "URL not found"
        );

    }

    const trends =
        await analyticsRepository.getClickTrends(
            url._id
        );

    return trends.map((trend) => ({

        date: trend._id,

        clicks: trend.clicks,

    }));

};

const getRecentActivity = async (
    userId,
    limit = 20
) => {

    return await analyticsRepository.getRecentActivity(
        userId,
        limit
    );

};

export default {
    getDashboardStats,
    getTopUrls,
    getClickTrends,
    getRecentActivity,
}