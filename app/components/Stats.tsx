import { Car, Truck, Landmark, CheckCircle } from "lucide-react";

const stats = [
  {
    icon: <Car size={48} className="text-gray-400" />,
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
    <div className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-semibold text-[#22D2EE] mb-4">Trusted By Millions</h2>
        <p className="text-gray-300 text-lg">Join the Largest Challan Resolution Platform in India</p>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center p-6 border border-gray-800 rounded-lg bg-black/20">
              {stat.icon}
              <p className="text-4xl font-bold mt-4 text-white">{stat.value}</p>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}