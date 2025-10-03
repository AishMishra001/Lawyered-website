import { Truck, Landmark, CheckCircle, CarTaxiFront } from "lucide-react";

const stats = [
  {
    icon: <CarTaxiFront size={48} className="text-gray-400" />,
    value: "5.5 Lakhs+",
    label: "Vehicles Protected",
  },
  {
    icon: <Truck size={48} className="text-gray-400" />,
    value: "1.65 Lakhs+",
    label: "Challans Resolved",
  },
  {
    icon: <Landmark size={48} className="text-gray-400" />,
    value: "61 Crore+",
    label: "Savings on Legal Fee",
  },
  {
    icon: <CheckCircle size={48} className="text-gray-400" />,
    value: "99%",
    label: "Successful Resolutions",
  },
];

export function Stats() {
  return (
    <div className="py-24 px-4 md:px-26">
              <div className="max-w-8xl mx-auto">
                <h2 className="text-5xl font-semibold text-[#22D2EE] mb-4">Trusted By Millions</h2>
                <p className="text-gray-300 text-2xl mb-8">Join the Largest Challan Resolution Platform in India</p>        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-8 items-center p-6 border border-gray-400">
              {stat.icon}
              <p className="text-3xl font-bold mt-4 text-white">{stat.value}</p>
              <p className="text-gray-400 text-2xl mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}