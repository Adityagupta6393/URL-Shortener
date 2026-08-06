import ApiResponse from "../../utils/ApiResponse.js";
import urlService from "./url.service.js";

const createShortUrl = async (req, res, next) => {

    try {

        const url = await urlService.createShortUrl({

            userId: req.user.id,

            originalUrl: req.body.originalUrl,

            customAlias: req.body.customAlias,

            password: req.body.password,

            expireIn: req.body.expireIn,

        });

        return res.status(201).json(

            new ApiResponse(
                201,
                "Short URL created successfully",
                url
            )

        );

    } catch (error) {
        next(error);
    }

};

const redirectToOriginalUrl = async (
    req,
    res,
    next
) => {

    try {

        const originalUrl =
            await urlService.redirectToOriginalUrl({

                shortCode: req.params.shortCode,

                ipAddress: req.ip,

                userAgent: req.get("User-Agent"),

                referer: req.get("Referer") || "",

            });

        return res.status(200).json(
            new ApiResponse(
                200,
                "Redirect URL fetched successfully",
                originalUrl
            )
        );

    } catch (error) {
        next(error);
    }

};

const getMyUrls = async (req, res, next) => {

    try {

        const urls = await urlService.getMyUrls(
            req.user.id
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                "URLs fetched successfully",
                urls
            )
        );

    } catch (error) {
        next(error);
    }

};

const getUrlById = async (
    req,
    res,
    next
) => {

    try {

        const url =
            await urlService.getUrlById(
                req.params.id,
                req.user.id
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                "URL fetched successfully",
                url
            )
        );

    } catch (error) {
        next(error);
    }

};

const deleteUrl = async (
    req,
    res,
    next
) => {

    try {

        await urlService.deleteUrl(
            req.params.id,
            req.user.id
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                "URL deleted successfully",
                null
            )
        );

    } catch (error) {
        next(error);
    }

};


const verifyUrlPassword = async (
    req,
    res,
    next
) => {

    try {

        const data =
            await urlService.verifyUrlPassword(
                req.body
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                "Password verified",
                data
            )
        );

    } catch (error) {

        next(error);

    }

};

const getQrCode = async (
    req,
    res,
    next
) => {

    try {

        const data =
            await urlService.getQrCode({

                urlId: req.params.id,
                userId: req.user.id,

            });

        return res.status(200).json(

            new ApiResponse(
                200,
                "QR Code fetched successfully",
                data
            )

        );

    } catch (error) {

        next(error);

    }

};

const getUrlAnalytics = async (
    req,
    res,
    next
) => {

    try {

        const data =
            await urlService.getUrlAnalytics({

                urlId: req.params.id,

                userId: req.user.id,

            });

        return res.status(200).json(

            new ApiResponse(

                200,

                "Analytics fetched successfully",
                data

            )

        );

    } catch (error) {

        next(error);

    }

};

const getUrlMetadata = async (req, res, next) => {

    try {

        const { shortCode } = req.params;

        const result = await urlService.getUrlMetadata(shortCode);

        res.status(200).json(
            new ApiResponse(
                200,
                "Url Meta data fetched successfully",
                result
            )
        );

    } catch (error) {

        next(error);

    }

};


export default {
    createShortUrl,
    redirectToOriginalUrl,
    getMyUrls,
    getUrlById,
    deleteUrl,
    verifyUrlPassword,
    getQrCode,
    getUrlAnalytics,
    getUrlMetadata
};