import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { registerSchema } from "../../utils/validation/auth.schema";
import { registerUser } from "../../api/auth.api";

function Register() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const response = await registerUser(data);

            toast.success(response.message);
            setTimeout(() => {

                navigate("/login");

            }, 2000);

            console.log(response);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    {...register("name")}
                />
                {errors.name && (
                    <p>{errors.name.message}</p>
                )}
            </div>

            <div>
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                />
                {errors.email && (
                    <p>{errors.email.message}</p>
                )}
            </div>

            <div>
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                />
                {errors.password && (
                    <p>{errors.password.message}</p>
                )}
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p>
                Already have an account?

                <Link to="/login">

                    Login

                </Link>
            </p>
        </form>
    );
}

export default Register;