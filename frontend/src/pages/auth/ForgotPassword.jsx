import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { forgotPassword } from "../../api/auth.api";
import { forgotPasswordSchema } from "../../utils/validation/auth.schema";

function ForgotPassword() {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data) => {
        try {

            setLoading(true);

            const response = await forgotPassword(data.email);

            toast.success(response.message);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Forgot Password
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Enter your registered email address.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            {...register("email")}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                    >
                        {loading
                            ? "Sending..."
                            : "Send Reset Link"}
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

export default ForgotPassword;