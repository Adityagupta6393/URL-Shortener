import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

function ClickTrendChart({ data }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-6">
                Click Trends
            </h2>

            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="date" />

                        <YAxis allowDecimals={false} />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="clicks"
                            stroke="#2563eb"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default ClickTrendChart;