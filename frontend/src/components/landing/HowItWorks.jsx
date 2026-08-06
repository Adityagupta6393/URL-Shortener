import { motion } from "framer-motion";
import {
    FiLink,
    FiZap,
    FiBarChart2,
} from "react-icons/fi";

const steps = [
    {
        icon: <FiLink size={34} />,
        title: "Paste Your URL",
        description:
            "Enter any long URL and customize it with your own alias if you want.",
    },
    {
        icon: <FiZap size={34} />,
        title: "Generate Short Link",
        description:
            "Get an instant short URL along with a QR code that's ready to share.",
    },
    {
        icon: <FiBarChart2 size={34} />,
        title: "Track Performance",
        description:
            "Monitor clicks, countries, browsers, devices, and visitor activity in real time.",
    },
];

function HowItWorks() {

    return (

        <section className="py-28 bg-slate-50">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center">

                    <span className="text-blue-600 font-semibold uppercase tracking-widest">

                        How It Works

                    </span>

                    <h2 className="mt-4 text-5xl font-bold">

                        Shorten URLs in 3 Simple Steps

                    </h2>

                    <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-lg">

                        From creating a short link to tracking every click,
                        everything takes just a few seconds.

                    </p>

                </div>

                <div className="mt-20 grid md:grid-cols-3 gap-10">

                    {steps.map((step, index) => (

                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                            }}
                            className="relative bg-white rounded-3xl shadow-lg p-10"
                        >

                            {/* Step Number */}

                            <div className="absolute -top-5 left-8 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                                {index + 1}

                            </div>

                            <div className="mt-4 w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">

                                {step.icon}

                            </div>

                            <h3 className="mt-8 text-2xl font-bold">

                                {step.title}

                            </h3>

                            <p className="mt-5 text-gray-600 leading-8">

                                {step.description}

                            </p>

                        </motion.div>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default HowItWorks;