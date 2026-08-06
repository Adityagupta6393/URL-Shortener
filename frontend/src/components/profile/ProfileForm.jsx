import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { profileSchema } from "../../utils/validation/profile.schema";
import { updateProfile } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

function ProfileForm({ user }) {

    const { fetchCurrentUser } = useAuth();

    const {

        register,

        handleSubmit,

        reset,

        formState: {
            errors,
            isSubmitting,
        },

    } = useForm({

        resolver: zodResolver(profileSchema),

        defaultValues: {
            name: "",
        },

    });

    useEffect(() => {

        if (user) {

            reset({
                name: user.name,
            });

        }

    }, [user, reset]);

    const onSubmit = async (data) => {

        try {

            const response =
                await updateProfile(data);

            toast.success(response.message);

            await fetchCurrentUser();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update profile"
            );

        }

    };

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-6">
                Edit Profile
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >

                <div>

                    <label className="block mb-2 font-medium">

                        Name

                    </label>

                    <input
                        {...register("name")}
                        className="w-full border rounded-lg px-4 py-2"
                    />

                    {errors.name && (

                        <p className="text-red-500 text-sm mt-1">

                            {errors.name.message}

                        </p>

                    )}

                </div>

                <div>

                    <label className="block mb-2 font-medium">

                        Email

                    </label>

                    <input
                        value={user.email}
                        disabled
                        className="w-full border rounded-lg px-4 py-2 bg-gray-100"
                    />

                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >

                    {isSubmitting
                        ? "Saving..."
                        : "Save Changes"}

                </button>

            </form>

        </div>

    );

}

export default ProfileForm;