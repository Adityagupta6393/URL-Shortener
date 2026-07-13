import User from "../models/user.model.js";

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const createUser = async (userData) => {
    return await User.create(userData);
};

const findUserById = async (id) => {
    return await User.findById(id);
};

export default {
    findUserByEmail,
    createUser,
    findUserById,
};