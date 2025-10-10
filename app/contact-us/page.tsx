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

  const spotlightStyle: CSSProperties = {
    opacity: isHovering ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    maskImage: `radial-gradient(circle 300px at ${delayedMousePosition.x}px ${delayedMousePosition.y}px, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 300px at ${delayedMousePosition.x}px ${delayedMousePosition.y}px, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  };

  return (
    <div className="relative w-full overflow-hidden" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Background elements */}
      <div className="absolute inset-0 h-full w-full bg-grid-white/[0.05]"></div>
      <div className="absolute inset-0 z-0" style={spotlightStyle}>
        <div className="relative w-full h-full opacity-40">
          <Image
            src="/MainFrame.png"
            alt="background frame"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="relative px-4 md:px-26 z-10 max-w-8xl mx-auto py-32 grid md:grid-cols-2 gap-16 items-center h-screen">
        {/* Left Column: Text Content */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
          <p className="text-base text-white leading-relaxed">
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
            src={isImageHovered ? "/contact11.png" : "/contact10.png"}
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
function ContactFormSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [errors, setErrors] = useState<{email?: string; phone?: string}>({});

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Generate captcha on component mount
  useEffect(() => {
    setGeneratedCaptcha(generateCaptcha());
  }, []);

  // Refresh captcha function
  const refreshCaptcha = () => {
    setGeneratedCaptcha(generateCaptcha());
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
    // Only allow numbers and limit to 10 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 10);
    setPhone(numericValue);
    setErrors(prev => ({ ...prev, phone: validatePhone(numericValue) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate all fields
      const emailError = validateEmail(email);
      const phoneError = validatePhone(phone);

      if (emailError || phoneError) {
        setErrors({ email: emailError, phone: phoneError });
        setFormStatus('Please fix the errors above.');
        return;
      }

      // Validate captcha
      if (captcha !== generatedCaptcha) {
        setFormStatus('Captcha verification failed. Please try again.');
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
              setGeneratedCaptcha(generateCaptcha()); // Generate new captcha for next use
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
          <h2 className="text-3xl text-white">
            Fill out the form and our executive will reach out to you
          </h2>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500 autofill:bg-gray-800/50"
              style={{
                backgroundColor: 'rgba(31, 41, 55, 0.5)',
              }}
              required
            />
            <div>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={handleEmailChange}
                className={`w-full bg-gray-800/50 border rounded-md p-3 placeholder-gray-500 autofill:bg-gray-800/50 ${errors.email ? 'border-red-500' : 'border-gray-700'}`}
                style={{
                  backgroundColor: 'rgba(31, 41, 55, 0.5)',
                }}
                required
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="relative">
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 text-gray-300 appearance-none cursor-pointer pr-10"
                style={{
                  backgroundColor: 'rgba(31, 41, 55, 0.5)',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none'
                }}
              >
                <option value="" disabled className="text-gray-500">Select Inquiry Type</option>
                <option value="Partnership">Partnership</option>
                <option value="Vendor">Vendor</option>
                <option value="Career">Career</option>
                <option value="Other">Others</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
              <style jsx>{`
                select option {
                  background-color: rgba(31, 41, 55, 0.9);
                  color: white;
                  padding: 8px;
                }
                select option:first-child {
                  color: #9CA3AF;
                }
                select:focus option {
                  background-color: rgba(31, 41, 55, 0.9);
                }

                /* Comprehensive autofill styling for all browsers */
                input:-webkit-autofill,
                input:-webkit-autofill:hover,
                input:-webkit-autofill:focus,
                input:-webkit-autofill:active,
                input:-webkit-autofill::first-line,
                textarea:-webkit-autofill,
                textarea:-webkit-autofill:hover,
                textarea:-webkit-autofill:focus,
                textarea:-webkit-autofill:active,
                input:autofill,
                input:autofill:hover,
                input:autofill:focus,
                input:autofill:active,
                textarea:autofill,
                textarea:autofill:hover,
                textarea:autofill:focus,
                textarea:autofill:active {
                  -webkit-box-shadow: 0 0 0 1000px rgba(31, 41, 55, 0.5) inset !important;
                  -webkit-text-fill-color: white !important;
                  -webkit-background-clip: text !important;
                  background-color: rgba(31, 41, 55, 0.5) !important;
                  background-clip: text !important;
                  border: 1px solid rgb(75 85 99) !important;
                  box-shadow: 0 0 0 1000px rgba(31, 41, 55, 0.5) inset !important;
                  text-fill-color: white !important;
                  -webkit-appearance: none !important;
                  appearance: none !important;
                }

                /* Additional fallback for stubborn browsers */
                input[data-autofilled],
                textarea[data-autofilled] {
                  background-color: rgba(31, 41, 55, 0.5) !important;
                  color: white !important;
                }
              `}</style>
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={handlePhoneChange}
                className={`w-full bg-gray-800/50 border rounded-md p-3 placeholder-gray-500 autofill:bg-gray-800/50 ${errors.phone ? 'border-red-500' : 'border-gray-700'}`}
                style={{
                  backgroundColor: 'rgba(31, 41, 55, 0.5)',
                }}
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
              className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500 autofill:bg-gray-800/50"
              style={{
                backgroundColor: 'rgba(31, 41, 55, 0.5)',
              }}
              required
            ></textarea>
            
            <div className="flex items-center gap-4">
              <div className="font-[Times New Roman] text-lg select-none bg-gray-700 px-3 py-2 rounded border">
                {generatedCaptcha}
              </div>
              <button type="button" onClick={refreshCaptcha} className="p-3 text-gray-400 hover:text-white transition-colors">
                <RefreshCw size={20} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter Captcha"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500 autofill:bg-gray-800/50"
              style={{
                backgroundColor: 'rgba(31, 41, 55, 0.5)',
              }}
              required
            />
            
            <div className="flex items-start gap-3 pt-2">
              <input type="checkbox" id="auth" checked={isAuthorized} onChange={(e) => setIsAuthorized(e.target.checked)} className="mt-1 h-4 w-4 rounded bg-gray-700 border-gray-600 accent-[#0891B2]" required />
              <label htmlFor="auth" className="text-base text-white">
                I hereby authorise to send notifications via SMS, Email, RCS and others as per <a href="/terms-and-conditions" className="text-[#0891B2] underline">Terms of Services</a> | <a href="/privacy-policy" className="text-[#0891B2] underline">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="w-full bg-[#0891B2] text-white py-3 text-base rounded-lg mt-4">
              Submit
            </button>
            {formStatus && <p className="text-center text-white">{formStatus}</p>}
          </form>
        </div>
        
        {/* Right Column: Email Info */}
        <div className="relative rounded-lg overflow-hidden p-8 flex flex-col justify-center items-center h-48">
            <Image src="/road-forest.jpg" alt="Road in a forest" layout="fill" className="object-cover z-0 opacity-80 grayscale"/>
            <div className="absolute inset-0 bg-black/70 z-10"></div>
            <div className="relative z-20 flex items-center gap-22">

              <div className="flex gap-4">

                <Mail size={28} className="text-white"/>
                <p className="text-lg text-white">Email</p>
              </div>
                <a href="mailto:info@lawyered.in" className=" hover:bg-white text-white hover:text-[#0891B2] bg-[#0891B2]  font-semibold px-6 py-2 text-lg">
                    info@lawyered.in
                </a>
            </div>
        </div>
      </div>
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
