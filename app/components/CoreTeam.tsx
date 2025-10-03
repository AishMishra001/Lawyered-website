import Image from "next/image";

export function CoreTeam() {
  const team = [
    { name: "Himanshu Gupta", title: "Founder & CEO", img: "/about1.png" },
    { name: "Ashish Bhatia", title: "Founding Partner", img: "/about2.png" },
    { name: "Deepak Sharma", title: "Chief Agility Officer", img: "/about3.png" },
    { name: "Gautam Saraf", title: "Managing Partner / Chief Growth Officer", img: "/about4.png" },
    { name: "Samik Chaudhuri", title: "Chief Revenue Officer", img: "/about5.png" },
    { name: "Syed Asif Iqbal", title: "Chief Product & Strategy Officer", img: "/about6.png" },
    { name: "Mahendra Singh", title: "Chief Delivery Officer", img: "/about7.png" },
    { name: "Amit Katyal", title: "Chief Financial Officer", img: "/about8.png" },
    { name: "Maninder Singh Bawa", title: "Chief Technical Officer", img: "/about9.png" },
  ];
  return (
    <div className="py-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-4xl font-bold text-brand-cyan mb-12 text-center">Our Core Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
          {team.map(member => (
            <div key={member.name} className="text-center">
              <Image src={member.img} alt={member.name} width={200} height={200} className="rounded-full mx-auto"/>
              <h3 className="text-lg font-bold text-white mt-4">{member.name}</h3>
              <p className="text-sm text-gray-400">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}