"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, X } from "lucide-react";

// Modal for Founder Details
const FounderModal = ({ onClose }: { onClose: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative bg-[#1a1a1a] rounded-xl p-8 max-w-3xl w-full border border-gray-700">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 dark:hover:text-white"><X /></button>
      <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
        <Image src="/about1.png" alt="Himanshu Gupta" width={150} height={150} className="rounded-full flex-shrink-0"/>
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-black dark:text-white">Himanshu Gupta</h2>
          <p className="text-lg md:text-xl text-gray-300">Founder & CEO</p>
          <a href="#" className="inline-flex items-center gap-2 mt-4 border border-gray-600 px-4 py-2 rounded-lg text-xs md:text-sm text-gray-300 hover:bg-gray-700">
            <Linkedin size={16}/> LinkedIn
          </a>
        </div>
      </div>
      <div className="text-gray-400 space-y-4 text-xs md:text-sm leading-relaxed">
        <p>Himanshu Gupta is revolutionizing the legal tech landscape. With an engineering background and as an alumnus of IIM Calcutta, he brings over two decades of expertise in product development and management. His passion lies in transforming traditional legal services into innovative legal consumer products that cater to both individuals and businesses.</p>
        <p>Throughout his career, Himanshu has been committed to developing products and solutions that bridge the gap between legal professionals and consumers. At Lawyered, he leads the charge in developing tech-driven legal products designed to change how people think about and access legal assistance. Under his leadership, Lawyered is redefining the legal landscape by offering cutting-edge products that make legal solutions more accessible and affordable. His vision is to leverage the latest technologies to make legal products within reach for everyone, making a real impact in the lives of individuals and businesses alike. Lawyered is not just keeping pace with the future of legal tech—it’s defining it.</p>
      </div>
    </motion.div>
  </motion.div>
);

// import { uploadCV } from "@/lib/supabaseService";

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
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 dark:hover:text-white bg-gray-800 rounded-full p-1"><X size={20} /></button>
                <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-6">Share Your Details To Join Our Team</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-xs md:text-sm text-gray-400 mb-2 block">Name</label>
                        <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500" />
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
                    <button type="submit" className="w-full bg-[#0891B2] text-black dark:text-white font-bold py-3 rounded-lg mt-4" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    {message && <p className="text-center text-sm mt-4">{message}</p>}
                </form>
            </motion.div>
        </motion.div>
    );
};

export function RevolutionSection() {
  const [isFounderModalOpen, setFounderModalOpen] = useState(false);
  // NEW: State for the Join Team modal
  const [isJoinTeamModalOpen, setJoinTeamModalOpen] = useState(false);

  return (
    <div className="pt-2 md:pt-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto text-center md:text-left flex flex-col items-center md:items-start">
        <h2 className="text-2xl md:text-4xl font-bold text-[#0E7490] dark:text-[#22D3EE] text-center md:text-left">Be a Part of the Revolution</h2>
        <p className="max-w-8xl text-black dark:text-gray-300 mt-4 text-base">Lawyered is a hub for those who value knowledge, seek empathetic support, and believe in the power of expert guidance. Our team members, clients, partners, and stakeholders value wisdom and appreciate our ability to offer empathetic support, finding comfort in our practice of care. By presenting new ideas and fostering creativity, Lawyered continuously cultivates a sense of admiration and aspiration. We are a team of problem-solvers, innovators, and guides, united by a shared commitment to empower our stakeholders. We believe in the transformative power of knowledge and the positive impact of compassionate support.</p>

        {/* UPDATED: "Join Our Team" button now opens the new modal */}
        <button onClick={() => setJoinTeamModalOpen(true)} className="mt-8 bg-[#0891B2] text-black dark:text-white px-10 py-3 rounded-lg">
          Join Our Team
        </button>

       
        
      </div> 

      <AnimatePresence>
        {isFounderModalOpen && <FounderModal onClose={() => setFounderModalOpen(false)} />}
        {/* NEW: AnimatePresence will handle the new modal's appearance */}
        {isJoinTeamModalOpen && <JoinTeamModal onClose={() => setJoinTeamModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
