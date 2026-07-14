import bcrypt from "bcrypt";
import ApiError from "../../utils/ApiError.js";
import userRepository from "./auth.repository.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/jwt.js";

const register = async ({ name, email, password }) => {

    const existingUser = await userRepository.findUserByEmail(email);

    if (existingUser) {
        throw new ApiError(409, "Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser({
        name,
        email,
        password: hashedPassword,
    });

    return;
};

const login = async ({ email, password }) => {

    const user = await userRepository.findUserByEmail(email);

    if (!user)
        throw new ApiError(401, "Invalid credentials");

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch)
        throw new ApiError(401, "Invalid credentials");

    const accessToken = generateAccessToken({
        id: user._id,
        role: user.role,
    });

    const refreshToken = generateRefreshToken({
        id: user._id,
    });

    return {
        user,
        accessToken,
        refreshToken,
    };
};

export default {
    register,
    login,
};