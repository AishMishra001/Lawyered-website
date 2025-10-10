"use client";

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
          -webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
          mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
        }
        .scroller[data-animated="true"] .scroller__inner {
          width: max-content;
          flex-wrap: nowrap;
          animation: scroll 30s linear infinite;
        }
        @keyframes scroll {
          to {
            transform: translate(calc(-50% - 0.75rem));
          }
        }
      `}</style>
      <div className="max-w-8xl mx-auto">
        <h2 className="text-4xl font-semibold text-[#22D2EE] mb-8">Supported By</h2>
        <div className="scroller" data-animated="true">
          <div className="scroller__inner">
            {[...logos, ...logos].map((logo, index) => {
              const isEnlarged = logo.name === "Entrepreneur" || logo.name === "ULIP";
              const imageClasses = `object-contain h-full w-full ${isEnlarged ? "scale-160" : ""}`;

              return (
                <div key={`${logo.name}-${index}`} className="h-10 lg:h-18 w-40 lg:w-45 bg-white flex items-center justify-center rounded-lg p-2 overflow-hidden flex-shrink-0">
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
    </div>
  );
}
