import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import VerifyEmail from "../pages/auth/VerifyEmail";
import CheckEmail from "../pages/auth/CheckEmail";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyUrls from "../pages/urls/MyUrls";
import Profile from "../pages/dashboard/Profile";
import Settings from "../pages/dashboard/Settings"
import Analytics from "../pages/analytics/Analytics";
import DashboardAnalytics from "../pages/analytics/DashboardAnalytics";
import Landing from "../pages/Landing";
import GuestRoute from "../components/GuestRoute";
import PasswordProtected from "../pages/redirect/PasswordProtected";
import RedirectHandler from "../pages/redirect/RedirectHandler";
import NotFound from "../pages/NotFound";

function AppRoutes() {
    return (
        <BrowserRouter >

            <Routes>

                {/* Public */}

                <Route path="/" element={<Landing />} />

                <Route
                    path="/login"
                    element={
                        <GuestRoute>
                            <Login />
                        </GuestRoute>
                    }
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/verify-email"
                    element={<VerifyEmail />}
                />

                <Route
                    path="/check-email"
                    element={<CheckEmail />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />

                {/* Public Redirect Routes */}

                <Route
                    path="/protected/:shortCode"
                    element={<PasswordProtected />}
                />

                <Route
                    path="/:shortCode"
                    element={<RedirectHandler />}
                />

                {/* Dashboard */}

                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/my-urls"
                        element={<MyUrls />}
                    />

                    <Route
                        path="/analytics/:id"
                        element={<Analytics />}
                    />

                    <Route
                        path="/dashboard-analytics"
                        element={<DashboardAnalytics />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />

                </Route>

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;