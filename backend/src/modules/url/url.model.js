import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        originalUrl: {
            type: String,
            required: true,
            trim: true,
        },

        shortCode: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        customAlias: {
            type: Boolean,
            default: false,
        },

        title: {
            type: String,
            default: "",
        },

        qrCode: {
            type: String,
            default: "",
        },

        expiresAt: {
            type: Date,
            default: null,
        },

        password: {
            type: String,
            default: null,
        },

        clickCount: {
            type: Number,
            default: 0,
        },

        lastAccessedAt: {
            type: Date,
            default: null,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Url", urlSchema);