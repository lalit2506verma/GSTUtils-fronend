import { motion } from "framer-motion";
import ContactImage from "../assets/contact-us.jpg";

const ContactPage = () => {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#f8fcfc] overflow-x-hidden font-inter">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-[#e6f4f4] px-10 py-3">
                <div className="flex items-center gap-4 text-[#0c1c1d]">
                    <div className="size-6">
                        <svg
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-[#0c1c1d]"
                        >
                            <path
                                d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold">Stofin</h2>
                </div>
                <div className="flex flex-1 justify-end gap-8">
                    <nav className="flex items-center gap-9">
                        {["Home", "Services", "About Us", "Contact Us"].map(
                            (item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="text-sm font-medium text-[#0c1c1d] hover:text-[#00b8c2] transition"
                                >
                                    {item}
                                </a>
                            )
                        )}
                    </nav>
                    <button className="flex items-center justify-center rounded-lg bg-[#00b8c2] px-4 h-10 text-sm font-bold text-[#0c1c1d]">
                        Get Started
                    </button>
                </div>
            </header>

            {/* Contact Section */}
            <div className="flex flex-1 items-center justify-center px-6 md:px-40 py-10">
                <div className="flex w-full max-w-[960px] flex-col gap-8 lg:flex-row">
                    {/* Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex w-full flex-col gap-4 lg:w-1/2"
                    >
                        <h2 className="text-3xl font-bold text-[#0c1c1d]">
                            Get in Touch
                        </h2>
                        <p className="text-[#459ca1]">
                            Have a question or need assistance? We're here to
                            help. Fill out the form below or reach out through
                            our contact details.
                        </p>

                        {/* Contact Info */}
                        <div className="mt-4 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="size-6 text-[#00b8c2]">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M19.5 0.75H4.5C3.07 0.75 1.95 1.87 1.95 3.29L1.95 20.71C1.95 22.13 3.07 23.25 4.5 23.25H19.5C20.93 23.25 22.05 22.13 22.05 20.71V3.29C22.05 1.87 20.93 0.75 19.5 0.75ZM19.5 20.71H4.5V3.29H19.5V20.71Z" />
                                        <path d="M12 16.54C11.48 16.54 11.05 16.12 11.05 15.59C11.05 15.07 11.48 14.64 12 14.64C12.52 14.64 12.95 15.07 12.95 15.59C12.95 16.12 12.52 16.54 12 16.54Z" />
                                        <path d="M12 11.11C11.48 11.11 11.05 10.68 11.05 10.16C11.05 9.64 11.48 9.21 12 9.21C12.52 9.21 12.95 9.64 12.95 10.16C12.95 10.68 12.52 11.11 12 11.11Z" />
                                        <path d="M12 5.64C11.48 5.64 11.05 5.21 11.05 4.68C11.05 4.16 11.48 3.73 12 3.73C12.52 3.73 12.95 4.16 12.95 4.68C12.95 5.21 12.52 5.64 12 5.64Z" />
                                    </svg>
                                </div>
                                <p className="text-[#0c1c1d]">123-456-7890</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-6 text-[#00b8c2]">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M21 3H3C2.45 3 2 3.45 2 4V20C2 20.55 2.45 21 3 21H21C21.55 21 22 20.55 22 20V4C22 3.45 21.55 3 21 3ZM3 4L12 9.5L21 4V20H3V4Z" />
                                    </svg>
                                </div>
                                <p className="text-[#0c1c1d]">
                                    info@stofin.com
                                </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <img
                                alt="Illustration of a person working on a laptop"
                                className="h-auto w-full max-w-full object-cover"
                                src={ContactImage}
                            />
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex w-full flex-col gap-4 lg:w-1/2"
                    >
                        {/* Name */}
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col flex-1">
                                <input
                                    placeholder="Your Name"
                                    className="w-full rounded-lg bg-[#e6f4f4] p-4 h-14 text-base text-[#0c1c1d] placeholder-[#459ca1] focus:outline-none"
                                />
                            </label>
                        </div>
                        {/* Email */}
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col flex-1">
                                <input
                                    placeholder="Email Address"
                                    className="w-full rounded-lg bg-[#e6f4f4] p-4 h-14 text-base text-[#0c1c1d] placeholder-[#459ca1] focus:outline-none"
                                />
                            </label>
                        </div>
                        {/* Select */}
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col flex-1">
                                <select className="w-full rounded-lg bg-[#e6f4f4] p-4 h-14 text-base text-[#0c1c1d] focus:outline-none">
                                    <option>Select Service</option>
                                    <option>Web Design</option>
                                    <option>App Development</option>
                                    <option>SEO Services</option>
                                </select>
                            </label>
                        </div>
                        {/* Message */}
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col flex-1">
                                <textarea
                                    placeholder="Message"
                                    className="w-full min-h-36 rounded-lg bg-[#e6f4f4] p-4 text-base text-[#0c1c1d] placeholder-[#459ca1] focus:outline-none"
                                />
                            </label>
                        </div>
                        {/* Button */}
                        <div className="flex px-4 py-3">
                            <button className="flex flex-1 items-center justify-center rounded-lg bg-[#00b8c2] px-4 h-10 text-sm font-bold text-[#0c1c1d]">
                                Send Message
                            </button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
