import { motion, type Variants } from "framer-motion";
import {
  MdOutlineReceiptLong,
  MdOutlineStore,
  MdOutlineDriveFileRenameOutline,
  MdOutlineFileCopy,
  MdOutlineBusinessCenter,
} from "react-icons/md";
import { FaBolt } from "react-icons/fa6";
import { HiTrendingUp } from "react-icons/hi";

// Animation variants
const fadeInUp = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  },
});

function AboutPage() {
  return (
    <>
      <section className="flex flex-1 flex-col h-full">
        {/* Parallax Background Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative flex min-h-[560px] flex-col items-center justify-center gap-6 bg-center bg-no-repeat bg-cover sm:gap-8 p-4 overflow-hidden"
        >
          {/* Background image and overlay */}
          <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsal9OdT1PZMhMkGI2BSrcjsLygvW7joq1j84Un46QAKu1wCLacn1PysRUaq31jGmBNCudTAvehPTfpNxYm98PbRJPUDbkmzsdBOpfmx3P2dpS93G11H9jcXduomncVQMglo43zvw6qU5R-RApAv3sphvG-QGoJFMD4QA0lkucfHeAIH_MEWB-5k7qN4aiqXLIOKN8l3YN1VoBzaGehf0p6KguXJxtWDnxL8J2GA5cBCw1czdkx3T5gMnQ2fojNHVo08i7GqrxNX25')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-2 text-center max-w-2xl">
            <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.033em] md:text-6xl">
              Stofin&apos;s Journey: A Company Timeline
            </h1>
            <h2 className="text-white text-lg font-normal leading-normal md:text-xl">
              Explore the milestones that define our growth, values, and
              commitment to your financial success.
            </h2>
          </div>

          {/* Button with subtle hover animation */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative z-10 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#00b8c2] text-[#0c1c1d] text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#009da8] transition-colors"
          >
            <span className="truncate">Discover Our Story</span>
          </motion.button>
        </motion.div>

        <div className="layout-content-container flex flex-col max-w-[75%] mx-auto flex-1 mt-14">
          {/* ---------------- CHAPTER 1 ---------------- */}
          <motion.section
            variants={fadeInUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="py-12 px-4"
          >
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.015em] pb-6 mb-4 text-center">
              Chapter 1: Who We Are
            </h2>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 ">
                <p className="text-gray-700 text-lg font-normal leading-relaxed pb-3">
                  Stofin is a leading tax consultancy firm dedicated to
                  providing comprehensive and personalized tax solutions to
                  individuals and businesses. Our team of experienced
                  professionals is committed to delivering accurate, efficient,
                  and reliable services, ensuring our clients&apos; financial
                  well-being and compliance with all applicable regulations.
                </p>
                <p className="text-[#0c1c1d] text-lg font-normal leading-relaxed pb-3">
                  We combine deep industry knowledge with cutting-edge
                  technology to offer an unparalleled client experience. Our
                  mission is to simplify complex tax landscapes and empower our
                  clients with financial clarity and peace of mind.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  alt="Team collaborating"
                  className="rounded-lg shadow-lg w-full max-w-sm"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBguV7VnukNX6MC3JdEPuQ5Jfd5tzXUUx9_w7N5vm7zMy0a19iItWeAeXqvyW3zSlLCCRwnU82WePm5TFpFOq5q2UJN9KKZm5j_7NhtmrFOV05GWkBszFTfkHhdR-TCGw9br2UrG6aBa6stlsftwHVTnxStCT6x8oGiEg7tJ00uSv5RURFM1DyuMN_i4XFlpyBI9BtazPWddpn8wYlW-JSDWE3PzxoLSwAC44QpNMlqzFfIIOGF6wywI6Xe1AuQj0czH__JmCqw1VGh"
                />
              </div>
            </div>
          </motion.section>

          {/* ---------------- CHAPTER 2 ---------------- */}
          <motion.section
            variants={fadeInUp(0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="py-12 px-4"
          >
            <h2 className="text-[#0c1c1d] text-[28px] font-bold leading-tight tracking-[-0.015em] pb-6 text-center">
              Chapter 2: Our Services
            </h2>
            <p className="text-[#0c1c1d] text-lg font-normal leading-relaxed pb-8 text-center max-w-3xl mx-auto">
              We offer a wide range of services tailored to meet the diverse
              needs of our clients. Hover over each card to reveal more details.
            </p>

            {/* Grid of Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <MdOutlineReceiptLong size={50} />,
                  title: "ITR Filing",
                  desc: "Seamless and accurate Income Tax Return filing for individuals and businesses.",
                },
                {
                  icon: <FaBolt size={50}/>,
                  title: "GST Filing",
                  desc: "Efficient Goods and Services Tax compliance and return filing for all business types.",
                },
                {
                  icon: <MdOutlineStore size={50}/>,
                  title: "E-commerce Tax Prep",
                  desc: "Specialized tax preparation services for online sellers and e-commerce businesses.",
                },
                {
                  icon: <MdOutlineDriveFileRenameOutline size={50}/>,
                  title: "Form 26QB",
                  desc: "Assistance with filing Form 26QB for TDS on property transactions.",
                },
                {
                  icon: <MdOutlineFileCopy size={50}/>,
                  title: "TDS Return Filing",
                  desc: "Comprehensive services for Tax Deducted at Source (TDS) return filing.",
                },
                {
                  icon: <MdOutlineBusinessCenter size={50}/>,
                  title: "And More!",
                  desc: "Discover our full suite of tax and financial advisory services.",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp(0.5 + i * 0.1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="group [perspective:1000px] h-60"
                >
                  <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-lg shadow-lg">
                    {/* Front */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#e6f4f4] rounded-lg p-4 backface-hidden">
                      <span className="material-symbols-outlined text-cyan-500 mb-4">
                        {card.icon}
                      </span>
                      <h3 className="text-[#0c1c1d] text-xl font-bold leading-tight tracking-[-0.015em]">
                        {card.title}
                      </h3>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#00b8c2] rounded-lg p-4 text-[#0c1c1d] [transform:rotateY(180deg)] backface-hidden">
                      <p className="text-center text-sm">{card.desc}</p>
                      <button className="mt-4 px-4 py-2 bg-white rounded-lg text-sm font-bold">
                        Learn More
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ---------------- CHAPTER 3 ---------------- */}
          <motion.section
            variants={fadeInUp(0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="py-12 px-4"
          >
            <h2 className="text-[#0c1c1d] text-[28px] font-bold leading-tight tracking-[-0.015em] pb-6 text-center">
              Chapter 3: Our Motto
            </h2>
            <div className="bg-[#e6f4f4] rounded-lg p-8 flex flex-col md:flex-row items-center gap-8 shadow-md">
              <div className="md:w-1/3 flex justify-center">
                <span className="material-symbols-outlined text-cyan-500">
                  <HiTrendingUp size={70}/>
                </span>
              </div>
              <div className="md:w-2/3 text-center md:text-left">
                <p className="text-[#0c1c1d] text-2xl font-bold leading-relaxed mb-4">
                  "Your Financial Success, Our Priority."
                </p>
                <p className="text-[#0c1c1d] text-lg font-normal leading-relaxed">
                  At Stofin, we are driven by a passion for excellence and a
                  commitment to building long-term relationships with our
                  clients. We strive to provide proactive advice, insightful
                  guidance, and exceptional service, empowering our clients to
                  achieve their financial goals.
                </p>
              </div>
            </div>
          </motion.section>

          {/* ---------------- CHAPTER 4 ---------------- */}
          <motion.section
            variants={fadeInUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="py-12 px-4"
          >
            <h2 className="text-[#0c1c1d] text-[28px] font-bold leading-tight tracking-[-0.015em] pb-6 text-center">
              Chapter 4: Our Journey
            </h2>
            <p className="text-[#0c1c1d] text-lg font-normal leading-relaxed pb-8 text-center max-w-3xl mx-auto">
              Discover the key milestones that have shaped Stofin into a trusted
              leader in tax consultancy.
            </p>

            {/* Timeline */}
            <div className="relative flex flex-col items-center py-8">
              <div className="absolute w-1 bg-[#00b8c2] h-full left-1/2 transform -translate-x-1/2"></div>
              {[
                {
                  year: "2015: Foundation",
                  text: "Stofin is founded with a vision to simplify tax compliance for individuals and businesses.",
                  stats: "Clients served: 50+",
                  align: "right",
                },
                {
                  year: "2017: Service Expansion",
                  text: "Expanded services to include GST filing and specialized support for e-commerce suppliers.",
                  stats: "New services: 2 | Team growth: 30%",
                  align: "left",
                },
                {
                  year: "2019: Digital Transformation",
                  text: "Launched online portal for easier document submission and tracking, enhancing client experience.",
                  stats: "Client satisfaction: +25% | Process efficiency: +40%",
                  align: "right",
                },
                {
                  year: "2021: Nationwide Reach",
                  text: "Expanded our services to clients across the country, leveraging virtual consultancy.",
                  stats: "Geographical reach: Pan-India | Clients: 5000+",
                  align: "left",
                },
                {
                  year: "2023: Innovation in AI",
                  text: "Integrated AI-powered tools for faster data processing and personalized tax advice.",
                  stats:
                    "Accuracy improved: 15% | Processing time reduced: 20%",
                  align: "right",
                },
              ].map((event, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp(1 + i * 0.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className={`flex flex-col items-start w-full relative mb-12 ${
                    event.align === "right"
                      ? "justify-end pr-10"
                      : "justify-start pl-10"
                  }`}
                >
                  <div
                    className={`w-full flex ${
                      event.align === "right"
                        ? "justify-end pr-10"
                        : "justify-start pl-10"
                    }`}
                  >
                    <div className="w-1/2 bg-[#e6f4f4] rounded-lg p-6 shadow-md relative">
                      <div
                        className={`absolute w-4 h-4 bg-[#00b8c2] rounded-full ${
                          event.align === "right"
                            ? "left-[-2.5rem]"
                            : "right-[-2.5rem]"
                        } top-1/2 transform -translate-y-1/2`}
                      ></div>
                      <h3 className="text-[#0c1c1d] text-xl font-bold mb-2">
                        {event.year}
                      </h3>
                      <p className="text-[#0c1c1d] text-base">{event.text}</p>
                      <p className="text-[#0c1c1d] text-sm mt-2 font-medium">
                        {event.stats}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ---------------- LOOKING AHEAD ---------------- */}
          <motion.section
            variants={fadeInUp(2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="py-12 px-4 text-center"
          >
            <h2 className="text-[#0c1c1d] text-[28px] font-bold leading-tight tracking-[-0.015em] pb-6">
              Looking Ahead
            </h2>
            <p className="text-[#0c1c1d] text-lg font-normal leading-relaxed pb-8 max-w-3xl mx-auto">
              Our commitment to innovation and client-centricity remains at the
              heart of our continued growth. We are excited for what the future
              holds and look forward to achieving even greater milestones with
              you.
            </p>
            <button className="flex min-w-[84px] max-w-[480px] mx-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#00b8c2] text-[#0c1c1d] text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#009da8] transition-colors">
              <span className="truncate">Contact Us</span>
            </button>
          </motion.section>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
