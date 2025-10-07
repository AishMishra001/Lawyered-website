"use client";

import Image from "next/image";
import React, { useState, useEffect, MouseEvent, CSSProperties } from "react";

// Section 1: Hero
function TermsHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [delayedMousePosition, setDelayedMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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

      <div className="relative px-4 md:px-26 z-10 max-w-8xl mx-auto py-64 grid md:grid-cols-2 gap-16 items-center">
        {/* Left Column: Text Content */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-white">
            Terms and Conditions
          </h1>
          <p className=" text-white">
            If you have any questions about this Terms & Conditions, please
            contact us.
          </p>
        </div>

        {/* Right Column: Sticker */}
        <div className="flex justify-center">
          <Image
            src="/terms.png"
            alt="Terms and Conditions Icon"
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
function TermsContent() {
  return (
    <div className="py-28 px-4 md:px-26">
      <div className="max-w-8xl text-base mx-auto text-gray-300 leading-relaxed space-y-6">
        <p>LAST UPDATED: 25.02.2025</p>
        {/* User Agreement */}
        <h2 className=" text-white mt-12 mb-6">USER AGREEMENT</h2>
        <p>
          This User Agreement (this &quot;Agreement&quot;) is being entered into between
          You (herein referred to as &quot;Customer,&quot; &quot;User,&quot; &quot;Client,&quot; or &quot;Visitor&quot;
          of the website and mobile application) and Sproutech Solutions Private
          Limited (herein referred to as &quot;Company&quot;, &quot;Lawyered&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot;) and its affiliate.
        </p>
        <p>
          The Company operates and owns the website https://www.lawyered.in (The
          &quot;website&quot;), its content, services provided thereunder, and the mobile
          application on Android and iOS through which it provides on-road legal
          assistance, including but not limited to on-call legal guidance, legal
          representation, and challan resolution. The terms and conditions shall
          govern the use of or access to the website and services.{" "}
        </p>
        <p>
          The terms stipulated in this Agreement shall mean a binding contract
          between the User and the Company. No information provided on the
          website shall be considered a substitute for your independent
          investigation. These terms and conditions shall be governed by the
          Information Technology Act, 2000 (&quot;IT Act&quot;) and applicable rules made
          thereunder. Once You have entered the website/application or used the
          services of the company as stipulated on the website, shall be deemed
          to be accepting the terms and conditions hereunder, and no digital
          signature or otherwise is needed.{" "}
        </p>
        <p>
          Lawyered is not a law firm and does not provide legal services
          directly. Instead, it operates as a technology platform that enables
          access to legal information, resolution tools, and a network of
          independent, qualified lawyers. All legal advice and services are
          rendered solely by these third-party professionals, who are not
          employees of Lawyered. The platform&apos;s role is limited to facilitating
          connections and supporting the resolution process through technology.
        </p>
        <h2 className="  text-white mt-12 mb-6">I. WHAT TO DO ?</h2>
        <p>
          Sproutech Solutions Private Limited, commonly known as Lawyered, is on
          a mission to make law accessible and affordable to every individual,
          entity, and business by working towards minimizing the trust barriers
          through knowledge and awareness. Lawyered&apos;s main objective is to
          legally empower and cater to the needs of the individuals, entities
          and businesses. Lawyered is constantly evolving and developing various
          products to fulfill its purpose.{" "}
        </p>
        <p>
          One of its online products is focused on solving 24x7 on-road legal
          issues pan India in real-time for the Indian Mobility Market
          (commercial and non-commercial vehicles) through its product &quot;Lawyer
          on the Spot&quot; (LOTS). Additionally, Highway hero caters to the needs of
          the drivers of truck drivers. The SCOPE OF SERVICES offered by
          Lawyered includes: <br />
          24x7 on-call legal support/representation on all days. <br />
          Lawyer on the spot means a physical representation by a lawyer or its
          representative during the working hours of Authorities, Tribunals and
          Courts. Other related services, including but not limited to challan
          resolution, shall be made available during working hours, extending to
          the needs of truck drivers. Challan Resolution includes verifying
          challan details, advising the User on available legal remedies, and
          assisting with payment or contestation before the appropriate
          authorities, tribunals, or courts. The terms and conditions specific
          to challans can be found at another link:
          https://lawyered.in/p/terms-and-conditions-for-challan-resolution
        </p>
        {/* Registration */}
        <h2 className="  text-white mt-12 mb-6">II. REGISTRATION WITH US.</h2>
        <p>
          By choosing to register and make use of the product and by taking our
          subscription or membership(s) as may be applicable, You agree to the
          terms and conditions outlined in this document. Lawyered has various
          models including subscription model whereby You consent to use the
          services provided by being the subscriber. You acknowledge and agree
          that, in accordance with the agreed service(s) scope of services, You
          shall be responsible for the release and transfer of payment as per
          the clauses mentioned in the terms and conditions hereunder.
        </p>

        {/* Eligibility */}
        <h2 className="  text-white mt-12 mb-6">III. USER ELIGIBILITY</h2>
        <p>
          You, as a Users, are the owner or driver of a vehicle as described
          under Motor Vehicle Act,1988 (private or commercial), or engaged in
          any business related to transport, logistics, supply chain management,
          or logistics software and hardware solutions, whether tech-based or
          not, focusing on simplifying movement and improving productivity,
          performance, and profits of the logistics ecosystem.
        </p>

        <p>
          The User acknowledges and warrants that upon clicking &quot;I Agree&quot; and
          upon entering into Lawyered&apos;s website or mobile application, or by
          using Lawyered&apos;s services, You accept the terms and conditions
          mentioned in this Agreement.
        </p>

        <p>
          By using our services, the User affirms to be of 18 years of age or
          older. The services offered herein are available only in India. The
          company does not extend its services outside the territory of India
        </p>

        <p>
          The User affirms and warrants to hold valid legal documents pertaining
          to the person driving the vehicle and the vehicle. The User affirms
          that he does not have any criminal record.
        </p>

        <p>
          The User agrees to be in compliance with the laws and regulations of
          India including Motor Vehicle, 1988 or as amended from time to time.
          You agree not to violate any legal right available to the third party
          or yourself.
        </p>
        {/* Terms */}
        <h2 className="  text-white mt-12 mb-6">IV. PAYMENT TERMS</h2>
        <p>
          To avail the service(s) through Lawyered&apos;s local legal professional
          network PAN India, You shall pay the professional fee of the legal
          professional alongwith the service fee to Lawyered. The said fee shall
          vary on a case-to-case basis. For each service request, there may be
          mutually agreed consideration fees for the respective service availed
        </p>
        <p>
          You shall be informed via email, and further, depending on the
          progress and service completion in question, as per the mutually
          agreed service scope, Lawyered shall be entitled and authorized on
          Your behalf to release those payments to legal professional(s)
          representing and assigned on Your received service(s). Payment shall
          be made by You within the agreed- upon timeframe.
        </p>

        {/* Terms */}
        <h2 className="  text-white mt-12 mb-6">Invoice: </h2>
        <p>
          Lawyered will issue a tax invoice to the User, detailing the
          professional fee and the service fee, including GST( Goods and
          services Tax) as applicable.
        </p>
        <p>
          You acknowledge and agree that the payments made through Lawyered may
          not be subject to applicable TDS (Tax Deducted at Source) or the
          applicable tax as the end legal services are subject to being
          performed and delivered by the legal professional assigned in the
          received service request.
        </p>
        <p>
          Any tax deduction, if applicable, shall be as per prevailing tax laws
          and regulations. The User is advised to consult their tax advisor
          regarding any applicable deductions.
        </p>
        {/* Cancellation */}
        <h2 className="  text-white mt-12 mb-6">
          V. CANCELLATION, REFUND AND SUSPENSION.
        </h2>
        <p>
          The User account may be canceled/suspended/terminated at the
          discretion of Lawyered in case the User is in breach of the terms
          stipulated in this Agreement.
        </p>
        <p>
          Subscription/membership fee: The User is eligible for a full refund of
          the subscription fee. Provided the request for such refund is placed
          within 15 days from the date of depositing the subscription fee.{" "}
        </p>
        <p>
          Challan penalty amount: The User is eligible for a full refund of the
          challan penalty amount and service fee, wherever applicable, provided
          that a valid refund request is submitted before the challan resolution
          application is filed with the Tribunal, Court, or relevant Authority.
          No refunds will be granted after the submission of the application.
          Refund requests will be evaluated on a case-by-case basis.{" "}
        </p>
        <p>
          Time-line for refund: Refunds, where applicable, shall be processed
          within 7–14 business days from the date of approval of a valid refund
          request.
        </p>
        {/* General Terms */}
        <h2 className="  text-white mt-12 mb-6">
          VI. GENERAL TERMS AND CONDITIONS.
        </h2>
        <p>
          The User acknowledges and agrees to comply with all reasonable legal
          and procedural requirements as communicated by Lawyered or its
          associated legal professionals to facilitate service fulfilment,
          including but not limited to physical presence before an Authority,
          Tribunal, or Court when legally required.
        </p>
        <p>
          The User acknowledges that Lawyered&apos;s challan resolution service
          includes legal representation and guidance but does not guarantee
          waiver or reduction of fines, as final decisions rest with the
          relevant Authority, Tribunal, or Court. Lawyered shall not be liable
          for any unfavorable legal outcomes.
        </p>
        <p>
          The User acknowledges that challan insights provided by Lawyered rely
          on data retrieved by the third party vendor and other external
          sources. Lawyered does not warrant the accuracy, completeness, or
          real-time availability of such data. While Lawyered shall take
          reasonable steps to maintain accurate data retrieval, it shall not be
          liable for delays, errors, or technical issues arising from
          third-party systems.
        </p>
        <p>
          Lawyered&apos;s on-call legal support is available 24x7. Physical
          representation by a legal professional is available upon request,
          subject to availability and the working hours of the relevant
          Authorities, Tribunals, or Courts. Representation is not available on
          court holidays, when courts are vacant, or due to circumstances beyond
          Lawyered&apos;s control, including lawyer unavailability in specific
          locations. Lawyered does not guarantee immediate representation in all
          cases.
        </p>
        <p>
          You agree and acknowledge that any arrangement between You and
          Lawyered shall be read in conjunction with the terms and conditions
          agreed to in this agreement. In the event of a conflict between the
          terms and conditions of the arrangement between the User and Lawyered,
          the specific arrangement pertaining to the respective latest clause
          between the User and Us shall prevail.{" "}
        </p>
        <p>
          All of Your communications on the Lawyered platform (Website, Mobile
          Application) are protected by our privacy policy (&quot;Privacy Policy&quot;)
          Making Justice Accessible and Affordable for All Lawyered is committed
          to protecting User data in accordance with the Digital Personal Data
          Protection Act, 2023. By using Lawyered&apos;s services, the User consents
          to the collection, processing, and use of their personal data as
          outlined in the Privacy Policy The User acknowledges that Lawyered
          provides legal assistance services without any guarantee of
          predetermined outcomes, as legal decisions are solely at the
          discretion of the relevant Authorities, Tribunals, or Courts.
          Lawyered holds no liability for legal advice, representation, or procedural
          outcomes. The User further acknowledges that legal professionals
          engaged via Lawyered operate independently and are not employees or
          agents of Lawyered. Lawyered does not interfere with their
          professional judgment or the legal strategy they employ. The User
          acknowledges that Lawyered&apos;s delivery services may be dependent on
          third-party sources and API&apos;s. Lawyered shall not be held liable for
          any delays, technical issues, glitches that may arise from the use of
          such services.
        </p>
        <p>
          The terms and conditions of this Agreement may be amended/updated from
          time to time and the same shall be updated upon the website. Any kind
          of &quot;solicitation&quot; or &quot;advertising&quot; of legal professionals is not done
          by Lawyered for any purpose. It is solely and exclusively a legal tech
          discovery platform (Website, Mobile application) providing on-road
          legal assistance and its mission is to make people legally empowered.
          The User may report any grievances related to the use of services to
          Lawyered&apos;s designated Grievance Officer. Contact details are available
          on the website under the ‘Contact Us’ section. All grievances shall be
          acknowledged within 48 hours and resolved within 30 days, in
          accordance with the applicable laws of the land
        </p>

        <p>
          By sharing your feedback, comments, or testimonials, you grant
          Lawyered permission to use them to improve our services, learn, and
          grow. This may include featuring your words across our marketing,
          promotions, educational materials, internal improvements, and other
          Lawyered platforms. By doing so, you acknowledge and agree that no
          further permission or compensation will be required for this fair use
          of your insights. You acknowledge that by accepting these Terms &
          Conditions, You authorize Lawyered to use your personal data (such as
          name, mobile no, vehicle number) to check, resolve and pay challans on
          Your behalf before the respective Authorities, Tribunals, or Courts.
          The User agrees that Lawyered shall not be held liable for any legal
          or procedural outcomes arising from the challan resolution. In case of
          any concerns or discrepancies in the information/proposal sent to You,
          please let us know within seven (7) days of accepting the proposal by
          writing to info@lawyered.in
        </p>

        {/* Liability */}
        <h2 className="  text-white mt-12 mb-6">
          VII. YOUR RIGHTS AND LIABILITIES.{" "}
        </h2>
        <p>
          Acceptance of Terms : You are advised to carefully read the terms and
          conditions of this Agreement before using Lawyered&apos;s services. By
          tapping on the &quot;I Agree&quot; button or using the platform, You acknowledge
          and agree that:
        </p>
        <p>
          You are legally bound by these Terms & Conditions. You have reviewed
          and understood the policies attached to this Agreement. If You have
          any queries, You may contact Lawyered via the details provided under
          the &quot;Contact Us&quot; tab. Liability Disclaimer for Third-Party Errors:
          Lawyered shall not be liable for any errors, delays, or failures
          arising from: Third-party payment gateways (e.g., failed transactions,
          double payments). Third party vendors, Government systems (e.g.,
          incorrect challan records, API errors). You acknowledge that You will
          be given the option to select alternative legal professionals from
          other platforms should the need arise, and Lawyered does not require
          You to exclusively utilize its platform legal professional. You agree
          and acknowledge that by using the service offering(s) and features
          offered by us, it shall not lead to the formation of an
          attorney-client relationship or be deemed to be formed between us. You
          acknowledge and agree to provide true, legally, and factually correct
          information to &quot;Lawyered&apos; to effectively execute the submitted service
          request and enable us to proceed further. You agree to provide
          accurate information about yourself and the vehicle and keep the said
          information updated from time to time. You agree to avail Lawyered&apos;s
          services, the User must submit valid KYC documents, including a
          government-issued ID, vehicle registration certificate, and any other
          required documentation. Lawyered reserves the right to verify and
          authenticate the provided documents and to reject service requests in
          case of non-compliance or fraudulent submissions.
        </p>
        <p>
          By acknowledging and agreeing to abide by local laws and regulations,
          You hereby consent to adhere to all applicable legal requirements
          governing the use of the service or product. This obligation
          encompasses, but is not limited to, compliance with laws pertaining to
          intellectual property rights, privacy, data protection, consumer
          rights, and any other pertinent legislation. By agreeing to cooperate
          during the legal proceedings entails providing assistance,
          information, and any necessary cooperation if legal actions arise
          concerning the service or product. This may involve responding to
          inquiries, providing documentation or evidence, attending hearings or
          meetings, and generally participating in the legal process as
          required. By acknowledging this Agreement, you agree to inform
          Lawyered immediately if you become aware of any unauthorized access,
          data breach, or potential misuse of your personal data provided to
          Lawyered. You may report such incidents to our designated Grievance
          Officer. Upon receiving such information, Lawyered shall take
          reasonable measures to investigate, mitigate, and address the issue in
          compliance with applicable data protection laws, including the Digital
          Personal Data Protection Act, 2023. By agreeing to this clause, You
          commit to acting in good faith and cooperating fully with any legal
          proceedings that may arise, thereby ensuring transparency,
          accountability, and compliance with the law. Failure to cooperate may
          result in legal consequences, including but not limited to penalties,
          fines, or legal liabilities upon You
        </p>

        {/* Campaign */}
        <h2 className="  text-white mt-12 mb-6"> Promotional Campaigns</h2>
        <p>
          a) Lawyered may, from time to time, run promotional campaigns offering
          discounts, incentives, or other benefits to Users. Each promotional
          campaign shall have its own specific terms and conditions, which will
          be applicable only for the duration of the respective campaign.
        </p>
        <p>
          b) The terms and conditions of any such promotional campaign shall be
          in addition to and read together with the present Terms & Conditions
          stipulated on the website and mobile application. In case of any
          conflict between the promotional campaign terms and these Terms &
          Conditions, the specific terms of the campaign shall prevail for the
          duration of the campaign only. However, such conflicts shall not
          invalidate the entire Terms & Conditions but shall be limited only to
          the conflicting clause within the respective campaign.
        </p>

        <p>
          c) Lawyered reserves the right to modify, withdraw, or terminate any
          promotional campaign at its sole discretion without prior notice,
          subject to applicable laws.
        </p>
        <p>
          d) Participation in any promotional campaign does not entitle the User
          to any permanent benefit or future discounts, unless explicitly
          mentioned in the campaign terms.
        </p>
        <p>
          e) Promotional campaigns are applicable only within the territory of
          India and for eligible Users who meet the criteria outlined in the
          specific campaign terms.
        </p>

        {/* Confidentiality */}
        <h2 className="  text-white mt-12 mb-6">VIII. CONFIDENTIALITY.</h2>
        <p>
          In accordance with the terms of this Agreement, both Lawyered and the
          User acknowledge that they may receive confidential information from
          each other, including but not limited to business models, trade
          secrets, data, products, services, technologies, concepts, and
          personal data. Both parties agree to maintain the confidentiality of
          such information, using it solely for the purposes specified in this
          Agreement, and refraining from disclosing it to third parties without
          prior written consent, except to individuals who need to know the

          information to fulfill their duties and are legally or contractually
          obligated to maintain its confidentiality. This obligation to maintain
          confidentiality commences upon the effective date of this Agreement
          and continues indefinitely, surviving the termination of this
          Agreement. Unauthorized use or disclosure of confidential information
          may result in legal action. The User acknowledges that by virtue of
          this agreement may have direct and indirect access to the confidential
          information of Lawyered. The User hereby agree to hold in confidence
          all or any information and documents obtained by it, its employees,
          representative, directors, managerial personnel and shall not use or
          disclose such information or any part of it to third party without the
          prior written consent of Lawyered; except to officers, employees,
          agents, contractors or subcontractors whose duties require them to
          have access to the Confidential Information on a need to know basis to
          the extent necessary and who have a contractual, legal, ethical or
          professional duty to maintain the confidence of such Confidential
          Information; Any data made available to You by Lawyered shall be the
          sole property of the Lawyered and You shall not access, analyze,
          tamper, breach, aggregate, sell, lease or otherwise use it for any
          other purpose or commercial exploitation and failing which legal
          action would be taken. Confidential Information may be disclosed to
          the extent required by Law provided a prior written notice is given to
          the other Party and prior to any such disclosure, allow the other

          Party an opportunity to intervene or where possible obtain from such
          third parties duly binding agreements to maintain in confidence the
          information to be disclosed
        </p>

        <p>
          During the subsistence of this Agreement and after termination, You
          shall maintain all Confidential Information in the strictest
          confidence and trust for perpetuity
        </p>

        {/* Intellectual Property Rights */}
        <h2 className="  text-white mt-12 mb-6">
          IX. INTELLECTUAL PROPERTY RIGHTS.
        </h2>
        <p>
          Lawyered shall retain all rights, titles and interests in the software
          and its Confidential Information and all its intellectual property
          rights thereto supplied to the You under this Agreement. Lawyered
          maintains the confidentiality of any personal data they come into
          contact with or during the course of their work. This includes not
          disclosing data to unauthorized individuals.
        </p>

        <p>
          Lawyered follows security protocols and policies established by the
          organization to protect personal data from unauthorized access,
          disclosure, alteration, or destruction. This may include using strong
          passwords, encrypting data, and avoiding the use of unsecured
          networks. Anyone failing to comply with the above will be liable for
          an offense under the Digital Data Protection Act 2023 and Information
          Technology Act 2000.
        </p>

        <p>
          Nothing in this Agreement shall affect a transfer of Lawyered&apos;s
          intellectual property rights from to You, or otherwise be construed to
          confer any license to You under such intellectual property rights,
          except as expressly set forth in this Agreement. All the new
          intellectual property conceived, developed or created by Lawyered, its
          Affiliates, its subcontractors, or any of their respective employees
          related to the software and technological development shall be the
          property of the Lawyered.{" "}
        </p>

        {/* Limitations of Liability */}
        <h2 className="  text-white mt-12 mb-6">X. LIMITATION OF LIABILITY</h2>
        <p>
          The User acknowledges that to the fullest extent permitted by law,
          Lawyered shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages, including but not limited to loss
          of profits, data, or goodwill, arising out of or in connection with
          the use of its services. Lawyered&apos;s total liability to the User for
          any claim arising out of or related to these Terms & Conditions shall
          not exceed the total service fees paid by the User preceding one
          month. The User agrees to indemnify and hold Lawyered harmless from
          any claims, damages, liabilities, and expenses arising from the User&apos;s
          misuse of the services or violation of these Terms & Conditions.
          Lawyered does not guarantee a specific legal resolution or outcome, as
          all judgments and decisions are solely at the discretion of the
          competent Court, Tribunal, or Authority
        </p>

        <p>
          Lawyered provides access to legal services and assistance, and has no
          influence over legal proceedings. Lawyered shall not be liable if the
          platform (Website and/or LOTS relating Application(s)) becomes
          unavailable due to bugs or defaults, technical issues, periodic
          maintenance, technical glitch faced by source or any unforeseen
          circumstances beyond Lawyered&apos;s control, including but not limited to
          cyberattacks, server failures, power outages, regulatory changes, or
          any other force majeure events.Therefore, Lawyered cannot be held
          liable for any claims of losses or damages whatsoever arising or
          incidental to it. Lawyered reserves the right to provide its clients
          or customers access to the legal solution /information in a manner
          which it deems appropriate by means of the technology being in
          compliance with the laws.
        </p>
        <p>
          Lawyered shall in no event be liable to You or anyone on Your behalf
          for any direct, consequential, incidental, indirect, punitive or
          special damages, whatsoever, regardless of cause, including losses and
          damages (a) resulting from loss of use, data, reputation, revenue, or
          profits; (b) based on any theory of liability, including breach of
          contract or warranty, negligence, or other tortious action; or (c)
          arising out of or in connection with Your use of or access to the
          Services and Software. Nothing in these terms limits or excludes our
          liability for gross negligence, intentional misconduct of Lawyered or
          its employees, death, or personal injury.
        </p>
        <p>
          No waiver of any provision or consent to any exception to the terms of
          this Agreement shall be effective unless in writing and signed by the
          waiving Party to be bound, and even then, it will only be applicable
          to the specific purpose, extent, and instance provided Notwithstanding
          anything contained herein, Lawyered&apos;s total liability in relation to
          any matter arising from these terms, the services offered, or indirect
          or unforeseeable losses to the User due to service failures or
          inaccuracies is limited to the total amount received from the You for
          the respective service availed by You. This limitation extends to the
          maximum extent permitted by the law, including even if : i) A remedy
          does not fully compensate You for any losses or failures of its
          essential purpose; or ii) By entering into our website or registering
          with us, You fully acknowledge the risk involved or damages You might
          have incurred.{" "}
        </p>
        {/* Government Laws */}
        <h2 className="  text-white mt-12 mb-6">XI. INDEMNIFICATION.</h2>
        <p>
          The User hereby agrees to indemnify, defend, and hold harmless
          Lawyered, its affiliates, directors, officers, employees, agents,
          vendors, and partners from and against any and all losses,
          liabilities, damages, claims, costs, expenses (including reasonable
          legal fees and disbursements), penalties, or obligations arising out
          of or related to:{" "}
        </p>
        <p>
          Any unlawful, unauthorized, or negligent acts or omissions by the
          User, including but not limited to violations of applicable laws,
          regulations, or third-party rights. Any claims, demands, or actions
          brought by third parties arising out of or incidental b to the User&apos;s
          use of Lawyered&apos;s website, mobile application, or services. Any loss,
          damage, or liability arising from the User&apos;s reliance on the
          functionality, accuracy, or availability of Lawyered&apos;s website or
          mobile application, including but not limited to technical
          difficulties such as bugs, glitches, or downtime. Lawyered shall not
          be liable for any direct, indirect, incidental, special, or
          consequential damages, including but not limited to loss of profits,
          data, or business opportunities, arising out of or related to the User&apos;s
          use of or inability to use the website, mobile application, or
          services, even if Lawyered has been advised of the possibility of such
          damages. The User acknowledges and agrees that they shall be solely
          responsible for any damages, claims, or liabilities arising out of or
          incidental to their actions, whether in violation of this Agreement,
          applicable laws, or otherwise
        </p>

        <h2 className="  text-white mt-12 mb-6">XII. FORCE MAJEURE</h2>
        <p>
          Lawyered shall not be liable for any failure or delay in performing
          its obligations under these Terms and Conditions where such failure or
          delay is due to causes beyond its reasonable control, including but
          not limited to acts of God, war, strikes or labor disputes, embargoes,
          government orders, acts of civil or military authorities, acts of
          terrorism, natural disasters, pandemics, epidemics, insurrection,
          riots, disruptions in communication services, or any other similar
          causes.
        </p>
        <p>
          In the event of a force majeure event, Lawyered shall notify the
          affected users of the nature and extent of the force majeure event and
          the anticipated duration of any delay. Lawyered will use its best
          efforts to mitigate the effects of the force majeure event and resume
          performance of its obligations as soon as reasonably possible. In the
          event, the force majeure event continue for an extended period of time
          beyond thirty (30) days, either party may terminate the agreement by
          providing written notice to the other party without further liability,
          except for obligations that accrued prior to the force majeure event.
        </p>

        <h2 className="  text-white mt-12 mb-6">
          XII. DISPUTE RESOLUTION AND GOVERNING LAW
        </h2>
        <p>
          This Agreement shall be governed by the laws, regulations, and rules
          applicable in the territory of India without reference to the
          applicable laws of conflict. The Courts at Gurugram, Haryana, India
          shall have exclusive jurisdiction relating to any matter/issue under
          or pursuant to the Agreement. Notwithstanding anything to the
          contrary:
        </p>
        <p>
          Any dispute, difference, question, issue or claim arising out of or
          relating to this Agreement or its interpretation, or the breach or
          alleged breach thereof, or affecting this Agreement in any way or of
          any nature whatsoever (&quot;Dispute&quot;), shall be tried and settled amicably
          among the parties through mutual discussion. If the parties are not
          able to settle the matter within 30 days, they shall refer the matter
          to arbitration to be conducted by a sole arbitrator appointed in
          accordance with the Arbitration and Conciliation Act, 1996. Either
          Party shall be entitled to give 30 (thirty) days clear notice in
          writing to the others of its intention to refer the Dispute to
          Arbitration (&quot;Arbitration Notice&quot;).
        </p>
        <p>
          Subject to the procedure laid down therein, the arbitration shall be
          conducted in accordance with and governed by the provisions of the
          Arbitration and Conciliation Act, 1996 or any modification thereof or
          amendment thereto. The Seat of Arbitration shall be Gurugram, Haryana,
          India. Both the parties shall mutually appoint a sole arbitrator in
          accordance with the provision of law. The Language used as a medium
          shall be the English language. The Award shall be binding on the
          Parties, subject to the applicable laws in force, and the award shall
          be enforceable in any competent court of law. As an alternative to
          arbitration, either party may choose to refer the Dispute to an
          alternate dispute resolution (ADR) mechanism, such as mediation or
          conciliation, before commencing arbitration. If both parties agree to
          this, the ADR process shall be conducted in Gurugram, Haryana, India,
          and in the English language. The results of the ADR process shall not
          be binding unless both parties agree in writing. If the Dispute is not
          resolved through ADR within 30 days from the date of initiation,
          either party may proceed to arbitration as outlined above.
        </p>

        <h2 className="  text-white mt-12 mb-6">
          XIV. DISCLAIMERS OF WARRANTIES.{" "}
        </h2>
        <p>
          Lawyered does not provide any warranties beyond what is explicitly
          agreed upon in this agreement or within the scope of work agreed upon
          with You. Lawyered does not warrant or guarantee a specific outcome of
          Your query due to the discretionary power of authorities, tribunals,
          courts. Lawyered will perform the services in accordance with the
          applicable legal standards and ethical rules governing the legal
          profession. Lawyered specifically disclaims all liability for any
          actions resulting from Your use of the services, API and software. You
          acknowledge that You may use and access the Services and Software at
          Your own discretion and risk. You warrant that You shall provide
          accurate information to Lawyered in order for the Lawyered to provide
          the best possible legal resolution to You.
        </p>
        <p>
          Lawyered connects Users with a network of legal professionals across
          India to provide legal advice. These legal professionals and their
          representatives are not employees of Lawyered, and Lawyered does not
          receive any commission or financial benefit whatsoever from the
          associated lawyer. Lawyered disclaims any fiduciary relationship or
          other special relationship with legal professionals associated with it
          and specifically disclaims any liability arising out of the acts or
          omissions of a legal professional, whether directly or incidentally.
          By using the services, You acknowledge and agree that Lawyered is not
          responsible for the conduct, performance, or quality of the legal
          advice provided by the associated legal professionals. Lawyered shall
          not be liable for any loss or damage arising from your reliance on
          such legal advice or from any interaction or agreement between You and
          the legal professionals.
        </p>

        <h2 className="  text-white mt-12 mb-6">XV. TERMINATION</h2>
        <p>
          Termination by User: Users may terminate their account and discontinue
          the use of Lawyered&apos;s services at any time by: a) Deleting their
          account via the website or mobile application, where applicable, b)
          Submitting a written request to Lawyered&apos;s support team for account
          deactivation, c) Ceasing to use Lawyered&apos;s services, subject to any
          ongoing obligations under these Terms. Termination by Lawyered: We may
          terminate or suspend your account and access to our services
          immediately, without prior notice or liability, for any reason,
          including but not limited to, if You breach the Terms of this
          Agreement, unauthorised use, Fraudulent transaction,
          disruptive conduct, technical or security concerns. In the event of
          such termination, your right to use the services will immediately
          cease. Effect of Termination: Upon termination of your account, You
          will lose access to all services and any data stored within your
          account. You shall fulfill all outstanding dues owed to us or platform
          lawyers, if any immediately upon termination. We shall not be liable
          to You or any third party for any termination of your account or

          access to the services
        </p>
        <p>
          Survival of Terms: All provisions of the Terms which by their nature
          should survive termination shall survive termination, including,
          without limitation, ownership provisions, warranty disclaimers,
          indemnity, and limitations of liability. Notice of Termination: We may
          provide notice of termination via email or through any other method
          reasonably designed to inform You of such termination. Discontinuation
          of Services: We reserve the right to discontinue the services or any
          part thereof at any time with or without notice. We shall not be
          liable to You or to any third party for any modification, suspension,
          or discontinuance of the services. Refunds and Fees: Any fees paid by
          You are non-refundable, except as required by law or as expressly
          stated in our refund policy. Termination of your account does not
          entitle You to any refunds or compensation for unused services. Legal
          Actions: Termination of your account does not waive any legal rights
          or remedies we may have against You, including the right to seek
          damages or injunctive relief for any breach of these Terms
        </p>

        <h2 className="  text-white mt-12 mb-6">XVI. SURVIVAL</h2>
        <p>
          Upon the termination, some or all of the service may cease to operate,
          without prior notice, unless otherwise agreed between the parties.
          Indemnity clause, warranty clause, disclaimers, limitation of
          liability, dispute resolution, confidentiality provision stated herein
          shall survive.
        </p>

        <h2 className="  text-white mt-12 mb-6">XVII. AMENDMENT</h2>
        <p>
          Lawyered reserves the right to modify, amend, change, or update any
          Terms at its sole discretion. It is Your responsibility to review
          these Terms periodically and ensure ongoing compliance. Continued use
          of the Lawyered following any amendments or changes to the Terms
          constitutes Your explicit acceptance of the revised Terms, and You
          agree to be bound by these updated Terms.
        </p>
      </div>
    </div>
  );
}

// Assembling the page
export default function TermsAndConditionsPage() {
  return (
    <>
      <TermsHero />
      <TermsContent />
    </>
  );
}
