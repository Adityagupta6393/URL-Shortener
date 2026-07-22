import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({

    urlId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Url",
        required: true,
        index: true,
    },

    ipAddress: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        default: "Unknown",
    },

    city: {
        type: String,
        default: "Unknown",
    },

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
        default: "Desktop",
    },

    referer: {
        type: String,
        default: "",
    },

    clickedAt: {
        type: Date,
        default: Date.now,
    },

}, {
    timestamps: true,
});

export default mongoose.model(
    "Analytics",
    analyticsSchema
);