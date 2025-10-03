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
    <div className="py-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-5xl font-semibold text-[#22D2EE]">
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

        <div className="grid md:grid-cols-3 gap-14 max-w-8xl">
          {newsData.map((article, index) => (
            <div key={index} className="border border-gray-500 p-6 flex flex-col gap-8">
              <p className="font-bold text-gray-400 tracking-widest text-sm uppercase  mb-4">{article.source}</p>
              <h3 className="text-lg font-semibold text-brand-cyan mb-3 max-w-lg">
                <Link href={article.link} className="hover:underline text-2xl text-[#22D2EE]">
                  {article.headline}
                </Link>
              </h3>
              <p className="text-white text-xl leading-relaxed mb-6 max-w-lg">
                {article.description}
              </p>
              <div className="mt-auto flex justify-between items-center text-sm">
                <span className="text-gray-500">{article.date}</span>
                <Link href={article.link} className="text-[#22D2EE] text-lg hover:underline font-semibold">
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