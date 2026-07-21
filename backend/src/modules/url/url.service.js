import { nanoid } from "nanoid";
import QRCode from "qrcode";

import ApiError from "../../utils/ApiError.js";
import urlRepository from "./url.repository.js";
import normalizeUrl from "../../utils/normalizeUrl.js";
import { RESERVED_ALIASES } from "../../constants/url.constants.js";
import bcrypt from "bcrypt";
import calculateExpiry from "../../utils/calculateExpiry.js";
import { get } from "mongoose";

const BASE_URL = process.env.BASE_URL;

const createShortUrl = async ({
    userId,
    originalUrl,
    customAlias,
    password,
    expireIn
}) => {

    originalUrl = normalizeUrl(originalUrl);

    let shortCode;

    if (customAlias) {

        const alias = customAlias.toLowerCase();

        if (RESERVED_ALIASES.includes(alias)) {

            throw new ApiError(
                400,
                "This custom alias is reserved"
            );

        }

    }

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
    const existingUrl =
        await urlRepository.findByUserAndOriginalUrl(
            userId,
            originalUrl
        );

    if (existingUrl) {
        return existingUrl;
    }

    let hashedPassword = null;

    if (password) {

        hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

    }
    const shortUrl = `${BASE_URL}/${shortCode}`;

    const qrCode =
        await QRCode.toDataURL(shortUrl);

    const expiresAt = calculateExpiry(expireIn);

    return await urlRepository.create({

        userId,

        originalUrl,

        shortCode,

        customAlias: !!customAlias,

        qrCode,

        expiresAt,

        password: hashedPassword,

        isPasswordProtected: Boolean(hashedPassword),

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

    if (
        url.isPasswordProtected
    ) {

        throw new ApiError(
            403,
            "Password required"
        );

    }

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

const verifyUrlPassword = async ({
    shortCode,
    password,
}) => {

    const url =
        await urlRepository.findByShortCode(
            shortCode
        );

    if (!url) {
        throw new ApiError(
            404,
            "URL not found"
        );
    }

    if (!url.isPasswordProtected) {
        throw new ApiError(
            400,
            "URL is not password protected"
        );
    }

    const isMatch =
        await bcrypt.compare(
            password,
            url.password
        );

    if (!isMatch) {

        throw new ApiError(
            401,
            "Invalid password"
        );

    }

    return {
        originalUrl:
            url.originalUrl,
    };

};


const getQrCode = async ({
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

    return {
        qrCode: url.qrCode,
    };

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