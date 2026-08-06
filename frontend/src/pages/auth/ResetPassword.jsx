import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { resetPassword } from "../../api/auth.api";
import { resetPasswordSchema } from "../../utils/validation/auth.schema";

function ResetPassword() {
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
    const userId = searchParams.get("userId");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const response = await resetPassword({
                userId,
                token,
                password: data.password,
            });

            toast.success(response.message);
            setSuccess(true);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to reset password."
            );
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">

                    <div className="text-6xl mb-4">
                        ✅
                    </div>

                    <h1 className="text-3xl font-bold text-green-600 mb-3">
                        Password Reset Successful
                    </h1>

                    <p className="text-gray-600 mb-8">
                        Your password has been updated successfully.
                        You can now log in using your new password.
                    </p>

                    <Link
                        to="/login"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        Go to Login
                    </Link>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Reset Password
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Enter your new password.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <div>
                        <label className="block mb-2 font-medium">
                            New Password
                        </label>

                        <input
                            type="password"
                            {...register("password")}
                            placeholder="Enter new password"
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            {...register("confirmPassword")}
                            placeholder="Confirm new password"
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Reset Password"}
                    </button>

                </form>

                <p className="text-center mt-6">
                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline"
                    >
                        Back to Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default ResetPassword;