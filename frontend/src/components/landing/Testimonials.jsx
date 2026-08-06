import TestimonialCard from "./TestimonialCard";

function Testimonials() {

    const testimonials = [

        {
            image: "https://i.pravatar.cc/150?img=32",
            name: "Sarah Johnson",
            role: "Marketing Manager",
            review:
                "Shortify has transformed how we manage campaign links. The analytics dashboard is clean, fast, and incredibly useful.",
        },

        {
            image: "https://i.pravatar.cc/150?img=12",
            name: "David Lee",
            role: "Startup Founder",
            review:
                "The automatic QR Code generation is fantastic. It made sharing our product at events effortless.",
        },

        {
            image: "https://i.pravatar.cc/150?img=68",
            name: "Emily Carter",
            role: "Product Designer",
            review:
                "Beautiful interface, detailed analytics, and super easy to use. One of the best URL shorteners I've tried.",
        },

    ];

    return (

        <section className="py-28 bg-slate-50">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-20">

                    <span className="uppercase tracking-widest text-blue-600 font-semibold">

                        Testimonials

                    </span>

                    <h2 className="mt-4 text-5xl font-bold">

                        Loved by Developers & Teams

                    </h2>

                    <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">

                        Here's what people would expect from a modern
                        URL management platform.

                    </p>

                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {testimonials.map((testimonial, index) => (

                        <TestimonialCard
                            key={index}
                            {...testimonial}
                        />

                    ))}

                </div>

            </div>

        </section>

    );

}

export default Testimonials;