import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        hashedToken: {
            type: String,
            required: true,
        },

        ipAddress: {
            type: String,
            required: true,
        },

        deviceInfo: {
            browser: {
                type: String,
                default: "Unknown",
            },
            os: {
                type: String,
                default: "Unknown",
            },
            device: {
                type: String,
                default: "Unknown",
            },
        },

        lastUsedAt: {
            type: Date,
            default: Date.now,
        },

        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

refreshTokenSchema.index({ userId: 1 });

refreshTokenSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

const RefreshToken = mongoose.model(
    "RefreshToken",
    refreshTokenSchema
);

export default RefreshToken;