import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

function CTA() {

    return (

        <section className="py-28">

            <div className="max-w-6xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-[40px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-16 text-center text-white shadow-2xl"
                >

                    <h2 className="text-5xl font-extrabold">

                        Ready to shorten smarter?

                    </h2>

                    <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto leading-8">

                        Join thousands of users who shorten links,
                        generate QR codes, and analyze every click
                        using Shortify.

                    </p>

                    <div className="mt-12 flex justify-center gap-6 flex-wrap">

                        <Link
                            to="/register"
                            className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition flex items-center gap-2"
                        >

                            Get Started Free

                            <FiArrowRight />

                        </Link>

                        <Link
                            to="/login"
                            className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition"
                        >

                            Login

                        </Link>

                    </div>

                </motion.div>

            </div>

        </section>

    );

}

export default CTA;