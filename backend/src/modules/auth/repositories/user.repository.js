import User from "../auth.model.js"

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

const findAllByUserId = async (userId) => {
    return await Token.find({ userId });
};