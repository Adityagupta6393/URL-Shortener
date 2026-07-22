import Analytics from "./analytics.model.js";
import mongoose from "mongoose";


const create = (data) => {

    return Analytics.create(data);

};

const countByUrl = (urlId) => {

    return Analytics.countDocuments({
        urlId,
    });

};

const findByUrl = (urlId) => {

    return Analytics.find({
        urlId,
    }).sort({
        createdAt: -1,
    });

};

const getRecentClicks = (urlId) => {

    return Analytics.find({
        urlId,
    })
    .sort({
        createdAt: -1,
    })
    .limit(10);

};

const getCountryStats = (urlId) => {

    return Analytics.aggregate([

        {
            $match: {
                urlId,
            },
        },

        {
            $group: {
                _id: "$country",
                clicks: {
                    $sum: 1,
                },
            },
        },

        {
            $sort: {
                clicks: -1,
            },
        },

    ]);

};

const getBrowserStats = (urlId) => {

    return Analytics.aggregate([

        {
            $match: {
                urlId,
            },
        },

        {
            $group: {
                _id: "$browser",
                clicks: {
                    $sum: 1,
                },
            },
        },

        {
            $sort: {
                clicks: -1,
            },
        },

    ]);

};

const getDeviceStats = (urlId) => {

    return Analytics.aggregate([

        {
            $match: {
                urlId,
            },
        },

        {
            $group: {
                _id: "$device",
                clicks: {
                    $sum: 1,
                },
            },
        },

        {
            $sort: {
                clicks: -1,
            },
        },

    ]);

};

const countTotalClicks = async (urlIds) => {

    return Analytics.countDocuments({

        urlId: {
            $in: urlIds,
        },

    });

};

const getTopUrls = async (userId, limit = 10) => {

    return Analytics.aggregate([

        {
            $lookup: {

                from: "urls",

                localField: "urlId",

                foreignField: "_id",

                as: "url",

            },

        },

        {
            $unwind: "$url",
        },

        {
            $match: {

                "url.userId": new mongoose.Types.ObjectId(userId),

            },

        },

        {
            $group: {

                _id: "$urlId",

                totalClicks: {
                    $sum: 1,
                },

                shortCode: {
                    $first: "$url.shortCode",
                },

                originalUrl: {
                    $first: "$url.originalUrl",
                },

            },

        },

        {
            $sort: {

                totalClicks: -1,

            },

        },

        {
            $limit: limit,
        },

    ]);

};

const getClickTrends = (urlId) => {

    return Analytics.aggregate([

        {
            $match: {
                urlId,
            },
        },

        {
            $group: {

                _id: {

                    $dateToString: {

                        format: "%Y-%m-%d",

                        date: "$clickedAt",

                    },

                },

                clicks: {
                    $sum: 1,
                },

            },

        },

        {
            $sort: {
                "_id": 1,
            },
        },

    ]);

};

const getRecentActivity = (
    userId,
    limit = 20
) => {

    return Analytics.aggregate([

        {
            $lookup: {

                from: "urls",

                localField: "urlId",

                foreignField: "_id",

                as: "url",

            },

        },

        {
            $unwind: "$url",
        },

        {
            $match: {

                "url.userId":
                    new mongoose.Types.ObjectId(userId),

            },

        },

        {
            $sort: {

                clickedAt: -1,

            },

        },

        {
            $limit: limit,

        },

        {
            $project: {

                _id: 0,

                shortCode: "$url.shortCode",

                originalUrl: "$url.originalUrl",

                country: 1,

                city: 1,

                browser: 1,

                os: 1,

                device: 1,

                referer: 1,

                clickedAt: 1,

            },

        },

    ]);

};

export default {
    create,
    countByUrl,
    findByUrl,
    getRecentClicks,
    getCountryStats,
    getBrowserStats,
    getDeviceStats,
    countTotalClicks,
    getTopUrls,
    getClickTrends,
    getRecentActivity,
};