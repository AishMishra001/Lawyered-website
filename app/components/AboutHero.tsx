import Image from "next/image";

export function AboutHero() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full bg-grid-white/[0.05]"></div>
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <div className="relative w-1/2 h-1/2">
          <Image src="/Frame.png" alt="background frame" fill className="object-contain opacity-100 scale-135"/>
        </div>
      </div>
      <div className="relative px-4 md:px-26 z-10 max-w-8xl mx-auto py-56 grid md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-4 pl-20">
          <h1 className="text-8xl font-semibold text-white">About Us</h1>
          <p className="text-4xl text-gray-300">70,000+ lawyers Network</p>

        </div>
        <div className="flex justify-center">
          <Image src="/aboutus.png" alt="About Us Sticker" width={700} height={500} className="object-contain"/>
        </div>
        <div className="md:col-span-2 flex justify-center">
          <div className="flex gap-2 mt-4">
            <div className="w-4 h-4 rounded-full bg-[#22D2EE]"></div>
            <div className="w-4 h-4 rounded-full bg-gray-600"></div>
            <div className="w-4 h-4 rounded-full bg-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
}