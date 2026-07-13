import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new ApiError(
                400,
                errors.array().map((e) => e.msg).join(", ")
            )
        );
    }

    next();
};

export default validate;