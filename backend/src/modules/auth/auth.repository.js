import User from "./auth.model.js";

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const createUser = async (userData) => {
    return await User.create(userData);
};

const findUserById = async (id) => {
    return await User.findById(id);
};

const updatePassword = async (userId, hashedPassword) => {
    return await User.findByIdAndUpdate(
        userId,
        {
            password: hashedPassword,
        },
        {
            new: true,
            runValidators: true,
        }
    );
};

const updateProfile = async (userId, updates) => {
    return await User.findByIdAndUpdate(
        userId,
        updates,
        {
            returnDocument : "after",
            runValidators: true,
        }
    );
};

const verifyUser = async (userId) => {
    return await User.findByIdAndUpdate(
        userId,
        {
            isVerified: true,
        },
        {
            new: true,
        }
    );
};

export default {
    findUserByEmail,
    createUser,
    findUserById,
    updatePassword,
    updateProfile,
    verifyUser
};