"use client";

import Image from "next/image";
import { Mail, RefreshCw } from "lucide-react";
import { useState, useEffect, MouseEvent, CSSProperties } from "react";

// Section 1: Hero
function AboutHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [delayedMousePosition, setDelayedMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);


  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isHovering) setIsHovering(true);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      const dx = mousePosition.x - delayedMousePosition.x;
      const dy = mousePosition.y - delayedMousePosition.y;

      setDelayedMousePosition({
        x: delayedMousePosition.x + dx * 0.05,
        y: delayedMousePosition.y + dy * 0.05,
      });
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition, delayedMousePosition]);

  // Mobile detection and rotation animation
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Rotation animation for both desktop and mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Desktop spotlight style (rotating mask with increased size)
  const desktopSpotlightStyle: CSSProperties = {
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
    maskImage: `radial-gradient(circle 400px at ${50 + 35 * Math.cos(rotation * Math.PI / 180)}% ${50 + 35 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 400px at ${50 + 35 * Math.cos(rotation * Math.PI / 180)}% ${50 + 35 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  };

  // Mobile spotlight style (rotating mask)
  const mobileSpotlightStyle: CSSProperties = {
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
    maskImage: `radial-gradient(circle 250px at ${50 + 30 * Math.cos(rotation * Math.PI / 180)}% ${50 + 30 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 250px at ${50 + 30 * Math.cos(rotation * Math.PI / 180)}% ${50 + 30 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  };

  return (
    <div className="relative w-full overflow-hidden" onMouseMove={!isMobile ? handleMouseMove : undefined} onMouseLeave={!isMobile ? handleMouseLeave : undefined}>
      {/* Background elements */}
      <div className="absolute inset-0 h-full w-full bg-grid-white/[0.05]"></div>

      {/* Desktop background - Light mode: Whitegrid11.png, Dark mode: MainFrame.png */}
      {!isMobile && (
        <>
          {/* Light mode background */}
          <div className="absolute inset-0 z-0 dark:hidden" style={desktopSpotlightStyle}>
            <div className="relative w-full h-full opacity-40">
              <Image
                src="/Whitegrid11.png"
                alt="background frame"
                fill
                className="object-cover"
              />
            </div>
          </div>
          {/* Dark mode background */}
          <div className="absolute inset-0 z-0 hidden dark:block" style={desktopSpotlightStyle}>
            <div className="relative w-full h-full opacity-40">
              <Image
                src="/MainFrame.png"
                alt="background frame"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </>
      )}

      {/* Mobile Grid background */}
      {isMobile && (
        <div className="absolute inset-0 z-0" style={mobileSpotlightStyle}>
          <div className="relative w-full h-full opacity-40">
            <Image
              src="/mobileGrid.png"
              alt="Mobile Grid Background"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="relative px-4 md:px-26 z-10 max-w-8xl mx-auto py-32 grid md:grid-cols-2 gap-16 items-center h-screen">
        {/* Left Column: Text Content */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-black dark:text-white text-center md:text-left">Contact Us</h1>
          <p className="text-base text-black dark:text-white leading-relaxed text-center md:text-left">
            Lawyered is redefining legal assistance for mobility in India. With a mission to make legal help as accessible as consumer products, we invite customers, partners, team members, investors and industry experts to be part of this transformational journey.
          </p>
        </div>

        {/* Right Column: Sticker */}
        <div 
          className="flex justify-center"
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <Image
            src={isImageHovered ? "/contact15.png" : "/contact14.png"}
            alt="Customer support agent"
            width={400}
            height={300}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

// Section 2: Forms
// Section 2: Forms
function ContactFormSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [captchaStyles, setCaptchaStyles] = useState<CSSProperties[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [errors, setErrors] = useState<{email?: string; phone?: string}>({});

  // Generate random captcha with styles
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    const styles: CSSProperties[] = [];
    
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
      // Add less extreme random styles for each character
      styles.push({
        transform: `rotate(${Math.random() * 20 - 10}deg) translateY(${Math.random() * 4 - 2}px)`, // Reduced rotation and shift
        display: 'inline-block',
        fontFamily: "'Playfair Display', serif", // A more readable, elegant font
        fontStyle: 'italic',
        fontWeight: '700',
      });
    }
    setGeneratedCaptcha(result);
    setCaptchaStyles(styles);
  };

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Refresh captcha function
  const refreshCaptcha = () => {
    generateCaptcha();
    setCaptcha('');
  };

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone) return 'Phone number is required';
    if (!phoneRegex.test(phone)) return 'Phone number must be exactly 10 digits';
    return '';
  };

  // Handle input changes with validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, '').slice(0, 10);
    setPhone(numericValue);
    setErrors(prev => ({ ...prev, phone: validatePhone(numericValue) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const emailError = validateEmail(email);
      const phoneError = validatePhone(phone);

      if (emailError || phoneError) {
        setErrors({ email: emailError, phone: phoneError });
        setFormStatus('Please fix the errors above.');
        return;
      }

      if (captcha.toUpperCase() !== generatedCaptcha.toUpperCase()) {
        setFormStatus('Captcha verification failed. Please try again.');
        refreshCaptcha();
        return;
      }

      setFormStatus('Submitting...');
          const formData = {
          name,
          email,
          inquiryType,
          phone,
          message,
          captcha,
          isAuthorized,
      };

      try {
          // Submit directly to the webhook service from the browser
          // This bypasses server-side origin restrictions
          const response = await fetch('https://automate.indiaaccelerator.co/webhook/b688bd42-a402-45ed-874a-a816601bcad3', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Referer': window.location.origin,
                  'Origin': window.location.origin,
              },
              body: JSON.stringify(formData),
          });

          const responseData = await response.json();

          if (response.ok && responseData.message === "Workflow was started") {
              setFormStatus('Your message has been sent successfully!');
              // Reset form
              setName('');
              setEmail('');
              setInquiryType('');
              setPhone('');
              setMessage('');
              setCaptcha('');
              setIsAuthorized(false);
              generateCaptcha(); // Generate new captcha for next use
          } else {
              console.log('Webhook response:', responseData);
              setFormStatus('An error occurred. Please try again.');
          }
      } catch (error) {
          console.error('Form submission error:', error);
          setFormStatus('An error occurred. Please try again.');
      }
  };

  return (
    <div className="pb-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left Column: Form */}
        <div className="border border-gray-800 rounded-lg p-8 space-y-10">
          <h2 className="text-3xl text-black dark:text-white">
            Fill out the form and our executive will reach out to you
          </h2>
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* ... other form inputs ... */}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white dark:bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500"
              required
            />
            <div>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={handleEmailChange}
                className={`w-full bg-white dark:bg-gray-800/50 border rounded-md p-3 placeholder-gray-500 ${errors.email ? 'border-red-500' : 'border-gray-700'}`}
                required
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
            </div>
             <div className="relative">
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full bg-white dark:bg-gray-800/50 border border-gray-700 rounded-md p-3 text-gray-900 dark:text-gray-300 appearance-none cursor-pointer pr-10"
                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                required
              >
                <option value="" disabled>Select Inquiry Type</option>
                <option value="Partnership">Partnership</option>
                <option value="Vendor">Vendor</option>
                <option value="Career">Career</option>
                <option value="Other">Others</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={handlePhoneChange}
                className={`w-full bg-white dark:bg-gray-800/50 border rounded-md p-3 placeholder-gray-500 ${errors.phone ? 'border-red-500' : 'border-gray-700'}`}
                maxLength={10}
                required
              />
              {errors.phone && <p className="mt-2 text-sm text-red-500">{errors.phone}</p>}
            </div>
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full bg-white dark:bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500"
              required
            ></textarea>

            {/* START: REVISED CAPTCHA SECTION */}
            <div className="flex items-center gap-4">
              <div className="relative flex items-center justify-center w-52 h-[60px] select-none bg-white dark:bg-gray-900 px-4 rounded-lg border border-gray-700 text-black dark:text-white overflow-hidden">
                {/* Strikethrough Line */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black dark:bg-white -translate-y-[1px] z-10"></div>
                
                <div className="flex items-center justify-center">
                  {generatedCaptcha.split('').map((char, index) => (
                      <span key={index} style={captchaStyles[index]} className="text-4xl px-1">
                          {char}
                      </span>
                  ))}
                </div>
              </div>
              <button type="button" onClick={refreshCaptcha} className="p-3 text-gray-400 hover:text-white transition-colors bg-gray-700 hover:bg-gray-600 rounded-full border border-gray-600">
                <RefreshCw size={20} />
              </button>
            </div>
            {/* END: REVISED CAPTCHA SECTION */}

            <input
              type="text"
              placeholder="Enter Captcha"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              className="w-full bg-white dark:bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500"
              required
            />
            
            <div className="flex items-start gap-3 pt-2">
              <input type="checkbox" id="auth" checked={isAuthorized} onChange={(e) => setIsAuthorized(e.target.checked)} className="mt-1 h-4 w-4 rounded bg-gray-700 border-gray-600 accent-[#0891B2]" required />
              <label htmlFor="auth" className="text-base text-black dark:text-white">
                I hereby authorise to send notifications via SMS, Email, RCS and others as per <a href="/terms-and-conditions" className="text-[#0891B2] underline">Terms & Conditions</a> | <a href="/privacy-policy" className="text-[#0891B2] underline">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="w-full bg-[#0891B2] text-black dark:text-white py-3 text-base rounded-lg mt-4">
              Submit
            </button>
            {formStatus && <p className="text-center text-black dark:text-white mt-4">{formStatus}</p>}
          </form>
        </div>
        
        {/* Right Column: Email Info */}
        <div className="relative rounded-lg overflow-hidden p-8 flex flex-col justify-center items-center h-48">
            <Image src="/road-forest.jpg" alt="Road in a forest" layout="fill" className="object-cover z-0 opacity-80 grayscale"/>
            <div className="absolute inset-0 bg-black/70 z-10"></div>
            <div className="relative z-20 text-center">
              <h3 className="text-lg md:text-2xl text-white dark:text-white px-4">Connect with us to know more at</h3>
              <a
                href="mailto:info@lawyered.in"
                className="inline-block mt-4 md:mt-6 bg-[#0891B2] text-black hover:bg-white hover:text-[#0891B2] dark:text-white dark:hover:bg-white dark:hover:text-[#0891B2] font-bold text-base md:text-lg px-8 md:px-12 py-3 md:py-4 mx-auto"
              >
                info@lawyered.in
              </a>
            </div>
        </div>
      </div>
       <style jsx global>{`
        /* Import a more readable, stylish font */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap');
        
        select option {
          background-color: white;
          color: black;
        }
        :global(.dark) select option {
          background-color: rgba(31, 41, 55, 0.9);
          color: white;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px #1f2937 inset !important; /* bg-gray-800 */
            -webkit-text-fill-color: white !important;
        }
      `}</style>
    </div>
  );
}


// Assembling the page
export default function AboutUsPage() {
  return (
    <>
      <AboutHero />
      <ContactFormSection />
    </>
  );
}
