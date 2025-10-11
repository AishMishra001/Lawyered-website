"use client";

import Image from "next/image";
import React, { useState, useEffect, MouseEvent, CSSProperties } from "react";

// Section 1: Hero
function PrivacyHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [delayedMousePosition, setDelayedMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
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

  // Rotation animation for mobile
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [isMobile]);

  // Desktop spotlight style (mouse-following)
  const desktopSpotlightStyle: CSSProperties = {
    opacity: isHovering ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    maskImage: `radial-gradient(circle 300px at ${delayedMousePosition.x}px ${delayedMousePosition.y}px, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 300px at ${delayedMousePosition.x}px ${delayedMousePosition.y}px, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  };

  // Mobile spotlight style (rotating mask)
  const mobileSpotlightStyle: CSSProperties = {
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
    maskImage: `radial-gradient(circle 200px at ${50 + 30 * Math.cos(rotation * Math.PI / 180)}% ${50 + 30 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 200px at ${50 + 30 * Math.cos(rotation * Math.PI / 180)}% ${50 + 30 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  };

  return (
    <div className="relative w-full overflow-hidden" onMouseMove={!isMobile ? handleMouseMove : undefined} onMouseLeave={!isMobile ? handleMouseLeave : undefined}>
      {/* Background elements */}
      <div className="absolute inset-0 h-full w-full bg-grid-white/[0.05]"></div>

      {/* Desktop MainFrame background */}
      {!isMobile && (
        <div className="absolute inset-0 z-0" style={desktopSpotlightStyle}>
          <div className="relative w-full h-full opacity-40">
            <Image
              src="/MainFrame.png"
              alt="background frame"
              fill
              className="object-cover"
            />
          </div>
        </div>
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
        <div className="flex flex-col gap-6 pl-10">
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="text-xl text-white leading-relaxed">
           We aim to make our privacy practices clear, transparent, and user-friendly. Our goal is to ensure you always feel confident and informed about how your data is handled.
          </p>
        </div>

        {/* Right Column: Sticker */}
        <div className="flex justify-center">
          <Image
            src="/privacy-policy.png"
            alt="Privacy Policy Document Icon"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

// Section 2-9: Content Body
function PrivacyContent() {
  return (
    <div className="pb-16 px-4 md:px-26">
      <div className="max-w-8xl mx-auto text-white leading-relaxed space-y-14">
        {/* Intro Section */}
        <div className="space-y-6 text-base">
            <p className="text-white">LAST UPDATED - 25th February 2025</p>
            <p className="mt-8">Thank you for visiting our website.</p>
            <p>Disclaimer: - At Sproutech Solutions Private Limited (Regd Name), we take your privacy and data security seriously. While we implement robust measures to protect your personal information, including encryption and regular security audits, it’s essential to recognize that no system can guarantee absolute immunity from cyber threats or malicious activities. We continuously strive to mitigate these risks, and by using our services, you agree to accept any residual risk. Sproutech Solutions Private Limited disclaims all liability for any unauthorized access, disclosure, or alteration of your information that may occur despite our best efforts.</p>
            <p>We encourage you to take proactive steps to safeguard your data, such as using strong passwords and keeping your account credentials confidential.</p>
            <p>Your continued use of our platform constitutes your understanding and acceptance of these risks. For detailed information about how we collect, use, and protect your data, please review our Privacy Policy.</p>
            <p>We are committed to protecting your privacy and personal information. This policy outlines how data is collected, used, and safeguarded during your use of our website.</p>
        </div>

        {/* 1. DEFINITION */}
        <div>
            <div className="text-lg  text-white mt-12 mb-6">1. DEFINITION.</div>
            <div className="space-y-4">
                <p>a) Personal Data refers to any information that relates to an identified or identifiable individual, either directly or indirectly, including but not limited to name, contact details, address, email, date of birth, demographic details, and government-issued identification numbers such as Aadhaar, PAN, passport, or driver’s license.</p>
                <p>b) Sensitive Personal Data refers to personal data that requires a higher level of protection due to its sensitive nature and potential impact on an individual’s privacy, security, or rights if disclosed. This includes financial information such as bank account details, credit/debit card numbers, and payment transaction data; Know Your Customer (KYC) information including identity verification documents and proof of address; vehicle registration details and ownership records; biometric data such as fingerprints, facial recognition, and retina scans (if applicable); authentication credentials including passwords, security codes, and OTPs; and any other data classified as sensitive under applicable data protection laws.</p>
                <p>c) Processing refers to any operation or set of operations performed on Personal Data or Sensitive Personal Data, whether manually or by automated means. This includes the collection, recording, storage, retention, modification, structuring, analysis, use, sharing, disclosure, transfer, and eventual deletion or erasure of personal data, either upon user request or in accordance with predefined retention policies.</p>
            </div>
        </div>
        
        {/* 2. CONSENT */}
        <div>
            <div className="text-lg   text-white mt-12 mb-6">2. CONSENT.</div>
            <p>By using our services or by clicking on ‘I Agree’ to accept the Terms and Conditions, you explicitly consent to the collection, processing, and storage of your personal data as described in this Privacy Policy. Your consent is obtained through various mechanisms, including account registration, where you agree to provide accurate and complete information; continued usage of our services, which constitutes implicit acceptance of our data handling practices; and opt-in mechanisms for specific data processing activities, such as marketing communications, where clear choices are provided. You have the right to withdraw your consent at any time by sending us an email through the ‘Contact Us’ tab on our website. However, please note that withdrawing consent may impact your ability to access certain features or functionalities of our services, subject to applicable legal and contractual obligations.</p>
        </div>

        {/* 3. WHAT PERSONAL INFORMATION IS COLLECTED? */}
        <div>
            <div className="text-lg  text-white mt-12 mb-6">3. WHAT PERSONAL INFORMATION IS COLLECTED?</div>
            <p>We may collect the following types of information:</p>
            <div className="mt-6">
                <h3 className=" text-gray-200">*Personal/Company Information:</h3>
                <div className="mt-2 text-white space-y-4">
                    <p>Name, contact number, email address, and KYC details (e.g., driving license, government-issued identification numbers, proof of address, etc.).<br/>Vehicle-related information, including registration details, ownership details, fines, and other challan-related information.<br/>Payment details for transactions related to our services.<br/>Voice recordings of interactions with our team to address queries.<br/>Any additional information required to deliver our services.</p>
                    <p>We recognize the sensitivity and legal implications surrounding the sharing of personal and company information. To ensure its lawful and ethical management we adhere to stringent guidelines and comply with applicable laws including but not limited to the Information Technology Act, 2000, Digital Personal Data Protection Act (DPDPA) 2023, and the Information Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011.</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className=" text-gray-200">*Payment Information:</h3>
                <div className="mt-2 text-white space-y-4">
                    <p>When you subscribe to our services and make payments through the platform, we may share relevant payment details with third-party service providers, vendors, and payment gateways to facilitate the transaction. These entities are contractually obligated to handle your payment information in accordance with industry-standard security practices.</p>
                    <p>We use third-party payment processors that comply with stringent security standards, including encryption protocols, to ensure that your payment information is handled securely.</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className=" text-gray-200">*Cookies & Web Tracking Technologies:</h3>
                <div className="mt-2 text-white space-y-4">
                    <p>We may store session information, cookies, pixels, web beacons and other technologies to recognize your needs and to enhance your experience on our website including improving security, preventing fraudulent activity, and reporting.</p>
                    <p>You have the option to manage your cookies preferences through your browser settings or by opting out of certain third-party tracking mechanisms. Third parties may include marketing agencies, social media networks, analytic services, search engines, etc.</p>
                    <p>However, please note that disabling cookies may limit your ability to access certain features of our website or services.</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className=" text-gray-200">*Know Your Customer (KYC):</h3>
                <div className="mt-2 text-white space-y-4">
                    <p>Sproutech Solutions Private Limited collects personal information from users as part of the Know Your Customer (KYC) process, which is necessary for compliance with regulatory requirements and to ensure the security and integrity of our services.</p>
                    <p>This information may include, but is not limited to, name, address, date of birth, government-issued identification numbers, and proof of address. We may also collect additional information as required by applicable laws and regulations.</p>
                    <p>The collected information is used solely for the purpose of fulfilling our legal obligations and ensuring the security and integrity of our platform. We do not disclose this information to third parties except as required by law or with the user’s explicit consent.</p>
                    <p>By using our services, users consent to the collection, storage, and processing of their personal information for KYC purposes as outlined in this privacy policy.</p>
                </div>
            </div>
        </div>

        {/* 4. WHAT IS THE PURPOSE FOR COLLECTION OF YOUR INFORMATION? */}
        <div>
            <div className="text-lg text-white mt-12 mb-6">4. WHAT IS THE PURPOSE FOR COLLECTION OF YOUR INFORMATION?</div>
            <p>The information we collect may be used for following purposes:</p>
            <div className="mt-6">
                <h3 className=" text-gray-200">*Feedbacks & Surveys:</h3>
                <div className="mt-2 text-white space-y-4">
                    <p>To improve our service & user experience, we may collect customer feedback and such data may be used by Sproutech Solutions Private limited for research, analysis and product development purposes.</p>
                    <p>We may also aggregate and anonymize this information for statistical purposes or to share insights with our partners or third-party service providers.</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className=" text-gray-200">*Improving Platform Functionality:</h3>
                <div className="mt-2 text-white space-y-4">
                    <p>To identify areas of improvement and enhance functionality and usability, we continuously analyze usage patterns, user feedback, and industry trends, helping us develop new features and services to better serve your legal needs.</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className=" text-gray-200">*Security & Fraud Prevention:</h3>
                <div className="mt-2 text-white space-y-4">
                    <p>To Detect & Investigate (fraudulent or unauthorized activities) we may use your information to ensure compliance with our policies and prevent violations.</p>
                    <p>This includes monitoring for suspicious activities, detecting and preventing fraud, and addressing security vulnerabilities to safeguard your data and maintain platform integrity.</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className=" text-gray-200">*Complying with Legal Obligation:</h3>
                <div className="mt-2 text-white space-y-4">
                    <p>We may use your information to comply with legal & regulatory requirements including but not limited to Data Protection Laws, Data Transfer Laws & Data Retention.</p>
                    <p>Provided that under data retention we only retain your information for as long as necessary and have clear policies for secure deletion or anonymization.</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className=" text-gray-200">*Customer Support:</h3>
                <div className="mt-2 text-white space-y-4">
                    <p>We communicate about your account and legal matters by sending notification, update, and transactional emails related to your platform usage.</p>
                    <p>Our aim is to deliver a seamless and satisfactory customer support experience while maintaining privacy and data protection standards.</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className=" text-gray-200">*Legal Analysis & Advice:</h3>
                <div className="mt-2 text-white space-y-4">
                    <p>Your information is utilized by legal professionals to analyze legal documents and offer tailored legal services and recommendations to address your specific needs.</p>
                    <p>With a Steadfast Commitment to excellence, integrity, and your legal well-being, we stand ready to serve as your trusted legal partner on the journey ahead.</p>
                </div>
            </div>
        </div>

        {/* 5. TO WHOM WE MAY SHARE YOUR INFORMATION? */}
        <div>
            <div className="text-lg  text-white mt-12 mb-6">5. TO WHOM WE MAY SHARE YOUR INFORMATION?</div>
            <p>We may share your information with the following entities to facilitate our services:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Lawyers and Professionals: Empanelled legal professionals who assist in providing legal and challan resolution services.</li>
                <li>Agents/vendors: Authorized agents who act on our behalf for service fulfillment and client assistance.</li>
                <li>Any other third-party: Service providers, including hosting providers, payment processors, and other entities essential for operational support.</li>
            </ul>
            <p className="mt-4">The importance of protecting the privacy of our customers/users is of utmost importance to us. That is why we share information in the following circumstances:</p>
            <div className="mt-6">
                <h3 className=" text-gray-200">*Legal Compliance & Protection:</h3>
                <div className="mt-2 text-white space-y-4">
                    <p>In order to respond to legal requests, investigations, and to prevent fraud or abuse, we may share your information with government bodies and law enforcement agencies when required to protect the rights, safety, and property of ours and others.</p>
                    <p>By prioritizing legal compliance and protection, we aim to foster trust and confidence in our legal services while ensuring the highest standards of integrity and professionalism.</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className=" text-gray-200">*Legal professionals & Service Providers:</h3>
                <div className="mt-2 text-white space-y-4">
                    <p>Client information, including vehicle-related details, will be shared with empanelled lawyers to facilitate legal services, including challan resolution. Third-party, vendors and agents assisting in legal service fulfillment may have access to the necessary information to perform the service as committed to the end-user.</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className=" text-gray-200">*Business Transactions:</h3>
                <div className="mt-2 text-white space-y-4">
                    <p>During business transactions such as mergers, acquisitions, or asset sales, we prioritize transparent communication to keep you informed about any changes that may affect our services or your data.</p>
                    <p>We conduct these transactions in compliance with applicable legal and regulatory requirements, ensuring that your data rights are protected and respected at all times.</p>
                    <p>Throughout these processes, we remain committed to safeguarding your data and ensuring that your legal matters continue to receive the attention and support they require.</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className=" text-gray-200">*Third Party Platform & Tools:</h3>
                <div className="mt-2 text-white space-y-4">
                    <p>To Facilitate our services we may utilize third party tools such as hosting providers document management systems, communication platforms, which complement our services and help us maintain high standards of performance and efficiency.</p>
                </div>
            </div>
        </div>

        {/* 6. USER RIGHTS. */}
        <div>
            <div className="text-lg  text-white mt-12 mb-6">6. USER RIGHTS.</div>
            <p>Under the Digital Personal Data Protection Act (DPDPA), 2023, you have the following rights regarding your personal data:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Right to Access: You have the right to request access to the personal data we hold about you.</li>
                <li>Right to Inform: If you become aware of any unauthorized access, breach, or potential misuse of your personal data provided to Lawyered, you have the right to inform us in writing immediately.</li>
                <li>Right to Correction: You can request the correction of inaccurate or incomplete personal data.</li>
                <li>Right to Deletion (Right to Be Forgotten): You may request the deletion of your personal data, subject to legal and contractual obligations.</li>
                <li>Right to Data Portability: You have the right to receive your personal data in a structured, commonly used, and machine-readable format, where technically feasible.</li>
                <li>Right to Restrict Processing: You can request the restriction of processing your personal data under specific circumstances, such as pending verification of a correction request.</li>
                <li>Right to Object: You have the right to object to the processing of your personal data for purposes such as direct marketing or automated decision-making.</li>
            </ul>
            <p className="mt-4">To exercise any of these rights, please contact our Grievance Officer details of which are mentioned in the contact us tab. We will acknowledge requests within 48 hours and aim to resolve them within 30 days, as per applicable legal requirements.</p>
        </div>
        
        {/* 7. DATA BREACH NOTIFICATION MECHANISM */}
        <div>
            <div className="text-lg  text-white mt-12 mb-6">7. DATA BREACH NOTIFICATION MECHANISM</div>
            <p>At Sproutech Solutions Private Limited (Lawyered), we prioritize data security and have a structured mechanism to address data breaches.</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Identification & Containment: Upon detecting a breach, we will assess its impact, isolate affected systems, and deploy security measures to prevent further unauthorized access.</li>
                <li>Investigation & Risk Assessment: Our Data Security Team will analyze the cause, scope, and nature of the breach and document findings for compliance.</li>
                <li>Notification: If required, affected individuals and regulatory authorities will be notified within legally mandated timelines, detailing the breach and recommended protective actions.</li>
                <li>Remediation & Prevention: We will patch vulnerabilities, enhance security protocols, and implement stronger access controls to prevent future incidents.</li>
                <li>User Support: Affected users can reach out to the grievance officer for assistance, with an acknowledgment within 48 hours and resolution within 30 days.</li>
                <li>Compliance & Monitoring: This process adheres to the Digital Personal Data Protection Act (DPDPA), 2023, ensuring regulatory compliance and continuous security improvements.</li>
            </ul>
        </div>
        
        {/* 8. DATA RETENTION AND DELETION. */}
        <div>
            <div className="text-lg text-white mt-12 mb-6">8. DATA RETENTION AND DELETION.</div>
            <p>We retain the data shared with us for a period of two (2) years to comply with our legal obligations and ensure seamless service delivery. After this period, data will be securely deleted or anonymized unless a longer retention period is required by law.</p>
            <p>Users may request the deletion of their data by submitting a formal request through our designated contact channels. Upon receiving the request, we will verify the user’s identity to prevent unauthorized deletions. Once verified, we will proceed with the deletion process and issue a deletion certification confirming that the data has been permanently removed from our systems.</p>
            <p>Please note that certain legal or regulatory obligations may require us to retain specific data even after a deletion request is processed.</p>
        </div>
        
        {/* 9. SECURITY MEASURES. */}
        <div>
            <div className="text-lg  text-white mt-12 mb-6">9. SECURITY MEASURES.</div>
            <p>Sproutech Solutions Private Limited employs a combination of administrative, technical, and physical safeguards to protect your personal data, including:</p>
            <ol className="list-decimal list-inside space-y-2 mt-4">
                <li>Encryption: All sensitive data is encrypted both in transit and at rest using industry-standard encryption protocols.</li>
                <li>Access Controls: Access to personal data is restricted to authorized personnel only, based on their roles and responsibilities.</li>
                <li>Regular Security Audits: We conduct regular security assessments and audits to identify and address potential vulnerabilities.</li>
                <li>Firewall and Intrusion Detection Systems: Our infrastructure is protected by advanced firewall and intrusion detection systems to prevent unauthorized access.</li>
                <li>Secure Development Practices: We follow secure coding standards and regularly update our software to mitigate security risks.</li>
                <li>Employee Training: Our staff undergoes regular training on data protection and information security best practices.</li>
            </ol>
        </div>

        {/* 10. CHANGES TO THIS PRIVACY POLICY. */}
        <div>
            <div className="text-lg  text-white mt-12 mb-6">10. CHANGES TO THIS PRIVACY POLICY.</div>
            <p>We may update this Privacy Policy from time to time. Any changes we make will be posted on this page. We encourage you to review this Privacy Policy periodically for any updates.</p>
            <p>Your continued use of our services following the implementation of changes to our Privacy Policy constitutes acceptance of the updated terms, reaffirming your commitment to our data handling practices.</p>
            <p>The Personal Information subject to this Privacy Policy will be collected and retained by the Company.</p>
        </div>

        {/* Grievance Officer */}
        <div className="pt-8">
            <p className=" text-gray-200">Grievance Officer :</p>
            <p className="mt-2">Name:- Ms Deeksha Varshney</p>
            <p>Designation:- Manager - Legal Operations</p>
            <p>E-mail:- deeksha.varshney@lawyered.in</p>
        </div>
      </div>
    </div>
  );
}


// Assembling the page
export default function PrivacyPolicyPage() {
  return (
    <>
      <PrivacyHero />
      <PrivacyContent />
    </>
  );
}
