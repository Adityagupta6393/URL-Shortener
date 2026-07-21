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

export {
    createUrlValidation,
};