import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";

type FAQItem = {
    question: string;
    answer: string;
};

type FAQAccordionProps = {
    items: FAQItem[];
};

export default function FAQAccordion({ items }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* FAQ Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
                <p className="text-gray-600">
                    Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
                </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                    >
                        <button
                            className="w-full flex justify-between items-center p-6 text-left"
                            onClick={() => toggle(index)}
                        >
                            <span className="text-lg font-medium text-gray-900">
                                {item.question}
                            </span>
                            <motion.div
                                animate={{ rotate: openIndex === index ? 45 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Plus className="w-6 h-6 text-gray-500" />
                            </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="px-6 pb-6 text-gray-600">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
