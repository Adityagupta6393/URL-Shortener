import { body } from "express-validator";
import validate from "../../middleware/validate.js";

const createUrlValidation = [

    body("originalUrl")
        .trim()
        .notEmpty()
        .withMessage("Original URL is required")
        .isURL({
            require_protocol: true,
        })
        .withMessage("Valid URL is required"),

    body("customAlias")
        .optional()
        .trim()
        .isLength({
            min: 3,
            max: 30,
        })
        .withMessage(
            "Custom alias must be between 3 and 30 characters"
        )
        .matches(/^[a-zA-Z0-9_-]+$/)
        .withMessage(
            "Custom alias can only contain letters, numbers, hyphens and underscores"
        ),

    validate,
];

const verifyUrlPasswordValidation = [ 
    body("password")
        .optional()
        .isLength({
            min: 6,
            max: 50
        })
        .withMessage(
            "Password must be between 6 and 50 characters"
        ),
];


const expiresAtValidation = [
    body("expireIn")
    .optional()
    .matches(/^\d+(m|h|d)$/)
    .withMessage(
        "expireIn must be like 30m, 12h or 7d"
    ),
]



export {
    createUrlValidation,
    verifyUrlPasswordValidation,
    expiresAtValidation
};