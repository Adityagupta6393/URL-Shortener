import api from "./axios";

export const getDashboardStats = async () => {
    const response = await api.get("/analytics/dashboard");
    return response.data;
};

export const getTopUrls = async () => {
    const response = await api.get("/analytics/top-urls");
    return response.data;
};

export const getRecentActivity = async () => {
    const response = await api.get("/analytics/recent-activity");
    return response.data;
};

export const getUrlAnalytics = async (id) => {
    const response = await api.get(`/urls/${id}/analytics`);
    return response.data;
};

export const getClickTrends = async (id) => {
    const response = await api.get(`/analytics/click-trends/${id}`);
    return response.data;
};

export const getOverallClickTrends = async () => {
    const response = await api.get("/analytics/click-trends");
    return response.data;
};

export const getOverallCountryStats = async () => {
    const response = await api.get("/analytics/countries");
    return response.data;
};

export const getOverallBrowserStats = async () => {
    const response = await api.get("/analytics/browsers");
    return response.data;
};

export const getOverallDeviceStats = async () => {
    const response = await api.get("/analytics/devices");
    return response.data;
};