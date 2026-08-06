import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import AnalyticsShowcase from "../components/landing/AnalyticsShowcase";
import HowItWorks from "../components/landing/HowItWorks";
import QRShowcase from "../components/landing/QRShowcase";
import Stats from "../components/landing/Stats";
import Testimonials from "../components/landing/Testimonials";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

function Landing() {

    return (

        <div className="bg-slate-50 min-h-screen">

            <Navbar />

            <Hero />

            <Features />

            <AnalyticsShowcase/>

            <HowItWorks/>

            <QRShowcase/>

            <Stats/>

            <Testimonials />

            <CTA/>

            <Footer/>
        </div>

    );

}

export default Landing;