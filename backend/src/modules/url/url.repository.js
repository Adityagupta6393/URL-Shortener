import Url from "./url.model.js";

const create = async (data) => {
    return await Url.create(data);
};

const findById = async (id) => {
    return await Url.findById(id);
};

const findByShortCode = async (shortCode) => {
    return await Url.findOne({
        shortCode,
        isActive: true,
    });
};

const findByUserId = async (userId) => {
    return await Url.find({
        userId,
        isActive: true,
    }).sort({
        createdAt: -1,
    });
};

const update = async (id, updates) => {
    return await Url.findByIdAndUpdate(
        id,
        updates,
        {
            returnDocument : 'after',
        }
    );
};

const deleteById = async (id) => {

    return await Url.findByIdAndDelete(id);

};

const incrementClickCount = async (id) => {
    return await Url.findByIdAndUpdate(
        id,
        {
            $inc: {
                clickCount: 1,
            },
            lastAccessedAt: new Date(),
        },
        {
            returnDocument : 'after',
        }
    );
};

const findActiveByShortCode = async (shortCode) => {

    return await Url.findOne({
        shortCode,
        isActive: true,
    });

};

const findByIdAndUser = async (
    id,
    userId
) => {

    return await Url.findOne({
        _id: id,
        userId,
        isActive: true,
    });

};

const findByUserAndOriginalUrl = async (
    userId,
    originalUrl
) => {

    return await Url.findOne({
        userId,
        originalUrl,
    });

};

const countByUser = (userId) => {

    return Url.countDocuments({
        userId,
    });

};

const countActiveByUser = (userId) => {

    return Url.countDocuments({

        userId,

        $or: [

            {
                expiresAt: null,
            },

            {
                expiresAt: {
                    $gt: new Date(),
                },
            },

        ],

    });

};

const countExpiredByUser = (userId) => {

    return Url.countDocuments({

        userId,

        expiresAt: {
            $lte: new Date(),
        },

    });

};

const countPasswordProtectedByUser = (userId) => {

    return Url.countDocuments({

        userId,

        isPasswordProtected: true,

    });

};

export default {
    create,
    findById,
    findByShortCode,
    findByUserId,
    update,
    deleteById,
    incrementClickCount,
    findActiveByShortCode,
    findByIdAndUser,
    findByUserAndOriginalUrl,
    countByUser,
    countActiveByUser,
    countExpiredByUser,
    countPasswordProtectedByUser,
    
};