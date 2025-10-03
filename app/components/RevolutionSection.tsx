"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, X } from "lucide-react";

const FounderModal = ({ onClose }: { onClose: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative bg-[#1a1a1a] rounded-xl p-8 max-w-3xl w-full border border-gray-700">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X /></button>
      <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
        <Image src="/about1.png" alt="Himanshu Gupta" width={150} height={150} className="rounded-full flex-shrink-0"/>
        <div>
            
          <h2 className="text-4xl font-bold text-white">Himanshu Gupta</h2>
          <p className="text-xl text-gray-300">Founder & CEO</p>
          <a href="#" className="inline-flex items-center gap-2 mt-4 border border-gray-600 px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-700">
            <Linkedin size={16}/> LinkedIn
          </a>
        </div>
      </div>
      <div className="text-gray-400 space-y-4 text-sm leading-relaxed">
        <p>Himanshu Gupta is revolutionizing the legal tech landscape. With an engineering background and as an alumnus of IIM Calcutta, he brings over two decades of expertise in product development and management. His passion lies in transforming traditional legal services into innovative legal consumer products that cater to both individuals and businesses.</p>
        <p>Throughout his career, Himanshu has been committed to developing products and solutions that bridge the gap between legal professionals and consumers. At Lawyered, he leads the charge in developing tech-driven legal products designed to change how people think about and access legal assistance. Under his leadership, Lawyered is redefining the legal landscape by offering cutting-edge products that make legal solutions more accessible and affordable. His vision is to leverage the latest technologies to make legal products within reach for everyone, making a real impact in the lives of individuals and businesses alike. Lawyered is not just keeping pace with the future of legal tech—it’s defining it.</p>
      </div>
    </motion.div>
  </motion.div>
);

export function RevolutionSection() {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="py-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-5xl font-bold text-[#22D2EE] self-start">Be a Part of the Revolution</h2>
        <p className="max-w-8xl text-gray-300 mt-4 text-xl text-left">Lawyered is a hub for those who value knowledge, seek empathetic support, and believe in the power of expert guidance. Our team members, clients, partners, and stakeholders value wisdom and appreciate our ability to offer empathetic support, finding comfort in our practice of care. By presenting new ideas and fostering creativity, Lawyered continuously cultivates a sense of admiration and aspiration. We are a team of problem-solvers, innovators, and guides, united by a shared commitment to empower our stakeholders. We believe in the transformative power of knowledge and the positive impact of compassionate support.</p>
        <a href="#" className="mt-8 bg-[#0891B2] text-white px-10 py-3 rounded-lg self-start">Join Our Team</a>
        <div onClick={() => setModalOpen(true)} className="mt-24 cursor-pointer flex items-center gap-8">
          <Image src="/about1.png" alt="Himanshu Gupta" width={180} height={180} className="rounded-full"/>
          <div>
                      <div className="flex flex-col">
              <span className="text-5xl md:text-6xl font-bold tracking-wider text-transparent" style={{
                WebkitTextStroke: "2px white"
              }}>
                HIMANSHU
              </span>
              <span className="text-5xl md:text-6xl font-bold tracking-wider text-[#22D2EE]">
                GUPTA
              </span>
            </div>
            <p className="text-2xl text-gray-300 mt-2">Founder & CEO</p>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && <FounderModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}