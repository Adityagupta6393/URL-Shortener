import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 10,

    standardHeaders: true,

    legacyHeaders: false,

    message: {

        statusCode: 429,

        message: "Too many authentication requests. Please try again later."

    }

});

export const registerLimiter = rateLimit({

    windowMs: 60 * 60 * 1000,

    max: 5,

    standardHeaders: true,

    legacyHeaders: false,

    message: {

        statusCode: 429,

        message: "Too many registration attempts."

    }

});

export const passwordLimiter = rateLimit({

    windowMs: 60 * 60 * 1000,

    max: 5,

    standardHeaders: true,

    legacyHeaders: false,

    message: {

        statusCode: 429,

        message: "Too many password reset requests."

    }

});

export const redirectLimiter = rateLimit({

    windowMs: 60 * 1000,

    max: 200,

    standardHeaders: true,

    legacyHeaders: false,

    message: {

        statusCode: 429,

        message: "Too many requests."

    }

});