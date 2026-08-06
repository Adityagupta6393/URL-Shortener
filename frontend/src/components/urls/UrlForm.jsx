import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { createUrlSchema } from "../../utils/validation/url.schema";
import { createShortUrl } from "../../api/url.api";

function UrlForm({ onSuccess, onClose }) {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createUrlSchema),
        defaultValues: {
            originalUrl: "",
            customAlias: "",
            password: "",
            expireIn: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const payload = {
                originalUrl: data.originalUrl,
            };

            if (data.customAlias)
                payload.customAlias = data.customAlias;

            if (data.password)
                payload.password = data.password;

            if (data.expireIn)
                payload.expireIn = data.expireIn;

            const response = await createShortUrl(payload);

            toast.success(response.message);

            reset();

            onSuccess?.();

            onClose?.();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to create URL"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            {/* Original URL */}

            <div>

                <label className="block mb-2 font-medium">
                    Original URL
                </label>

                <input
                    type="url"
                    placeholder="https://example.com"
                    {...register("originalUrl")}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {errors.originalUrl && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.originalUrl.message}
                    </p>
                )}

            </div>

            {/* Alias */}

            <div>

                <label className="block mb-2 font-medium">
                    Custom Alias (Optional)
                </label>

                <input
                    type="text"
                    placeholder="my-portfolio"
                    {...register("customAlias")}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {errors.customAlias && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.customAlias.message}
                    </p>
                )}

            </div>

            {/* Password */}

            <div>

                <label className="block mb-2 font-medium">
                    Password (Optional)
                </label>

                <input
                    type="password"
                    placeholder="******"
                    {...register("password")}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}

            </div>

            {/* Expiry */}

            <div>

                <label className="block mb-2 font-medium">
                    Expire After (Optional)
                </label>

                <input
                    type="text"
                    placeholder="7d / 12h / 30m"
                    {...register("expireIn")}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {errors.expireIn && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.expireIn.message}
                    </p>
                )}

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3 pt-2">

                <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 rounded-lg border hover:bg-gray-100"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                >
                    {loading ? "Creating..." : "Create URL"}
                </button>

            </div>
        </form>
    );
}

export default UrlForm;