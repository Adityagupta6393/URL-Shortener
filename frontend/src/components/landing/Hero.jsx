import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

function Hero() {

    return (

        <section className="pt-32 pb-24">

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left */}

                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >

                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">

                        🚀 Modern URL Shortener Platform

                    </span>

                    <h1 className="mt-8 text-5xl lg:text-7xl font-extrabold leading-tight">

                        Shorten,

                        <span className="block text-blue-600">

                            Track

                        </span>

                        & Grow Your Links

                    </h1>

                    <p className="mt-8 text-lg text-gray-600 leading-8">

                        Create branded short links, generate QR codes,
                        monitor detailed analytics, and manage all your URLs
                        from one beautiful dashboard.

                    </p>

                    <div className="mt-10 flex flex-wrap gap-5">

                        <Link
                            to="/register"
                            className="px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                        >

                            Get Started

                            <FiArrowRight />

                        </Link>

                        <Link
                            to="/login"
                            className="px-8 py-4 rounded-xl border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition"
                        >

                            Live Demo

                        </Link>

                    </div>

                </motion.div>

                {/* Right */}

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >

                    <div className="bg-white rounded-3xl shadow-2xl p-8">

                        <div className="flex justify-between items-center mb-8">

                            <h3 className="font-bold text-xl">

                                Dashboard Preview

                            </h3>

                            <span className="text-green-600 font-semibold">

                                ● Live

                            </span>

                        </div>

                        <div className="space-y-5">

                            <div className="bg-slate-100 rounded-xl p-4">

                                <p className="text-sm text-gray-500">

                                    Short URL

                                </p>

                                <p className="font-semibold text-blue-600">

                                    shortify.in/aditya

                                </p>

                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div className="bg-blue-50 rounded-xl p-5">

                                    <h4 className="text-gray-500">

                                        Clicks

                                    </h4>

                                    <p className="text-3xl font-bold">

                                        12.8K

                                    </p>

                                </div>

                                <div className="bg-green-50 rounded-xl p-5">

                                    <h4 className="text-gray-500">

                                        Countries

                                    </h4>

                                    <p className="text-3xl font-bold">

                                        42

                                    </p>

                                </div>

                            </div>

                            <div className="bg-slate-100 rounded-xl h-48 flex items-center justify-center text-gray-400">

                                📈 Analytics Chart Preview

                            </div>

                        </div>

                    </div>

                </motion.div>

            </div>

        </section>

    );

}

export default Hero;