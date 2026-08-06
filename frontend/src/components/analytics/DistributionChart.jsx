import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#7c3aed",
    "#0891b2",
    "#ea580c",
];

function DistributionChart({
    title,
    data,
    nameKey,
}) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-6">
                {title}
            </h2>

            {
                data.length === 0 ? (

                    <p className="text-gray-500">
                        No data available
                    </p>

                ) : (

                    <>

                        <div className="h-64">

                            <ResponsiveContainer>

                                <PieChart>

                                    <Pie
                                        data={data}
                                        dataKey="clicks"
                                        nameKey={nameKey}
                                        innerRadius={55}
                                        outerRadius={85}
                                        paddingAngle={3}
                                    >

                                        {
                                            data.map((item, index) => (

                                                <Cell
                                                    key={index}
                                                    fill={
                                                        COLORS[
                                                            index % COLORS.length
                                                        ]
                                                    }
                                                />

                                            ))
                                        }

                                    </Pie>

                                    <Tooltip />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                        <div className="mt-6 space-y-3">

                            {
                                data.map((item, index) => (

                                    <div
                                        key={index}
                                        className="flex justify-between items-center"
                                    >

                                        <div className="flex items-center gap-3">

                                            <span
                                                className="w-3 h-3 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        COLORS[
                                                            index % COLORS.length
                                                        ],
                                                }}
                                            />

                                            <span className="text-gray-700">

                                                {item[nameKey]}

                                            </span>

                                        </div>

                                        <span className="font-semibold">

                                            {item.clicks}

                                        </span>

                                    </div>

                                ))
                            }

                        </div>

                    </>

                )
            }

        </div>

    );

}

export default DistributionChart;