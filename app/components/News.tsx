// app/components/News.tsx

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const newsData = [
  {
    source: "YOURSTORY",
    headline: "Revolutionizing On-Road Legal Support: Lawyered's Journey Towards Accessible Justice",
    description: "Lawyered, a legal tech startup founded by Himanshu Gupta, is transforming the landscape of on-road legal assistance for vehicle owners in India. With its innovative LOTS platform, the company connects users to a network of over 70,000 lawyers for immediate support on traffic violations and legal disputes, operating 24/7 across 98% of India's pin codes.",
    date: "Apr 02, 2025",
    link: "#",
  },
  {
    source: "abp",
    headline: "Contracts To Code: Legal Tech is Shaping India's Startup Future. Here's How",
    description: "Lawyered, a legal tech startup founded by Himanshu Gupta, is transforming the landscape of on-road legal assistance for vehicle owners in India. With its innovative LOTS platform, the company connects users to a network of over 70,000 lawyers for immediate support on traffic violations and legal disputes, operating 24/7 across 98% of India's pin codes.",
    date: "Apr 02, 2025",
    link: "#",
  },
  {
    source: "ThePrint",
    headline: "LOTS Launches at Dealerships in Chhattisgarh with FADA & RADA",
    description: "On February 28, 2024, the Federation of Automobile Dealers Associations (FADA) and the Raipur Automobile Dealers Association (RADA) welcomed the launch of Lawyered's flagship product, LOTS24x7 (On-Road Legal Assistance), at dealerships across Raipur, Chhattisgarh.",
    date: "Apr 02, 2025",
    link: "#",
  },
];

export function News() {
  return (
    <div className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-semibold text-[#22D2EE]">
            Latest News and Media
          </h2>
          <div className="flex items-center gap-4">
            <button className="p-2 border border-gray-700 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <button className="p-2 border border-gray-700 rounded-full hover:bg-white/10 transition-colors">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsData.map((article, index) => (
            <div key={index} className="border border-gray-800 rounded-lg p-6 flex flex-col bg-black/20">
              <p className="font-bold text-gray-400 tracking-widest text-sm uppercase mb-4">{article.source}</p>
              <h3 className="text-lg font-semibold text-brand-cyan mb-3">
                <Link href={article.link} className="hover:underline">
                  {article.headline}
                </Link>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {article.description}
              </p>
              <div className="mt-auto flex justify-between items-center text-sm">
                <span className="text-gray-500">{article.date}</span>
                <Link href={article.link} className="text-brand-cyan hover:underline font-semibold">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}