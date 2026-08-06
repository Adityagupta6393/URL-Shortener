import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmail, resendVerificationEmail } from "../../api/auth.api";
function VerifyEmail() {

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
    const userId = searchParams.get("userId");
    
    const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState("loading");

    const [message, setMessage] = useState("");

    const handleResendVerification = async () => {
        try {
            console.log(userId);
            const response = await resendVerificationEmail(userId);

            toast.success(
                response.message || "Verification email sent."
            );


        } catch (error) {
            console.log("error hu mai");
            toast.error(
                error.response?.data?.message ||
                "Failed to resend verification email."
            );

        }
    };

    useEffect(() => {

        const verify = async () => {

            try {

                const response = await verifyEmail({
                    token,
                    userId,
                });

                setStatus("success");
                setMessage(
                    response.message || "Email verified successfully."
                );

                localStorage.removeItem("verificationEmail");
                localStorage.removeItem("verificationUserId");
            } catch (error) {

                const message =
                    error.response?.data?.message ||
                    "Verification failed.";

                setMessage(message);

                if (message === "Email is already verified") {

                    setStatus("alreadyVerified");

                } else {

                    setStatus("failed");

                }

            } finally {

                setLoading(false);

            }

        };

        if (token && userId) {

            verify();

        } else {

            setLoading(false);
            setStatus("failed");
            setMessage("Verification token or user ID is missing.");

        }

    }, [token]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-xl font-semibold">
                    Verifying your email...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">

                <h1
                    className={`text-3xl font-bold ${status === "success"
                        ? "text-green-600"
                        : status === "alreadyVerified"
                            ? "text-blue-600"
                            : "text-red-600"
                        }`}
                >
                    {status === "success" &&
                        "Email Verified ✅"}

                    {status === "alreadyVerified" &&
                        "Email Already Verified ℹ️"}

                    {status === "failed" &&
                        "Verification Failed ❌"}
                </h1>

                <p className="mt-4 text-gray-600">
                    {message}
                </p>

                {status === "success" && (
                    <Link
                        to="/login"
                        className="inline-block mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Go to Login
                    </Link>
                )}

                {status === "alreadyVerified" && (
                    <Link
                        to="/login"
                        className="inline-block mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Go to Login
                    </Link>
                )}

                {status === "failed" && (
                    <div className="mt-6 flex flex-col gap-3">

                        <button
                            type="button"
                            onClick={handleResendVerification}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Resend Verification Email
                        </button>

                        <Link
                            to="/login"
                            className="text-blue-600 hover:underline"
                        >
                            Back to Login
                        </Link>

                    </div>
                )}

            </div>

        </div>
    );
}

export default VerifyEmail;