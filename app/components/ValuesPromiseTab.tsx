"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, X } from "lucide-react";
import Image from "next/image";

// NEW: Modal for "Join Our Team" Form
const JoinTeamModal = ({ onClose }: { onClose: () => void }) => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!name || !department || !file) {
            setMessage('Please fill in all fields and select a file');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', name);
            formData.append('department', department);

            const response = await fetch('/api/upload-resume', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Resume uploaded successfully!');
                // Reset form
                setName('');
                setDepartment('');
                setFile(null);
                // Close modal after 2 seconds
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setMessage(`Upload failed: ${result.error || 'Unknown error'}`);
            }
        } catch (error) {
            setMessage(`Error uploading resume: ${error instanceof Error ? error.message : 'Network error'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: -20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-[#1a1a1a] rounded-2xl p-8 max-w-lg w-full border border-gray-700 shadow-xl">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800 rounded-full p-1"><X size={20} /></button>
                <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-6">Share Your Details To Join Our Team</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-xs md:text-sm text-gray-400 mb-2 block">Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500"
                        />
                    </div>
                    <div className="relative">
                        <label className="text-xs md:text-sm text-gray-400 mb-2 block">Select Department</label>
                        <div className="relative">
                            <select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 text-gray-300 appearance-none cursor-pointer pr-10"
                                style={{
                                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'none'
                                }}
                            >
                                <option value="" disabled>Select Department</option>
                                <option value="Technology">Technology</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Operations">Operations</option>
                                <option value="Product">Product</option>
                                <option value="Other">Others</option>
                            </select>
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6,9 12,15 18,9"></polyline>
                                </svg>
                            </div>
                        </div>
                        <style jsx>{`
                            select option {
                                background-color: rgba(31, 41, 55, 0.9);
                                color: white;
                                padding: 8px;
                            }
                            select option:first-child {
                                color: #9CA3AF;
                            }
                            select:focus option {
                                background-color: rgba(31, 41, 55, 0.9);
                            }
                        `}</style>
                    </div>
                    <div>
                        <label className="text-xs md:text-sm text-gray-400 mb-2 block">Share your CV</label>
                        <div className="relative border border-gray-700 rounded-md">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex justify-between items-center p-3">
                                <span className="text-gray-300">{file ? file.name : 'Choose file'}</span>
                                <span className="text-gray-500">{file ? `${(file.size / 1024).toFixed(2)} KB` : 'No file chosen'}</span>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-[#0891B2] text-white font-bold py-3 rounded-lg mt-4" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    {message && <p className="text-center text-sm mt-4">{message}</p>}
                </form>
            </motion.div>
        </motion.div>
    );
};

export function ValuesPromiseTabs() {
  const [activeTab, setActiveTab] = useState("value");
  const [isJoinTeamModalOpen, setJoinTeamModalOpen] = useState(false);

  const values = [
    { icon: <Image src="/promise1.png" alt="Wisdom and Empathy" width={35} height={35} />, title: "Wisdom and Empathy", description: "We are individuals who not only possess deep expertise but also lead with empathy. We value the human connection as much as the legal solution." },
    { icon: <Image src="/promise2.png" alt="Innovation and Inspiration" width={50} height={50} />, title: "Innovation and Inspiration", description: "We are driven by a digital-first mindset, constantly challenging the status quo to make legal services more accessible and intuitive. Our culture is a breeding ground for new ideas, where creativity is celebrated. We are here to create, not just to comply." },
    { icon: <Image src="/promise3.png" alt="Aspiration and Admiration" width={50} height={50} />, title: "Aspiration and Admiration", description: "We inspire our stakeholders by offering solutions that are both technically superior and user-friendly. We learn from each other’s expertise, celebrate our collective achievements, and are motivated by the shared goal of making a meaningful difference in people’s lives." },
  ];

  return (
    <div className="pb-24 px-4 sm:px-6 md:px-8 lg:px-26">
      <div className="max-w-8xl mx-auto flex flex-col items-center">
        <div className="flex flex-row border border-white text-sm md:text-xl w-full md:w-auto">
          <button onClick={() => setActiveTab("value")} className={`w-full md:w-auto px-4 py-3 md:py-4 md:px-12 lg:px-16 font-semibold transition-colors ${activeTab === 'value' ? 'bg-white text-black' : 'bg-transparent text-black dark:text-white'}`}>What We Value</button>
          <button onClick={() => setActiveTab("promise")} className={`w-full md:w-auto px-4 py-3 md:py-4 md:px-12 lg:px-16 font-semibold transition-colors ${activeTab === 'promise' ? 'bg-white text-black' : 'bg-transparent text-black dark:text-white md:border-l border-gray-700'}`}>What We Promise</button>
        </div>
        <div className="mt-12 w-full px-4 sm:px-8 md:px-12 lg:px-22">
          <AnimatePresence mode="wait">
            {activeTab === 'value' && (
              <motion.div key="value" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="grid md:grid-cols-3 gap-8">
                {values.map(v => (
                  <div key={v.title} className="border border-gray-700 p-6 space-y-10">
                    <div className="text-gray-400 mb-4">{v.icon}</div>
                    <h3 className="text-lg md:text-xl font-bold text-black dark:text-white">{v.title}</h3>
                    <p className="mt-2 text-gray-700 dark:text-gray-300 text-base leading-relaxed pb-12">{v.description}</p>
                  </div>
                ))}
              </motion.div>
            )}
            {activeTab === 'promise' && (
              <motion.div key="promise" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="border border-gray-600 p-4 md:p-8 bg-transparent flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">
                  <HeartHandshake size={50} className="text-black dark:text-white font-light flex-shrink-0"/>
                  <p className="text-gray-700 dark:text-gray-300 w-full text-base md:text-lg">We offer a platform to make a tangible impact. You will be part of a team that is not only at the forefront of legal innovation but also deeply committed to helping others. If you are ready to use your expertise to solve real-problems with compassion and creativity, you’ve found your home.</p>
                </div>
                <button onClick={() => setJoinTeamModalOpen(true)} className="w-full lg:w-auto bg-[#0891B2] text-base md:text-base px-8 py-4 md:px-16 md:py-5 rounded-lg whitespace-nowrap mt-6 lg:mt-0">Join Our Team</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {isJoinTeamModalOpen && <JoinTeamModal onClose={() => setJoinTeamModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
