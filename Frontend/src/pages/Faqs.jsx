import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is Blue Rays Technologies?",
    answer:
      "Blue Rays Technologies is a leading tech company specializing in innovative solutions across AI, IoT, and cloud computing.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship globally with reliable logistics partners ensuring fast and secure delivery.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept Visa, MasterCard, PayPal, and bank transfers.",
  },
  {
    question: "How can I invest in Blue Rays?",
    answer: "We are open to investments. Reach us at invest@bluerays.tech for details.",
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes, our support team is available 24/7 via chat, email, and phone.",
  },
  {
    question: "Can I request a custom solution?",
    answer: "Absolutely. We specialize in tailored tech solutions for unique business needs.",
  },
  {
    question: "Is Blue Rays Technologies hiring?",
    answer: "Yes, we’re always looking for talented individuals. Visit our careers page to learn more.",
  },
  {
    question: "Where is Blue Rays headquartered?",
    answer: "Our headquarters is located in San Francisco, California, with teams across the globe.",
  },
];

export default function Faqs() {
  return (
    <div className="w-full min-h-screen bg-[#f9fbfd] text-gray-900 flex flex-col">
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-center text-blue-700 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h1>

        <motion.p
          className="text-center text-gray-600 max-w-2xl mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          All your burning questions answered about Blue Rays Technologies LLC.
        </motion.p>

        <div className="w-full max-w-6xl h-64 md:h-80 lg:h-96 mb-12">
          <Canvas camera={{ position: [0, 0, 5] }} className="w-full h-full">
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 5]} intensity={0.8} />
            <OrbitControls enableZoom={false} />
            <Float floatIntensity={2}>
              <mesh>
                <icosahedronGeometry args={[2, 1]} />
                <meshStandardMaterial color="#3b82f6" wireframe />
              </mesh>
            </Float>
          </Canvas>
        </div>

        <div className="w-full max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                value={`faq-${index}`}
                key={index}
                className="rounded-2xl border border-gray-300 bg-white shadow-md transition-all hover:shadow-lg"
              >
                <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}