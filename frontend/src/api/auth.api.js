import api from "./axios";

export const registerUser = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
};

export const logoutUser = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
};

export const verifyEmail = async ({ token, userId }) => {
    const response = await api.post(
        `/auth/verify-email`, {
            token, 
            userId,
        }
    );

    return response.data;
};

export const resendVerificationEmail = async (userId) => {
    const response = await api.post("/auth/resend-verification", {
        userId,
    });

    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await api.post("/auth/forgot-password", {
        email,
    });

    return response.data;
};

export const resetPassword = async (data) => {
    const response = await api.post("/auth/reset-password", data);

    return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get("/auth/profile");
    return response.data;
};

export const updateProfile = async (data) => {
    const response = await api.patch("/auth/updateprofile", data);
    return response.data;
};

export const changePassword = async (data) => {

    const response = await api.post(
        "/auth/changepassword",
        data
    );

    return response.data;

};

export const logoutAll = async () => {

    const response = await api.post(
        "/auth/logoutall"
    );

    return response.data;

};

export const refresh = async () => {

    const response = await api.post("/auth/refresh");

    return response.data;

};
