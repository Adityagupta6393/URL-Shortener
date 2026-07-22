import { nanoid } from "nanoid";
import QRCode from "qrcode";
import ApiError from "../../utils/ApiError.js";
import urlRepository from "./url.repository.js";
import normalizeUrl from "../../utils/normalizeUrl.js";
import { RESERVED_ALIASES } from "../../constants/url.constants.js";
import bcrypt from "bcrypt";
import calculateExpiry from "../../utils/calculateExpiry.js";
import { get } from "mongoose";
import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";
import analyticsRepository from "../analytics/analytics.repository.js";
import mongoose from "mongoose";
import cacheService from "../../services/cache.service.js";


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

const redirectToOriginalUrl = async ({
    shortCode,
    ipAddress,
    userAgent,
    referer,
}) => {

    const cacheKey = `url:${shortCode}`;

    // ==========================
    // Check Redis
    // ==========================

    let url;

    const cachedUrl = await cacheService.get(cacheKey);

    if (cachedUrl) {

        console.log("Redis Cache HIT");

        url = JSON.parse(cachedUrl);

    } else {

        console.log("Redis Cache MISS");

        url = await urlRepository.findActiveByShortCode(
            shortCode
        );

        if (!url) {
            throw new ApiError(
                404,
                "Short URL not found"
            );
        }

        await cacheService.set(
            cacheKey,
            {
                _id: url._id,
                originalUrl: url.originalUrl,
                expiresAt: url.expiresAt,
                isPasswordProtected: url.isPasswordProtected,
            }
        );

    }

    // ==========================
    // Expiration Check
    // ==========================

    if (
        url.expiresAt &&
        new Date(url.expiresAt) < new Date()
    ) {
        throw new ApiError(
            410,
            "Short URL has expired"
        );
    }

    // ==========================
    // Increment Click Count
    // ==========================

    await urlRepository.incrementClickCount(
        url._id
    );

    // ==========================
    // Password Check
    // ==========================

    if (url.isPasswordProtected) {

        throw new ApiError(
            403,
            "Password required"
        );

    }

    // ==========================
    // Device Info
    // ==========================

    const parser = new UAParser(userAgent);

    const deviceInfo = {

        browser:
            parser.getBrowser().name || "Unknown",

        os:
            parser.getOS().name || "Unknown",

        device:
            parser.getDevice().type || "Desktop",

    };

    // ==========================
    // Geo Location
    // ==========================

    const geo = geoip.lookup(ipAddress);

    const country =
        geo?.country || "Unknown";

    const city =
        geo?.city || "Unknown";

    // ==========================
    // Store Analytics
    // ==========================

    await analyticsRepository.create({

        urlId: url._id,

        ipAddress,

        browser: deviceInfo.browser,

        os: deviceInfo.os,

        device: deviceInfo.device,

        country,

        city,

        referer,

    });

    // ==========================
    // Redirect
    // ==========================

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
    const del = await cacheService.del( `url:${url.shortCode}`);
    console.log(del);
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

const getUrlAnalytics = async ({
    urlId,
    userId,
}) => {

    const url = await urlRepository.findByIdAndUser(
        urlId,
        userId
    );

    if (!url) {
        throw new ApiError(
            404,
            "URL not found"
        );
    }

    const objectId = new mongoose.Types.ObjectId(urlId);

    const [
        totalClicks,
        recentClicks,
        countryStats,
        browserStats,
        deviceStats,
    ] = await Promise.all([

        analyticsRepository.countByUrl(objectId),

        analyticsRepository.getRecentClicks(objectId),

        analyticsRepository.getCountryStats(objectId),

        analyticsRepository.getBrowserStats(objectId),

        analyticsRepository.getDeviceStats(objectId),

    ]);

    return {

        url: {
            id: url._id,
            shortCode: url.shortCode,
            shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
            originalUrl: url.originalUrl,
        },

        totalClicks,

        countryStats: countryStats.map((item) => ({
            country: item._id,
            clicks: item.clicks,
        })),

        browserStats: browserStats.map((item) => ({
            browser: item._id,
            clicks: item.clicks,
        })),

        deviceStats: deviceStats.map((item) => ({
            device: item._id,
            clicks: item.clicks,
        })),

        recentClicks: recentClicks.map((click) => ({
            country: click.country,
            city: click.city,
            browser: click.browser,
            os: click.os,
            device: click.device,
            referer: click.referer,
            clickedAt: click.clickedAt,
        })),

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
    getUrlAnalytics,
};