import { Link } from "react-router-dom";
import { FiLink } from "react-icons/fi";

function Navbar() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">

            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}

                <Link
                    to="/"
                    className="flex items-center gap-2 text-2xl font-bold text-blue-600"
                >
                    <FiLink size={28} />

                    Shortify
                </Link>

                {/* Navigation */}

                <nav className="hidden md:flex items-center gap-8 text-gray-600">

                    <a
                        href="#features"
                        className="hover:text-blue-600 transition"
                    >
                        Features
                    </a>

                    <a
                        href="#analytics"
                        className="hover:text-blue-600 transition"
                    >
                        Analytics
                    </a>

                    <a
                        href="#pricing"
                        className="hover:text-blue-600 transition"
                    >
                        Pricing
                    </a>

                </nav>

                {/* Buttons */}

                <div className="flex items-center gap-4">

                    <Link
                        to="/login"
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Get Started
                    </Link>

                </div>

            </div>

        </header>
    );
}

export default Navbar;