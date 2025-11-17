"use client";

import Image from "next/image";

export function TrustedPartners() {
  const logos = [
    { name: "Spinny", src: "/Spinney-logo.png" },
    { name: "OLX Autos", src: "/OLxAutos-logo.png" },
    { name: "droom", src: "/droom-logo.png" },
    { name: "Park+", src: "/Park-logo.png" },
    { name: "91Trucks", src: "/Trucks.png" },
    { name: "CARS24", src: "/Cars24-logo.png" },
    { name: "ALD Automotives", src: "/aldAutomotive.png" },
    { name: "Car Dekho", src: "/carDekho.png" },
    { name: "Renew Buy", src: "/renewBuy.png" },
    { name: "Car Info", src: "/carInfo.png" },
  ];

  return (
    <div className="py-24 px-4 md:px-26">
      <style jsx>{`
        .scroller {
          max-width: 100%;
        }
        .scroller__inner {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .scroller[data-animated="true"] {
          overflow: hidden;
          -webkit-mask: linear-gradient(
            90deg,
            transparent,
            white 20%,
            white 80%,
            transparent
          );
          mask: linear-gradient(
            90deg,
            transparent,
            white 20%,
            white 80%,
            transparent
          );
        }
        .scroller[data-animated="true"] .scroller__inner {
          width: max-content;
          flex-wrap: nowrap;
          animation: scroll 40s linear infinite;
        }
        @keyframes scroll {
          to {
            transform: translate(calc(-50% - 0.75rem));
          }
        }
      `}</style>

      <div className="max-w-8xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-semibold text-[#00A2BB] dark:text-[#22D3EE] mb-8 text-center md:text-left">
          Trusted Partners
        </h2>
        <div className="scroller" data-animated="true">
          <div className="scroller__inner">
            {[...logos, ...logos].map((logo, index) => {
              const isEnlarged =
                logo.name === "91Trucks" ||
                logo.name === "OLX Autos" ||
                logo.name === "Car Info" ||
                logo.name === "Car Dekho";
              const imageClasses = `object-contain h-full w-full ${
                isEnlarged ? "scale-200" : ""
              }`;
              return (
                <div
                  key={`${logo.name}-${index}`}
                  className="h-12 lg:h-18 w-36 lg:w-45 bg-[#F7F7F7] dark:bg-[#F7F7F7] flex items-center justify-center rounded-lg p-2 overflow-hidden flex-shrink-0"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={200}
                    height={100}
                    className={imageClasses}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
