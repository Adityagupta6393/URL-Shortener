import { motion } from "framer-motion";
import { LuQrCode } from "react-icons/lu";
import { Link } from "react-router-dom";

function QRShowcase() {

    return (

        <section className="py-28 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* Left */}

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >

                        <span className="uppercase tracking-widest text-blue-200 font-semibold">

                            QR Code Generator

                        </span>

                        <h2 className="mt-5 text-5xl font-bold leading-tight">

                            Every short link comes with
                            its own QR Code.

                        </h2>

                        <p className="mt-8 text-blue-100 text-lg leading-8">

                            Share your links anywhere without typing.
                            Every URL automatically gets a beautiful,
                            high-quality QR Code that can be downloaded
                            instantly.

                        </p>

                        <div className="mt-10">

                            <Link
                                to="/register"
                                className="inline-block px-8 py-4 rounded-xl bg-white text-blue-700 font-semibold hover:scale-105 transition"
                            >

                                Start Creating Links

                            </Link>

                        </div>

                    </motion.div>

                    {/* Right */}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center"
                    >

                        <div className="bg-white rounded-3xl p-8 shadow-2xl">

                            <div className="w-72 h-72 bg-slate-100 rounded-2xl flex items-center justify-center">

                                <LuQrCode
                                    size={180}
                                    className="text-slate-700"
                                />

                            </div>

                            <p className="text-center mt-6 text-gray-700 font-semibold">

                                shortify.in/demo

                            </p>

                        </div>

                    </motion.div>

                </div>

            </div>

        </section>

    );

}

export default QRShowcase;