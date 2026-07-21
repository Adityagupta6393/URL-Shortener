import Token from "../models/token.model.js"

const create = async (data) => {
    return await Token.create(data);
};

const findByUserIdAndType = async (
    userId,
    type
) => {
    return await Token.findOne({
        userId,
        type,
    });
};

const deleteByUserIdAndType = async (
    userId,
    type
) => {
    return await Token.deleteOne({
        userId,
        type,
    });
};

const deleteById = async (id) => {
    return await Token.findByIdAndDelete(id);
};

const findAllByUserIdAndType = async (userId, type) => {
    return await Token.find({
        userId,
        type,
    });
};

const deleteAllByUserIdAndType = async (userId, type) => {
    return await Token.deleteMany({
        userId,
        type,
    });
};

const findAllByUserId = async (userId) => {
    return await Token.find({ userId });
};

export default {
    create,
    findAllByUserId,
    findByUserIdAndType,
    deleteByUserIdAndType,
    deleteById,
    findAllByUserIdAndType,
    deleteAllByUserIdAndType
};