import { motion } from "framer-motion";

function AnalyticsShowcase() {

    return (

        <section
            id="analytics"
            className="py-28 bg-white"
        >

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* Left */}

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >

                        <span className="text-blue-600 font-semibold uppercase tracking-wider">

                            Powerful Analytics

                        </span>

                        <h2 className="mt-4 text-5xl font-bold leading-tight">

                            Understand every click
                            with detailed insights.

                        </h2>

                        <p className="mt-8 text-lg text-gray-600 leading-8">

                            Monitor countries, browsers,
                            devices, operating systems,
                            click trends and recent visitors
                            from one beautiful dashboard.

                        </p>

                        <ul className="mt-10 space-y-5">

                            <li>✅ Click Trends</li>

                            <li>✅ Browser Analytics</li>

                            <li>✅ Device Analytics</li>

                            <li>✅ Country Statistics</li>

                            <li>✅ Recent Visitor Logs</li>

                        </ul>

                    </motion.div>

                    {/* Right */}

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >

                        <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl">

                            {/* Fake Chart */}

                            <div className="h-64 bg-slate-800 rounded-2xl flex items-end gap-3 p-6">

                                <div className="w-8 h-24 bg-blue-500 rounded-t"></div>

                                <div className="w-8 h-36 bg-blue-500 rounded-t"></div>

                                <div className="w-8 h-28 bg-blue-500 rounded-t"></div>

                                <div className="w-8 h-44 bg-blue-500 rounded-t"></div>

                                <div className="w-8 h-52 bg-blue-500 rounded-t"></div>

                                <div className="w-8 h-40 bg-blue-500 rounded-t"></div>

                                <div className="w-8 h-56 bg-blue-500 rounded-t"></div>

                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-6">

                                <div className="bg-slate-800 rounded-xl p-4 text-center">

                                    <p className="text-gray-400 text-sm">

                                        Clicks

                                    </p>

                                    <h3 className="text-white text-2xl font-bold">

                                        12.8K

                                    </h3>

                                </div>

                                <div className="bg-slate-800 rounded-xl p-4 text-center">

                                    <p className="text-gray-400 text-sm">

                                        Countries

                                    </p>

                                    <h3 className="text-white text-2xl font-bold">

                                        42

                                    </h3>

                                </div>

                                <div className="bg-slate-800 rounded-xl p-4 text-center">

                                    <p className="text-gray-400 text-sm">

                                        Devices

                                    </p>

                                    <h3 className="text-white text-2xl font-bold">

                                        5

                                    </h3>

                                </div>

                            </div>

                        </div>

                    </motion.div>

                </div>

            </div>

        </section>

    );

}

export default AnalyticsShowcase;