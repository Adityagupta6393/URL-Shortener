import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

import { loginSchema } from "../../utils/validation/login.schema";
import { loginUser } from "../../api/auth.api";

function Login() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    // const onSubmit = async (data) => {
    //     try {
    //         setLoading(true);

    //         const response = await loginUser(data);

    //         toast.success(response.message || "Login Successful");
    //         await fetchCurrentUser();

    //         setTimeout(() => {
    //             navigate("/dashboard");
    //         }, 1000);

    //     } catch (error) {

    //         toast.error(
    //             error.response?.data?.message ||
    //             "Login failed"
    //         );

    //     } finally {

    //         setLoading(false);

    //     }
    // };
    const onSubmit = async (data) => {
        console.log("On submit called with data:", data);
        try {

            setLoading(true);

            const response = await loginUser(data);

            setUser(response.data.user);

            toast.success(response.message || "Login successful");

            navigate("/dashboard", { replace: true });

        } catch (error) {
            console.error("Login error:", error);
            toast.error(
                error.response?.data?.message || "Login failed"
            );

        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Welcome Back
                </h1>

                <p className="text-gray-500 text-center mb-6">
                    Login to your account
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <div>
                        <label className="block mb-1 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password")}
                                className="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="text-right">
                        <Link
                            to="/forgot-password"
                            className="text-blue-600 hover:underline text-sm"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-200 text-white py-2 rounded-lg disabled:opacity-50"
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>

                </form>

                <p className="text-center mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;