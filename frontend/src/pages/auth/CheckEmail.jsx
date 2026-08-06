import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { resendVerificationEmail } from "../../api/auth.api.js";

function CheckEmail() {
    const location = useLocation();

    const email =
        location.state?.email ||
        localStorage.getItem("verificationEmail");

    const userId =
        location.state?.userId ||
        localStorage.getItem("verificationUserId");

    const [loading, setLoading] = useState(false);

    const handleResendVerification = async () => {
        try {
            setLoading(true);
            const response = await resendVerificationEmail(userId);

            toast.success(
                response.message ||
                    "Verification email sent successfully."
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to resend verification email."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">

                <div className="text-6xl mb-4">
                    📧
                </div>

                <h1 className="text-3xl font-bold mb-3">
                    Check Your Email
                </h1>

                <p className="text-gray-600">
                    We've sent a verification link to
                </p>

                <p className="font-semibold text-blue-600 mt-2 break-all">
                    {email || "your email"}
                </p>

                <p className="text-gray-500 mt-5">
                    Please open your inbox and click the verification link
                    to activate your account.
                </p>

                <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={loading || !userId}
                    className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
                >
                    {loading
                        ? "Sending..."
                        : "Resend Verification Email"}
                </button>

                <p className="mt-6 text-gray-600">
                    Already verified?
                </p>

                <Link
                    to="/login"
                    className="text-blue-600 hover:underline font-medium"
                >
                    Go to Login
                </Link>

            </div>
        </div>
    );
}

export default CheckEmail;