import { Link } from "react-router-dom";
import {
    FiGithub,
    FiLinkedin,
    FiMail,
} from "react-icons/fi";

function Footer() {

    return (

        <footer className="bg-slate-900 text-white">

            <div className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Logo */}

                    <div>

                        <h2 className="text-3xl font-bold">

                            Shortify

                        </h2>

                        <p className="mt-5 text-gray-400 leading-7">

                            A modern URL shortening platform built
                            with the MERN Stack.

                        </p>

                    </div>

                    {/* Product */}

                    <div>

                        <h3 className="font-bold text-lg">

                            Product

                        </h3>

                        <ul className="space-y-4 mt-6 text-gray-400">

                            <li>

                                <a href="#features">

                                    Features

                                </a>

                            </li>

                            <li>

                                <a href="#analytics">

                                    Analytics

                                </a>

                            </li>

                            <li>

                                <a href="#">

                                    QR Codes

                                </a>

                            </li>

                        </ul>

                    </div>

                    {/* Company */}

                    <div>

                        <h3 className="font-bold text-lg">

                            Company

                        </h3>

                        <ul className="space-y-4 mt-6 text-gray-400">

                            <li>

                                <Link to="/">

                                    About

                                </Link>

                            </li>

                            <li>

                                <Link to="/">

                                    Contact

                                </Link>

                            </li>

                            <li>

                                <Link to="/">

                                    Privacy

                                </Link>

                            </li>

                        </ul>

                    </div>

                    {/* Social */}

                    <div>

                        <h3 className="font-bold text-lg">

                            Connect

                        </h3>

                        <div className="flex gap-5 mt-6 text-2xl">

                            <a href="#">

                                <FiGithub />

                            </a>

                            <a href="#">

                                <FiLinkedin />

                            </a>

                            <a href="#">

                                <FiMail />

                            </a>

                        </div>

                    </div>

                </div>

                <div className="border-t border-slate-700 mt-16 pt-8 text-center text-gray-500">

                    © {new Date().getFullYear()} Shortify.
                    All rights reserved.

                </div>

            </div>

        </footer>

    );

}

export default Footer;