import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { changePasswordSchema } from "../../utils/validation/changePassword.schema";
import { changePassword } from "../../api/auth.api";

function ChangePasswordCard() {

    const {

        register,

        handleSubmit,

        reset,

        formState: {
            errors,
            isSubmitting,
        },

    } = useForm({

        resolver: zodResolver(changePasswordSchema),

    });

    const onSubmit = async (data) => {

        try {

            const response =
                await changePassword(data);

            toast.success(response.message);

            reset();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to change password"
            );

        }

    };

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-6">

                Change Password

            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >

                <Input
                    label="Current Password"
                    type="password"
                    register={register("currentPassword")}
                    error={errors.currentPassword?.message}
                />

                <Input
                    label="New Password"
                    type="password"
                    register={register("newPassword")}
                    error={errors.newPassword?.message}
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    register={register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >

                    {isSubmitting
                        ? "Updating..."
                        : "Change Password"}

                </button>

            </form>

        </div>

    );

}

function Input({

    label,

    type,

    register,

    error,

}) {

    return (

        <div>

            <label className="block mb-2 font-medium">

                {label}

            </label>

            <input
                type={type}
                {...register}
                className="w-full border rounded-lg px-4 py-2"
            />

            {error && (

                <p className="text-red-500 text-sm mt-1">

                    {error}

                </p>

            )}

        </div>

    );

}

export default ChangePasswordCard;