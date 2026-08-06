function StatCard({
    title,
    value,
    icon,
    color,
}) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-3">
                        {value}
                    </h2>

                </div>

                <div
                    className={`text-4xl ${color}`}
                >
                    {icon}
                </div>

            </div>

        </div>

    );

}

export default StatCard;