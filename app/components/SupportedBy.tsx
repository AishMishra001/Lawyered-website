// app/components/SupportedBy.tsx
import Image from "next/image";

export function SupportedBy() {
  const logos = [
    { name: "ULIP", src: "/ULIP-logo.png" },
    { name: "AGAMI", src: "/agami-logo.png" },
    { name: "Entrepreneur", src: "/Enterpreneur-logo.png" },
    { name: "MSME", src: "/MSME-logo.png" },
    { name: "FADA", src: "/FADA-logo.png" },
    { name: "AITWA", src: "/aitwa.png" },
  ];

  return (
    <div className="pb-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-5xl font-semibold text-[#22D2EE] mb-8">Supported By</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {logos.map((logo) => {
            const isEnlarged = logo.name === "Entrepreneur" || logo.name === "ULIP";
            const imageClasses = `object-contain h-full w-full ${isEnlarged ? "scale-160" : ""}`;

            return (
              <div key={logo.name} className="h-26 w-56 bg-white flex items-center justify-center rounded-lg p-2 overflow-hidden">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={144}
                  height={64}
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