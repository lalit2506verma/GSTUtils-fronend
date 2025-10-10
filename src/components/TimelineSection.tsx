import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface TimelineSectionProps {
  title: string;
  text: string;
  icon: string;
  image: string;
  reverse?: boolean;
  stats?: { label: string; value: string }[];
}

function TimelineSection({
  title,
  text,
  icon,
  image,
  reverse,
  stats,
}: TimelineSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start({ opacity: 1, y: 0 });
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={controls}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative my-20 flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center justify-between`}
    >
      <div className="md:w-5/12 p-4">
        {!reverse && <h2 className="text-[28px] font-bold mb-4">{title}</h2>}
        {!reverse && <p className="text-base leading-relaxed mb-4">{text}</p>}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-[#e6f4f4] p-4 rounded-lg shadow-sm text-center"
              >
                <p className="text-[#00b8c2] text-4xl font-bold">{s.value}</p>
                <p className="text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        )}
        {title === "Our Services" && (
          <button className="mt-4 bg-[#00b8c2] h-10 px-4 rounded-lg font-bold text-sm hover:bg-[#009da8] transition-colors">
            View All Services
          </button>
        )}
      </div>

      {/* Icon in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 rounded-full bg-[#00b8c2] flex items-center justify-center text-white z-10">
        <span className="material-symbols-outlined">{icon}</span>
      </div>

      <div className="md:w-5/12 p-4">
        <img
          src={image}
          alt={title}
          className="rounded-lg shadow-lg w-full h-auto object-cover"
        />
      </div>

      {reverse && (
        <div className="md:w-5/12 p-4">
          <h2 className="text-[28px] font-bold mb-4">{title}</h2>
          <p className="text-base leading-relaxed mb-4">{text}</p>
          
        </div>
      )}
    </motion.div>
  );
}

export default TimelineSection;
