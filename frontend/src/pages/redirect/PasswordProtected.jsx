import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import { verifyUrlPassword } from "../../api/url.api";
// import { hitUrlOnce } from "../../api/axios";


function PasswordProtected() {

    const { shortCode } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response =
                await verifyUrlPassword({

                    shortCode,

                    password,

                });
            window.location.href =
                response.data.originalUrl;

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Invalid password"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

                <div className="text-center">

                    <div className="text-5xl mb-4">

                        🔒

                    </div>

                    <h1 className="text-2xl font-bold">

                        Password Protected

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Enter the password to continue.

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    <input

                        type="password"

                        value={password}

                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }

                        className="w-full border rounded-lg px-4 py-3"

                        placeholder="Password"

                    />

                    <button

                        disabled={loading}

                        className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700"

                    >

                        {

                            loading

                                ? "Verifying..."

                                : "Unlock Link"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default PasswordProtected;