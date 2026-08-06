import { FaStar } from "react-icons/fa";

function TestimonialCard({ image, name, role, review }) {

    return (

        <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition">

            <div className="flex text-yellow-400 mb-5">

                {[...Array(5)].map((_, index) => (

                    <FaStar
                        key={index}
                        size={18}
                    />

                ))}

            </div>

            <p className="text-gray-600 leading-8">

                "{review}"

            </p>

            <div className="flex items-center gap-4 mt-8">

                <img
                    src={image}
                    alt={name}
                    className="w-14 h-14 rounded-full object-cover"
                />

                <div>

                    <h3 className="font-bold">

                        {name}

                    </h3>

                    <p className="text-gray-500 text-sm">

                        {role}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default TestimonialCard;