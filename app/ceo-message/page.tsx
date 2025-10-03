// app/ceo-message/page.tsx

import Image from "next/image";

// Hero Section Component
function CeoHero() {
  return (
    <div className="relative w-full overflow-hidden pt-10">
      {/* Grid Background */}
      <div className="absolute inset-0 h-full w-full bg-grid-white/[0.05]"></div>
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <div className="relative w-1/2 h-1/2">
            <Image
                src="/Frame.png"
                alt="background frame"
                fill
                className="object-contain opacity-70"
            />
        </div>
      </div>

      <div className="relative px-4 md:px-26 z-10 max-w-8xl mx-auto py-24 grid md:grid-cols-5 gap-32 items-center">
        {/* Left Column: Text Content */}
        <div className="md:col-span-3 flex flex-col gap-10">
          <h1 className="text-5xl lg:text-5xl font-bold leading-tight text-white">
            A Note from our Founder,<br />Himanshu Gupta
          </h1>
          <div>
            <h2 className="text-3xl lg:text-4xl text-gray-200">
              From Reactive to <span className="text-[#22D2EE]">Predictive</span> to <span className="text-[#22D2EE]">Preventive</span> Advantage
            </h2>
            <p className="mt-4 text-gray-400 text-lg">
              Gen AI-driven Legal Risk Management (LRM) for the mobility sector—monitor, predict, and resolve legal issues before they disrupt operations.
            </p>
          </div>
        </div>

        {/* Right Column: Founder's Photo */}
        <div className="md:col-span-2 flex justify-center items-center">
          {/* Apply gradient fade to the image */}
          <div className="relative">
            <Image
              src="/founder.png" // Assuming you renamed the image to this
              alt="Himanshu Gupta, Founder & CEO"
              width={500}
              height={500}
              className="object-contain"
            />
            {/* Overlay for the gradient effect */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#14141A] to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}


// Content Section Component
function CeoContent() {
  const messageParagraphs = [
    "Dear friends,",
    "When I think back about “why Lawyered”, it’s something very simple. For most people, law feels like a wall, not a safety net. The moment you need legal help, it’s usually because something has already gone wrong. That always felt unjust to me. Why should law only show up when you’re already stuck?",
    "Legal risks aren’t rare. They exist in our lives every day. It could be a notice that arrives out of the blue, a compliance paperwork gap that stalls your business, a property legality that stalls a deal, a dispute at work, or a traffic challan that won’t go away. For individuals, families, and businesses alike, these pile up into stress, wasted time, and money lost. And more than the cost, it’s the helplessness that hurts.",
    "Law has always been reactive. It’s like a fire brigade that rushes in after damage is done. With Lawyered, we’re trying to flip that situation. We want to make legal help proactive, predictive, and ultimately preventive. A system that spots risks early, guides decisions in real time, and quietly prevents crises before they happen.",
    "That’s why we don’t see ourselves as just another legal-tech company. We’re building legal infrastructure- deep, vertical solutions designed for real-life legal pain points. We began with the mobility sector because the pain there is urgent and recurring. But the vision is bigger: finance, real estate, healthcare, commerce. Anywhere people and businesses keep running into the same legal pain loops, Lawyered should be the safety ‘layer they reach out for. This isn’t about technology for its own sake. It’s about dignity, confidence, and the ability to move forward without fear of being blindsided by the process. That’s the future we want to create; one where law protects, empowers, and stays one step ahead of life’s risks. Thank you for walking this road with us.",
  ];

  return (
    <div className="bg-brand-dark py-12 px-4 md:px-26">
      <div className="max-w-8xl  mx-auto space-y-8 text-gray-300 text-lg leading-relaxed">
        {messageParagraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
        
        {/* Signature */}
        <div className="pt-8">
          <p>Regards,</p>
          <p className="text-4xl font-bold text-[#22D2EE] mt-4">Himanshu Gupta</p>
          <p className="text-gray-400">Founder & CEO</p>
        </div>
      </div>
    </div>
  );
}


// Assembling the page
export default function CeoMessagePage() {
  return (
    <>
      <CeoHero />
      <CeoContent />
    </>
  );
}