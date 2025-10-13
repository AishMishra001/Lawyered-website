import Image from "next/image";

const stats = [
  {
    icon: <Image src="/trust3.png" alt="Vehicles Protected" width={100} height={100} />,
    value: "5.5 Lakhs+",
    label: "Vehicles Protected",
  },
  {
    icon: <Image src="/trust1.png" alt="Challans Resolved" width={100} height={100} />,
    value: "1.65 Lakhs+",
    label: "Challans Resolved",
  },
  {
    icon: <Image src="/trust2.png" alt="Savings on Legal Fee" width={100} height={100} />,
    value: "61 Crore+",
    label: "Savings on Legal Fee",
  },
  {
    icon: <Image src="/trust4.png" alt="Successful Resolutions" width={100} height={100} />,
    value: "99%",
    label: "Successful Resolutions",
  },
];

export function Stats() {
  return (
    <div className="py-16 md:py-24 px-4 md:px-24">
      <div className="max-w-8xl mx-auto text-start">
        <h2 className="text-2xl md:text-4xl font-semibold text-[#22D2EE] mb-4">Trusted By Millions</h2>
        <p className="text-gray-300 text-base mb-8 md:mb-12">Join the Largest Challan Resolution Platform in India</p>
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-3 items-start text-center p-4 md:py-6 md:pl-6 border border-gray-700">
              <div className="h-20 w-20 flex items-center justify-start">
                {stat.icon}
              </div>
              <p className="text-xl md:text-2xl font-bold mt-2 text-white">{stat.value}</p>
              <p className="text-xs md:text-base  mt-1 pb-6">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}