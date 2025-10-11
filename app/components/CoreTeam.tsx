"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, X } from "lucide-react";

interface TeamMember {
  name: string;
  title: string;
  img: string;
  linkedin: string;
  description: string;
}

const TeamMemberModal = ({ member, onClose }: { member: TeamMember; onClose: () => void }) => {
  const nameParts = member.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative bg-[#1a1a1a] rounded-xl p-6 md:p-8 max-w-3xl w-full border border-gray-700">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X /></button>
        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6 md:gap-8 mb-6">
          <Image src={member.img} alt={member.name} width={150} height={150} className="rounded-full flex-shrink-0 w-28 h-28 md:w-36 md:h-36"/>
          <div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-white" style={{ WebkitTextStroke: "1px white" }}>
                {firstName.toUpperCase()}
              </span>
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-[#22D2EE]">
                {lastName.toUpperCase()}
              </span>
            </div>
            <p className="text-base md:text-lg text-gray-300 mt-2">{member.title}</p>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 border border-gray-600 px-4 py-2 rounded-lg text-xs md:text-sm text-gray-300 hover:bg-gray-700">
              <Linkedin size={16}/> LinkedIn
            </a>
          </div>
        </div>
        <div className="text-gray-400 space-y-4 text-xs md:text-sm leading-relaxed max-h-[50vh] md:max-h-none overflow-y-auto">
          <p>{member.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export function CoreTeam() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const team: TeamMember[] = [
    { name: "Himanshu Gupta", title: "Founder & CEO", img: "/about1.png", linkedin: "https://www.linkedin.com/in/gupta-himanshu/", description: "Himanshu Gupta is revolutionizing the legal tech landscape. With an engineering background and as an alumnus of IIM Calcutta, he brings over two decades of expertise in product development and management. His passion lies in transforming traditional legal services into innovative legal consumer products that cater to both individuals and businesses. Throughout his career, Himanshu has been committed to developing products and solutions that bridge the gap between legal professionals and consumers. At Lawyered, he leads the charge in developing tech-driven legal products designed to change how people think about and access legal assistance. Under his leadership, Lawyered is redefining the legal landscape by offering cutting-edge products that make legal solutions more accessible and affordable. His vision is to leverage the latest technologies to make legal products within reach for everyone, making a real impact in the lives of individuals and businesses alike. Lawyered is not just keeping pace with the future of legal tech—it’s defining it." },
    { name: "Ashish Bhatia", title: "Founding Partner", img: "/about2.png", linkedin: "https://www.linkedin.com/in/bhatia-ashish/", description: "Ashish has over two decades of experience in leadership positions and as a strategist at reputed MNCs followed by huge success in building the startup ecosystem. Recognized as a key player in the Indian entrepreneurial ecosystem, he has contributed his rich and dynamic experience to the growth of Lawyered. His areas of expertise include product management, marketing strategy, digital transformation, business development and sales enablement." },
    // { name: "Deepak Sharma", title: "Chief Agility Officer", img: "/about3.png", linkedin: "https://www.linkedin.com/in/deepak-sharma-21617622/", description: "Deepak's passion for technology and innovation has led him to work with Fortune 500 companies, venture-backed startups, and many others across the globe. Deepak has a global perspective on Agile and Lean practices, product discovery techniques, design thinking, DevOps processes and more. Deepak's goal is to help organizations become more efficient and able to quickly adapt to change in order to survive in today's fast-paced world." },
    { name: "Gautam Saraf", title: "Managing Partner / Chief Growth Officer", img: "/about4.png", linkedin: "#", description: "Gautam is a firm believer in the saying, Giving takes care of getting. That's why he's passionate about undertaking the journey with the founders. Gautam has over 3 decades of diverse experience in International Trade, Finance, Distribution and Land Development. He has played a major role in bringing some influential corporations into India and helping them establish nationwide distribution networks and achieving multi-million dollar turnovers." },
    { name: "Samik Chaudhuri", title: "Chief Revenue Officer", img: "/about5.png", linkedin: "https://www.linkedin.com/in/samik-chaudhuri-b80bbab/", description: "With over 2 decades of career in business development, strategic planning, etc, Samik has been instrumental in creating successful businesses that survive on delivering continuous value to its clients. With his in-depth knowledge of a variety of industries, including logistics, hotels, CSR and public relations—as well as writing business deals—Samik heads the Business Development at Lawyered. He is responsible for getting money on the table by securing lucrative clients for our innovative legal products." },
    { name: "Syed Asif Iqbal", title: "Chief Product & Strategy Officer", img: "/about6.png", linkedin: "https://www.linkedin.com/in/syed-asif-iq/", description: "Asif is a Lawyer turned serial entrepreneur. He is one of the few experts who brings a very special mix of legal and business skills to the table. He has previously co-founded a number of legal-tech companies, including advok8.in and LSU (which was acquired by Lawyered). With his knowledge of the law, product expertise and business sense, he heads Lawyered's product and strategy." },
    { name: "Mahendra Singh", title: "Chief Delivery Officer", img: "/about7.png", linkedin: "https://www.linkedin.com/in/mahendra-singh-718b51145/", description: "Mahendra has worked in the business & process operations for more than a decade. He has been a part of several successful growth initiatives, and has worked on improving the customer experience, service delivery and optimizing the operations. He is passionate about process improvement and innovation. As Head of Business Operations at Lawyered, he puts his many years’ worth of experience to work and helps the company grow." },
    { name: "Amit Katyal", title: "Chief Financial Officer", img: "/about8.png", linkedin: "https://www.linkedin.com/in/amit-katyal-8436809/", description: "Amit Katyal, the accomplished Chief Financial Officer (CFO) of Lawyered, brings a wealth of experience and a diverse skill set to his role. With an impressive work history that includes tenures at prominent companies such as OYO, Excitel, and Snap Deal, Amit has solidified his reputation as a financial management and advisory expert. His key skills encompass accounting, bookkeeping, financial accounting, financial advisory, financial planning, and financial consulting, forming the bedrock of his financial proficiency. With over two decades of experience across varied industries, including Media, Publishing, and Digital, Amit has delved into every facet of senior finance roles, from strategic decision-making to planning and analysis, statutory accounting, risk management, ERP implementation, taxation, and compliance. Notable specialties include his proven leadership skills, enabling him to effectively manage and motivate cross-functional teams across different locations, his established relationship management abilities, his proficiency in complex matrix structures, and his specific expertise in startups, where he excels at setting up companies and establishing essential business infrastructure. In his role as CFO, Amit Katyal is committed to steering Lawyered toward financial excellence and growth in the dynamic and ever-evolving business landscape." },
    { name: "Maninder Singh Bawa", title: "Chief Technical Officer", img: "/about9.jpeg", linkedin: "https://www.linkedin.com/in/maninder-singh-bawa/", description: "Maninder brings over a decade of hands-on experience building large-scale SaaS products, leading engineering teams, and solving some seriously complex tech challenges. From McKinsey & Co. to Classplus, and most recently at Delivery Hero in Singapore, he’s built things that not only scale, but also work beautifully under the hood. At Lawyered, Maninder will be steering everything TECH—strategy, product evolution, AI, and platform excellence. He’ll also be closely working with our product and dev teams to sharpen our roadmap, speed up innovation, and ensure that what we’re building is as solid on the inside as it is impressive on the outside. What’s really great is that he’s not just about tech—he’s passionate about mentoring, teaching, and building high-energy teams. So, expect a lot of whiteboard scribbles, idea jams, and deep dives into architecture and AI." },
    { name: "Ranjoy Dey", title: "Chief Marketing Officer", img: "/about28.png", linkedin: "https://www.linkedin.com/in/ranjoydey/", description: "Ranjoy is a strategic marketing leader with 25+ years of experience across the full evolution of marketing; from the integrated marketing era to the rise of digital, and now into the AI-driven future. Ranjoy's career spans leadership roles across global Advertising & Media agencies, fast-scaling startups, and purpose-led ventures. He has worked with some of the world’s biggest enterprise brands as well as emerging MSMEs, helping each solve business challenges through marketing creativity, growth strategies, and P&L impact. Ranjoy brings deep cross-functional experience across brand, digital, content, product marketing, PR, demand generation, and sales enablement; and works closely with Founders, CXOs, Boards, and internal teams to build strategies that drive functional and commercial goals." },
  ];

  return (
    <div className="py-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-cyan mb-12 text-center">Our Core Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
          {team.map(member => (
            <div key={member.name} className="text-center cursor-pointer" onClick={() => setSelectedMember(member)}>
              <Image src={member.img} alt={member.name} width={200} height={200} className="rounded-full mx-auto"/>
              <h3 className="text-base md:text-lg font-bold text-white mt-4">{member.name}</h3>
              <p className="text-xs md:text-sm text-gray-400">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedMember && <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
      </AnimatePresence>
    </div>
  );
}