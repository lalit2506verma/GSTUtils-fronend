import { motion, AnimatePresence } from "framer-motion";
import {
    MdDescription,
    MdReceiptLong,
    MdStorefront,
    MdRequestQuote,
    MdRealEstateAgent,
    MdAddBusiness,
    MdBolt,
    MdSave,
    MdCloudUpload,
    MdBuild,
    MdVerified,
    MdSupportAgent,
    MdDevices,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import solutionServiceImage from "../assets/tax-cal.png";
import gstToolPicture from "../assets/gst_automate.png";

const HomePage = () => {
    const words = ["Enterprises", "Employees", "Entrepreneurs"];
    const [index, setIndex] = useState(0);

    // Loop forever
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2500); // change word every 2.5s
        return () => clearInterval(interval);
    }, []);

    return (
        <main>
            {/* ================= HERO ================= */}
            <section className="container mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="bg-cyan-100 text-cyan-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                            Your Trusted Tax Partner
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mt-4 mb-6 leading-tight">
                            Seamless Tax Solutions for Your Business
                        </h1>
                        <p className="text-gray-600 text-lg mb-8">
                            From ITR & GST filing to specialized tax services
                            for e-commerce, we’ve got you covered. Maximize your
                            savings with our expert guidance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="#services"
                                className="w-full sm:w-auto text-center bg-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-cyan-600 transition"
                            >
                                Explore Services
                            </a>
                            <a
                                href="#contact"
                                className="w-full sm:w-auto text-center bg-gray-200 text-gray-800 px-8 py-4 rounded-full font-semibold hover:bg-gray-300 transition"
                            >
                                Book a Consultation
                            </a>
                        </div>
                    </motion.div>

                    {/* Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrA8sLWJGXoT6d-kojNKUcjItiU2m1Qe17jvbAce9np__t78Q5f9uk1jLDcS1eS6JRO3gIHQp3ULMIFvgAO2Y2CcXppJGzLm1RDtr6zytSez163EhnBDy3OMAz5HSitHgVPK-sqr9zd7v2EaRTmbjbhvE-XKHhk5_Rk1MteIYFo3dHQbuEm0QffcZnQ-FcaC_7TMJDRGC6r2GgkJ_VGnXPKW8Z4X_I8PiRyYojUerHsOoEqMfK3wIZsOPJ9QUete7mpNRc0Wy8us-9"
                            alt="Person calculating taxes"
                            className="rounded-lg shadow-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-8 -left-8 bg-white p-4 rounded-lg shadow-lg"
                        >
                            <p className="text-sm text-gray-500">
                                Tax Savings this year
                            </p>
                            <p className="text-2xl font-bold text-cyan-500">
                                ₹50,000+
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ================= ANIMATED SOLUTIONS ================= */}
            <section className="container mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-12 item-center">
                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="relative flex justify-center items-center"
                    >
                        <img
                            src={solutionServiceImage}
                            alt="Tax Calculation"
                            className="rounded-lg shadow-2xl w-3/4 h-full object-cover "
                        />
                    </motion.div>

                    {/* Right */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-4 mb-6 leading-tight">
                            <span>Helping </span>
                            <span className="text-blue-600">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={words[index]}
                                        initial={{ y: 40, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -40, opacity: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        {words[index]}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                            <span> to comply with Tax Laws.</span>
                        </h1>
                        <h1></h1>
                        <p className="text-gray-600 text-lg mb-8">
                            Salaried Employees, Independent Professionals, MSME
                            Enterprises, and Organizations. Contact us today to
                            create customized solution that meet your needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="#services"
                                className="w-full sm:w-auto text-center bg-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-cyan-600 transition flex items-center justify-center"
                            >
                                Connect with us
                                <IoChatbubbleEllipsesSharp className="ml-2" size={20} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ================= SERVICES ================= */}
            <section className="bg-white py-20" id="services">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800">
                            Our Comprehensive Services
                        </h2>
                        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                            We provide a wide range of tax and financial
                            services to meet your needs.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <MdDescription size={40} />,
                                title: "ITR Filing",
                                text: "Accurate and timely Income Tax Return filing for individuals and businesses.",
                            },
                            {
                                icon: <MdReceiptLong size={40} />,
                                title: "GST Filing & Registration",
                                text: "Hassle-free GST services, from registration to monthly and quarterly return filing.",
                            },
                            {
                                icon: <MdStorefront size={40} />,
                                title: "E-commerce Tax Prep",
                                text: "Specialized tax preparation and compliance for online sellers and e-commerce platforms.",
                            },
                            {
                                icon: <MdRequestQuote size={40} />,
                                title: "TDS Return Filing",
                                text: "Ensure TDS compliance with our expert assistance in preparing and filing TDS returns.",
                            },
                            {
                                icon: <MdRealEstateAgent size={40} />,
                                title: "Form 26QB Filing",
                                text: "Expert assistance for TDS on sale of property, ensuring correct filing of Form 26QB.",
                            },
                            {
                                icon: <MdAddBusiness size={40} />,
                                title: "And Many More...",
                                text: "We offer a variety of other financial services. Contact us to learn more.",
                            },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.2,
                                }}
                                viewport={{ once: true }}
                                className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-2"
                            >
                                <div className="bg-cyan-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    {s.icon}
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                    {s.title}
                                </h3>
                                <p className="text-gray-600">{s.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= GST TOOL ================= */}
            <section className="bg-gray-50 py-20" id="gst-tool">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            <span className="bg-cyan-100 text-cyan-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                Exclusive Tool
                            </span>
                            <h2 className="text-4xl font-bold text-gray-800 mt-4 mb-6">
                                Automate Your E-commerce GST Filing
                            </h2>
                            <p className="text-gray-600 text-lg mb-8">
                                Introducing the Stofin GST Tool, a
                                subscription-based solution designed
                                specifically for e-commerce suppliers.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <MdBolt
                                        className="text-cyan-500 mr-3"
                                        size={28}
                                    />{" "}
                                    <p>
                                        <strong>
                                            Generate GST-Ready Files:
                                        </strong>{" "}
                                        Effortlessly create upload-ready files
                                        for GST returns.
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <MdSave
                                        className="text-cyan-500 mr-3"
                                        size={28}
                                    />{" "}
                                    <p>
                                        <strong>
                                            Save Time & Reduce Errors:
                                        </strong>{" "}
                                        Automate the entire process to minimize
                                        manual effort and errors.
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <MdCloudUpload
                                        className="text-cyan-500 mr-3"
                                        size={28}
                                    />{" "}
                                    <p>
                                        <strong>Seamless Integration:</strong>{" "}
                                        Works perfectly with major e-commerce
                                        platforms.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8">
                                <a
                                    href="#"
                                    className="bg-cyan-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-cyan-600 transition"
                                >
                                    Learn More & Subscribe
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="relative flex justify-center items-center"
                        >
                            <img
                                src={gstToolPicture}
                                alt="GST Tool Screenshot"
                                className="rounded-lg shadow-2xl size-3/4 h-full object-cover"
                            />
                            <div className="absolute -top-6 right-10 bg-white p-4 rounded-lg shadow-lg">
                                <MdBuild className="text-cyan-500" size={40} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ================= ABOUT ================= */}
            <section className="bg-white py-20" id="about">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBsVESmi5j3Uz9ZqcmkdD9IDiU2OupZXT0uPQEDGbjkg3Sg7RMw_1Unb3nJP0e_9ITTFuYPlq4xJaYbwthXjf0hMwxkVOkh1ExPHn_0dA1iSvIdLqnW0M5eRhuKzKntZS2m4ME-1tfPrBPdHitwL4BShXNUflRo2X-c2DuQSWf4z2gafZ1kdro9T_3tEenEb9kM4l2gurXdhPlAmyBjofoFS_KZWk37J6s0O1gYTcxgiQunE_fOU1Q15cV89zoBYw7ywoDCH4rCvbZ"
                                alt="Team of professionals working together"
                                className="rounded-lg shadow-xl"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                Why Choose Stofin?
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="h-10 w-10 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center">
                                        <MdVerified />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            Expert Team
                                        </h3>
                                        <p className="text-gray-600 mt-1">
                                            Experienced CAs and tax experts
                                            dedicated to your success.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="h-10 w-10 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center">
                                        <MdSupportAgent />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            Personalized Support
                                        </h3>
                                        <p className="text-gray-600 mt-1">
                                            Tailored advice and dedicated
                                            support for your tax situations.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="h-10 w-10 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center">
                                        <MdDevices />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            Technology Driven
                                        </h3>
                                        <p className="text-gray-600 mt-1">
                                            We leverage the latest technology
                                            for accuracy & efficiency.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ================= TESTIMONIALS ================= */}
            <section className="bg-gray-50 py-20" id="testimonials">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800">
                            What Our Clients Say
                        </h2>
                        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                            We are proud to have helped so many clients achieve
                            their financial goals.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                text: "Stofin made GST filing incredibly simple. Highly recommended!",
                                name: "Priya Sharma",
                                role: "E-commerce Seller",
                                img: "https://lh3.googleusercontent.com/a/ACg8ocKwjR1qZJtXn4Z-pB1uV4j-J2P1L6bYF_q3-qYqZg=s96-c",
                            },
                            {
                                text: "As a freelancer, ITR filing was a headache. Stofin’s experts helped me save money!",
                                name: "Rohan Verma",
                                role: "Freelance Designer",
                                img: "https://lh3.googleusercontent.com/a/ACg8ocL8jXN7zHn5YjC-s8Cj9wT_z8H6-R-xG7yT_aF2Zg=s96-c",
                            },
                            {
                                text: "The guidance on Form 26QB for my property sale was invaluable.",
                                name: "Anjali Mehta",
                                role: "Home Seller",
                                img: "https://lh3.googleusercontent.com/a/ACg8ocK-Gz3Yj1b8Gz-B1-bQj_c1jHjO_jZ_q3Fh_aB2Zg=s96-c",
                            },
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.2,
                                }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-lg shadow-lg hover:scale-105 transition-transform"
                            >
                                <p className="text-gray-600 italic mb-6">
                                    "{t.text}"
                                </p>
                                <div className="flex items-center">
                                    <img
                                        src={t.img}
                                        alt={t.name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {t.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {t.role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= CONTACT ================= */}
            <section className="bg-white py-20" id="contact">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="container mx-auto px-6 text-center"
                >
                    <h2 className="text-4xl font-bold text-gray-800">
                        Ready to simplify your taxes?
                    </h2>
                    <p className="text-gray-600 mt-2 mb-8 max-w-2xl mx-auto">
                        Get in touch with us today for a free consultation and
                        let’s discuss how we can help you.
                    </p>
                    <button className="bg-cyan-500 text-white px-10 py-4 rounded-full font-semibold hover:bg-cyan-600 transition transform hover:scale-105">
                        Contact Us Now
                    </button>
                </motion.div>
            </section>
        </main>
    );
};

export default HomePage;
