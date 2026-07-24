import api from "./axios";

export const pingServer = async () => {
    const response = await api.get("/health");
    return response.data;
};

