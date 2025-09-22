import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold text-cyan-500 mb-4">
                            Stofin
                        </h3>
                        <p className="text-gray-400">
                            Simplifying taxation, empowering your financial
                            growth.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">
                            Quick Links
                        </h4>
                        <ul>
                            <li className="mb-2">
                                <a
                                    href="#services"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Services
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="#gst-tool"
                                    className="text-gray-400 hover:text-white"
                                >
                                    GST Tool
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="#about"
                                    className="text-gray-400 hover:text-white"
                                >
                                    About Us
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="#testimonials"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Testimonials
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="#contact"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">
                            Connect With Us
                        </h4>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white"
                            >
                                <FaFacebookF size={22} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white"
                            >
                                <FaTwitter size={22} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white"
                            >
                                <FaLinkedinIn size={22} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
                    <p>
                        © {new Date().getFullYear()} Stofin. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
