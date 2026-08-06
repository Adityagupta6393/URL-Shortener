import {
    FiLink,
    FiBarChart2,
    FiShield,
    FiClock,
    FiZap,
} from "react-icons/fi";

import { LuQrCode } from "react-icons/lu";

import FeatureCard from "./FeatureCard";

function Features() {

    const features = [

        {
            icon: <FiLink />,
            title: "Smart URL Shortening",
            description:
                "Create clean, memorable, and shareable links in seconds.",
        },

        {
            icon: <FiBarChart2 />,
            title: "Advanced Analytics",
            description:
                "Track clicks, browsers, countries, devices, and visitor activity in real time.",
        },

        {
            icon: <LuQrCode />,
            title: "QR Code Generator",
            description:
                "Generate beautiful QR Codes automatically for every shortened URL.",
        },

        {
            icon: <FiShield />,
            title: "Password Protection",
            description:
                "Protect sensitive links with secure password authentication.",
        },

        {
            icon: <FiClock />,
            title: "Link Expiration",
            description:
                "Automatically disable links after a selected expiration date.",
        },

        {
            icon: <FiZap />,
            title: "Lightning Fast",
            description:
                "Built with the MERN Stack for speed, scalability, and reliability.",
        },

    ];

    return (

        <section
            id="features"
            className="py-24"
        >

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16">

                    <h2 className="text-5xl font-bold">

                        Everything You Need

                    </h2>

                    <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">

                        Powerful features designed to simplify link management,
                        improve sharing, and provide actionable insights.

                    </p>

                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {features.map((feature, index) => (

                        <FeatureCard
                            key={index}
                            {...feature}
                        />

                    ))}

                </div>

            </div>

        </section>

    );

}

export default Features;