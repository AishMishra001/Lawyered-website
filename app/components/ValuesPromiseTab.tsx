"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Lightbulb, TrendingUp, HeartHandshake } from "lucide-react";

export function ValuesPromiseTabs() {
  const [activeTab, setActiveTab] = useState("value");

  const values = [
    { icon: <BookOpen />, title: "Wisdom and Empathy", description: "We are individuals who not only possess deep expertise but also lead with empathy. We value the human connection as much as the legal solution." },
    { icon: <Lightbulb />, title: "Innovation and Inspiration", description: "We are driven by a digital-first mindset, constantly challenging the status quo to make legal services more accessible and intuitive. Our culture is a breeding ground for new ideas, where creativity is celebrated. We are here to create, not just to comply." },
    { icon: <TrendingUp />, title: "Aspiration and Admiration", description: "We inspire our stakeholders by offering solutions that are both technically superior and user-friendly. We learn from each other’s expertise, celebrate our collective achievements, and are motivated by the shared goal of making a meaningful difference in people’s lives." },
  ];

  return (
    <div className="pb-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto flex flex-col items-center">
        <div className="flex border border-white text-4xl">
          <button onClick={() => setActiveTab("value")} className={`px-16 py-6 font-semibold transition-colors ${activeTab === 'value' ? 'bg-white text-black' : 'bg-transparent text-white'}`}>What We Value</button>
          <button onClick={() => setActiveTab("promise")} className={`px-16 py-6 font-semibold transition-colors ${activeTab === 'promise' ? 'bg-white text-black' : 'bg-transparent text-white border-l border-gray-700'}`}>What We Promise</button>
        </div>
        <div className="mt-12 w-full px-22">
          <AnimatePresence mode="wait">
            {activeTab === 'value' && (
              <motion.div key="value" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="grid md:grid-cols-3 gap-8">
                {values.map(v => (
                  <div key={v.title} className="border border-gray-700 p-6 space-y-10">
                    <div className="text-gray-400 mb-4">{v.icon}</div>
                    <h3 className="text-3xl font-bold text-white">{v.title}</h3>
                    <p className="mt-2 text-gray-300 text-2xl leading-relaxed pb-12">{v.description}</p>
                  </div>
                ))}
              </motion.div>
            )}
            {activeTab === 'promise' && (
              <motion.div key="promise" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="border border-gray-600  p-8 bg-black/20 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <HeartHandshake size={70} className="text-white font-light"/>
                  <p className="text-gray-300 w-full text-2xl">We offer a platform to make a tangible impact. You will be part of a team that is not only at the forefront of legal innovation but also deeply committed to helping others. If you are ready to use your expertise to solve real problems with compassion and creativity, you’ve found your home.</p>
                </div>
                <a href="#" className=" bg-[#0891B2] text-2xl px-16 py-5 rounded-lg whitespace-nowrap">Join Our Team</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}