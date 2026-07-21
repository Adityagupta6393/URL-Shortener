import ApiResponse from "../../utils/ApiResponse.js";
import urlService from "./url.service.js";

const createShortUrl = async (req, res, next) => {

    try {

        const url = await urlService.createShortUrl({

            userId: req.user.id,

            originalUrl: req.body.originalUrl,

            customAlias: req.body.customAlias,

            password : req.body.password,

            expireIn : req.body.expireIn,

        });

        return res.status(201).json(

            new ApiResponse(
                201,
                url,
                "Short URL created successfully"
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
            await urlService.redirectToOriginalUrl(
                req.params.shortCode
            );

        return res.redirect(originalUrl);

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
                urls,
                "URLs fetched successfully"
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
                url,
                "URL fetched successfully"
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
                null,
                "URL deleted successfully"
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
                data,
                "Password verified"
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
                data,
                "QR Code fetched successfully"
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
};