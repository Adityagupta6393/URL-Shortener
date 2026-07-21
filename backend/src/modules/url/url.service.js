import { nanoid } from "nanoid";
import QRCode from "qrcode";

import ApiError from "../../utils/ApiError.js";

import urlRepository from "./url.repository.js";

const BASE_URL = process.env.BASE_URL;

const createShortUrl = async ({
    userId,
    originalUrl,
    customAlias,
}) => {

    let shortCode;

    if (customAlias) {

        const existing =
            await urlRepository.findByShortCode(
                customAlias
            );

        if (existing) {

            throw new ApiError(
                409,
                "Custom alias already exists"
            );

        }

        shortCode = customAlias;

    } else {
        shortCode = await generateUniqueShortCode();
    }

    const shortUrl =
        `${BASE_URL}/${shortCode}`;

    const qrCode =
        await QRCode.toDataURL(shortUrl);

    return await urlRepository.create({

        userId,

        originalUrl,

        shortCode,

        customAlias: !!customAlias,

        qrCode,

    });

};

const generateUniqueShortCode = async () => {

    let shortCode;
    let exists = true;

    while (exists) {

        shortCode = nanoid(7);

        exists = await urlRepository.findByShortCode(
            shortCode
        );
    }

    return shortCode;
};

const redirectToOriginalUrl = async (shortCode) => {

    const url =
        await urlRepository.findActiveByShortCode(
            shortCode
        );

    if (!url) {
        throw new ApiError(
            404,
            "Short URL not found"
        );
    }

    if (
        url.expiresAt &&
        url.expiresAt < new Date()
    ) {
        throw new ApiError(
            410,
            "Short URL has expired"
        );
    }

    await urlRepository.incrementClickCount(
        url._id
    );
    //Later we'll do this
    // await Promise.all([
    //     urlRepository.incrementClickCount(url._id),
    //     clickRepository.create({
    //         urlId: url._id,
    //         ipAddress,
    //         browser,
    //         os,
    //         device,
    //         country,
    //         referer,
    //     }),
    // ]);

    return url.originalUrl;
};

const getMyUrls = async (userId) => {

    return await urlRepository.findByUserId(userId);

};

const getUrlById = async (
    id,
    userId
) => {

    const url =
        await urlRepository.findByIdAndUser(
            id,
            userId
        );

    if (!url) {

        throw new ApiError(
            404,
            "URL not found"
        );

    }

    return url;

};

const deleteUrl = async (
    id,
    userId
) => {

    const url =
        await urlRepository.findByIdAndUser(
            id,
            userId
        );

    if (!url) {
        throw new ApiError(
            404,
            "URL not found"
        );
    }

    await urlRepository.deleteById(id);

};

export default {
    createShortUrl,
    redirectToOriginalUrl,
    getMyUrls,
    getUrlById,
    deleteUrl,
};