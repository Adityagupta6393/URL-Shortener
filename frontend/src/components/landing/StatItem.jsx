import { motion } from "framer-motion";

function StatItem({ value, label }) {

    return (

        <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center"
        >

            <h3 className="text-5xl font-extrabold text-blue-600">

                {value}

            </h3>

            <p className="mt-3 text-gray-600 text-lg">

                {label}

            </p>

        </motion.div>

    );

}

export default StatItem;