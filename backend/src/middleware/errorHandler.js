import HTTP_STATUS from "../constants/httpStatus.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

export default errorHandler;