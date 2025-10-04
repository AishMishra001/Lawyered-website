// app/components/TrustedPartners.tsx
import Image from "next/image";

export function TrustedPartners() {
  const logos = [
    { name: "Spinny", src: "/Spinney-logo.png" },
    { name: "OLX Autos", src: "/OLxAutos-logo.png" },
    { name: "droom", src: "/droom-logo.png" },
    { name: "Park+", src: "/Park-logo.png" },
    { name: "91Trucks", src: "/Trucks.png" },
    { name: "CARS24", src: "/Cars24-logo.png" },
  ];
  
  return (
    <div className="pt-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-5xl font-semibold text-[#22D2EE] mb-8">Trusted Partners</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {logos.map(logo => {
            const isEnlarged = logo.name === "91Trucks" || logo.name === "OLX Autos";
            const imageClasses = `object-contain h-full w-full ${isEnlarged ? "scale-220" : ""}`;

            return (
              <div key={logo.name} className="h-10 lg:h-18 w-40 lg:w-45 bg-white flex items-center justify-center rounded-lg p-2 overflow-hidden">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={190}
                  height={80}
                  className={imageClasses}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}