import StatItem from "./StatItem";

function Stats() {

    const stats = [

        {
            value: "50K+",
            label: "URLs Created",
        },

        {
            value: "1M+",
            label: "Clicks Tracked",
        },

        {
            value: "150+",
            label: "Countries",
        },

        {
            value: "99.99%",
            label: "Uptime",
        },

    ];

    return (

        <section className="py-24 bg-white">

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {stats.map((item, index) => (

                        <StatItem
                            key={index}
                            {...item}
                        />

                    ))}

                </div>

            </div>

        </section>

    );

}

export default Stats;