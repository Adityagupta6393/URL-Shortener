import api from "./axios";

export const createShortUrl = async (data) => {
    const response = await api.post("/urls", data);
    return response.data;
};

export const getMyUrls = async () => {
    const response = await api.get("/urls");
    return response.data;
};

export const getUrlById = async (id) => {
    const response = await api.get(`/urls/${id}`);
    return response.data;
};

export const deleteUrl = async (id) => {
    const response = await api.delete(`/urls/${id}`);
    return response.data;
};

export const verifyUrlPassword = async (data) => {
    const response = await api.post("/urls/verify-password", data);
    return response.data;
};

export const getQrCode = async (id) => {
    const response = await api.get(`/urls/${id}/qr`);
    return response.data;
};

export const getUrlAnalytics = async (id) => {
    const response = await api.get(`/urls/${id}/analytics`);
    return response.data;
};

export const getUrlMetadata = async (shortCode) => {

    const response = await api.get(`/urls/code/${shortCode}`);

    return response.data;

};

