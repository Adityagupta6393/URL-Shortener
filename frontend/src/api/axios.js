// import axios from "axios";

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     withCredentials: true,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// // Refresh token request
// const refreshAccessToken = async () => {

//     await axios.post(
//         `${import.meta.env.VITE_API_URL}/auth/refresh`,
//         {},
//         {
//             withCredentials: true,
//         }
//     );

// };

// // Response Interceptor
// api.interceptors.response.use(

//     (response) => response,

//     async (error) => {

//         const originalRequest = error.config;

//         // Access token expired
//         if (
//             error.response?.status === 401 &&
//             !originalRequest._retry
//         ) {

//             originalRequest._retry = true;

//             try {

//                 await refreshAccessToken();

//                 // Retry original request
//                 return api(originalRequest);

//             } catch (refreshError) {

//                 window.location.href = "/login";

//                 return Promise.reject(refreshError);

//             }

//         }

//         return Promise.reject(error);

//     }

// );

// export default api;

import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Refresh access token
const refreshAccessToken = async () => {

    await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        {},
        {
            withCredentials: true,
        }
    );

};

//hit url
export const hitUrlOnce = async (shortCode) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/${shortCode}`);
    return response.data;
}

// Response Interceptor
api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        // If there is no response (network/server error)
        if (!error.response) {
            return Promise.reject(error);
        }

        // Don't try to refresh these endpoints
        const excludedRoutes = [
            "/auth/login",
            "/auth/register",
            "/auth/refresh",
            "/auth/forgot-password",
            "/auth/reset-password",
            "/auth/verify-email",
            "/auth/resend-verification",
        ];

        const shouldSkipRefresh = excludedRoutes.some((route) =>
            originalRequest.url.includes(route)
        );

        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            !shouldSkipRefresh
        ) {

            originalRequest._retry = true;

            try {

                await refreshAccessToken();

                // Retry original request
                return api(originalRequest);

            } catch (refreshError) {

                // Let ProtectedRoute / GuestRoute decide what to do
                return Promise.reject(refreshError);

            }

        }

        return Promise.reject(error);

    }

);

export default api;