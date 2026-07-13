import ApiResponse from "../utils/ApiResponse.js";
import authService from "../services/auth.service.js";

const register = async (req, res, next) => {

    try {

        const data = await authService.register(req.body);

        return res.status(201).json(
            new ApiResponse(
                201,
                "User registered successfully"
            )
        );

    } catch (error) {
        next(error);
    }

};

const login = async (req, res, next) => {

    try {

        const data = await authService.login(req.body);

        res.status(200).json(
            new ApiResponse(
                200,
                "Login successful",
                data
            )
        );

    } catch (err) {
        next(err);
    }

};

export default {
    register,
    login,
};