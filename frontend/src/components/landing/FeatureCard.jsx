import { motion } from "framer-motion";

function FeatureCard({
    icon,
    title,
    description,
}) {

    return (

        <motion.div
            whileHover={{
                y: -8,
            }}
            transition={{
                duration: 0.2,
            }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:border-blue-200"
        >

            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-2xl mb-6">

                {icon}

            </div>

            <h3 className="text-xl font-bold mb-3">

                {title}

            </h3>

            <p className="text-gray-600 leading-7">

                {description}

            </p>

        </motion.div>

    );

}

export default FeatureCard;