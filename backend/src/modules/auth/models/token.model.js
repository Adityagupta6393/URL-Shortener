import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        type: {
            type: String,
            enum: [
                "email_verification",
                "password_reset",
            ],
            required: true,
        },

        hashedToken: {
            type: String,
            required: true,
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

tokenSchema.index({ userId: 1 });

tokenSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

const Token = mongoose.model(
    "Token",
    tokenSchema
);

export default Token;