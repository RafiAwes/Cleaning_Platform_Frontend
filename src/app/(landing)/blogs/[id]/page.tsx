import { ImgBox } from "@/components/reusable/Img-box";
import news1 from "@/assets/news1.png";

const NewsDetails = () => {
  return (
    <div className="pt-[35px] lg:pt-[48px]">
      <div className="container px-4">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4">
          <div className="">
            <h1 className="text-[20px] xl:text-[48px] font-bold ">
              Who can apostille a document in the UK? All questions answered
            </h1>
            <p>Posted on: 20th November, 2025</p>
          </div>

          <div>
            <ImgBox src={news1} alt="photo" className="w-[300px] xl:w-[400px] xl:h-[300px]" />
          </div>
        </div>

        <div className="w-full py-8 md:py-12">
          {/* TLDR Section */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              TL;DR – Who can apostille a document in the UK
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              The Foreign, Commonwealth, and Development Office (FCDO) is the
              competent authority in the UK that can apostille a document. No
              other organisation in the UK can issue a valid apostille
              certificate.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              The international treaty that established the apostille process is
              the Hague Apostille Convention. The convention requires signatory
              countries to designate competent authorities to issue apostilles
              for use in member countries.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              While the FCDO is the only body in the UK that can issue an
              apostille, it works with registered third-party agencies that
              facilitate the process. These specialist apostille services act on
              your behalf to ensure documents are correctly submitted,
              significantly speeding up the process and avoiding rejections.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              We are London Apostille Services Ltd, an FCDO-registered apostille
              facilitator (agent) with 15+ years of experience.{" "}
              <span className="underline cursor-pointer">
                Book a free consultation
              </span>{" "}
              with our team today to get your documents apostilled in 24 hours.
            </p>
          </div>

          {/* What does it mean Section */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              What does it mean to apostille a document in the UK?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              When you want foreign authorities and institutions to recognise
              and accept your UK documents legally, you must 'legalise' them for
              international use.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              Legalisation involves validating the documents' stamps and
              signatures to ascertain that legitimate authorities issued them.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <span className="underline cursor-pointer">
                Various countries
              </span>
              , including the UK, adopted{" "}
              <span className="underline cursor-pointer">
                the Hague Apostille Convention
              </span>{" "}
              to streamline document legalisation processes. The convention
              replaced several complex processes with a single certification, an
              apostille.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              As the convention required, the UK designated a competent
              authority,{" "}
              <span className="underline cursor-pointer">the FCDO</span>, to
              issue apostilles. The FCDO legalises documents for international
              use by attaching an apostille certificate to them.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              You can submit your documents directly to the FCDO or through
              authorised agents and facilitators.
            </p>
          </div>

          {/* How does FCDO authorisation work Section */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              How does FCDO authorisation work?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              The UK FCDO Legalisation Office checks the signature/stamp/seal on
              your document against its records and—if valid—issues an apostille
              (this is "FCDO authorisation").
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              There are two ways you can get your documents apostilled:
            </p>

            {/* Route 1 */}
            <div className="mb-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                Route 1 — Apply directly via GOV.UK (paper apostille by post
                only)
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2">
                <span className="font-semibold">How it works:</span> Apply
                online, pay, then post your document to the FCDO. If the
                signature/stamp cannot be verified, the FCDO will not legalise
                it, and you will not be refunded.
              </p>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2">
                <span className="font-semibold">Typical timeframe:</span> Expect
                roughly 15–21 days end-to-end (the standard postal service is
                commonly quoted as 2–4 weeks, depending on workload and
                post/courier time).
              </p>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                <span className="font-semibold">When to choose:</span> You're
                confident the document is in the exact format the FCDO accepts
                (correct original/certified copy, correct UK public official, no
                missing dates/seals). Mistakes lead to rejection and no FCDO
                refund.
              </p>
            </div>

            {/* Route 2 */}
            <div className="mb-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                Route 2 — Use an FCDO-registered apostille agency
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2">
                <span className="font-semibold">How it works:</span> A
                specialist agency (registered as an FCDO business customer)
                pre-checks your paperwork, arranges any UK solicitor/notary
                certification needed, submits it to the FCDO, and manages
                collection/return.
              </p>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2">
                <span className="font-semibold">Typical timeframe:</span>{" "}
                Frequently 1–2 working days once documents are in order (subject
                to FCDO capacity and agency cut-offs).
              </p>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                <span className="font-semibold">Why choose this:</span> Faster
                logistics, expert pre-screening to avoid FCDO rejections, and
                one point of contact. (Many reputable apostille agencies offer
                their own refund/resubmission guarantees if the FCDO
                rejects—this is the agency's policy, not the FCDO's.)
              </p>
            </div>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              <span className="font-semibold">Note:</span> There is also a
              separate e-Apostille route for eligible digitally-signed documents
              (apply online, upload the file). Acceptance varies by
              recipient/country; paper apostilles remain widely used.
            </p>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              Additionally, when you choose Route 2, it's best to work with an
              apostille agency with reliable solicitors and notaries in its
              network.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              Access to a reliable network of notaries and solicitors is
              essential because many UK documents cannot be sent to the FCDO for
              an apostille before certification.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              The FCDO can only verify the authenticity of stamps and signatures
              already in the government's database. Therefore, documents not
              issued by a public authority or that are copies of the original
              will first require an 'authenticity verification' by a third
              party. The third party is usually an FCDO-registered notary or
              solicitor.
            </p>
          </div>

          {/* Notary vs solicitor Section */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Notary vs solicitor: who should certify my document for an
              apostille?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              A document can be certified by a notary or solicitor. Under UK
              law, the two are competent legal professionals, but their primary
              focus and authority differ.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <span className="font-semibold">A solicitor:</span> Is a legal
              professional providing a broad range of legal services, primarily
              focusing on UK law. They can certify copies and declarations for
              legalisation.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              <span className="font-semibold">A notary:</span> Is a legal
              professional whose primary role is to deal with documents for
              international use. They verify the authenticity of documents,
              signatures, and facts.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              Notarial certification is often preferred—and in some countries
              required—because a notary provides independent, higher-level
              verification and impartiality.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              London Apostille Services Ltd can confirm if your destination
              requires notarisation and guide you on the correct apostille
              route.
            </p>
          </div>

          {/* Who can apostille a document Section */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Who can apostille a document in the UK?
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              Only the FCDO Legalisation Office issues UK apostilles.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              Notaries and solicitors don't apostille—they certify documents so
              the FCDO can legalise them. Agencies like ours manage checks and
              submissions, but the apostille is always issued by the FCDO.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              You can{" "}
              <span className="underline cursor-pointer">
                apply for an e-Apostille
              </span>{" "}
              or a paper apostille, and anyone can verify a UK apostille on the
              official GOV.UK checker.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              The Legalisation Office operates from Hanslope Park, Milton
              Keynes. All applications start online; once you've paid, GOV.UK
              gives you the correct postal address.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              There are no public walk-ins.
            </p>
          </div>

          {/* Important service update Section */}
          <div>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              Access is for registered business users only. The Premium Service
              is limited to registered business users who regularly submit
              documents (like us).
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2 font-semibold">
              Important service update
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              The London same-day "Premium" service closed on 29 December 2023;
              processing is now handled via Milton Keynes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
