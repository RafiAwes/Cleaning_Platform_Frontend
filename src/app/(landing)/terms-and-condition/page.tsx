
import photo1 from '@/assets/termsAndCondition.png';

export default function TermsAndCondition() {
    return (
        <div className=" bg-white pt-4">
            <div className="container px-4">
                <div
                    className="relative h-[200px] md:h-[250px] xl:h-[380px] rounded-2xl"
                    style={{
                        backgroundImage: `url(${photo1.src})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <h1 className='text-[#ffff] absolute bottom-0 p-6 xl:p-10 font-bold text-[16px] xl:text-[20px]'>Terms & Conditions</h1>
                </div>


                {/* Main Content Section */}
                <div className="w-full  py-12 sm:py-14 md:py-8">
                    {/* Section 1 */}
                    <div className="mb-8">
                        <h2 className="text-[#1a1a1a] text-xl md:text-2xl font-bold mb-4">
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            By accessing and using Good Provider ("Service"), the Good Provider website, mobile application, and services (collectively, the "Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you are using Good Provider on behalf of an organization, you are agreeing to these Terms for that organization and promising Good Provider that you have the authority to bind that organization to these Terms. Please read these Terms carefully before using the Service.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div className="mb-8">
                        <h2 className="text-[#1a1a1a] text-xl md:text-2xl font-bold mb-4">
                            2. Service Overview
                        </h2>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Good Terms provide an online platform and e-commerce solution that you, (Service Provider/self Customers) enabling service, allowing service to identity cruise cleaning, car detailing, and mobile car cleaning. Good Reach acts solely as a platform to facilitate the connection between Service Provider (or Providers) and customers
                        </p>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Good Provider does not employ the Service Providers on its platform. It is responsible for the performance or accuracy of services provided by Service Providers.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div className="mb-8">
                        <h2 className="text-[#1a1a1a] text-xl md:text-2xl font-bold mb-4">
                            3. Account Registration and Eligibility
                        </h2>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Account Creation: To create an offer, Services, you must register for an account and provide accurate, complete, and current information.
                        </p>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Eligibility: You must be at least 18 years old to use the Service. By using the Service, you represent and warrant that you meet this eligibility requirement.
                        </p>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Account Security: You are responsible for maintaining the confidentiality of your account password and for all activity that occurs under your account. It is advisable to Service not for your account.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div className="mb-8">
                        <h2 className="text-[#1a1a1a] text-xl md:text-2xl font-bold mb-4">
                            4. Service Provider Registration
                        </h2>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Verification Process: Service Providers must complete a verification process, which may include providing identification, proof of qualifications, and insurance a profile under status Good Provider collects and reviews this information to verify Service Providers.
                        </p>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Responsibilities: Service Providers agree to be create the service book/services Provide in accordance with the Service Providers operating of their information. Service Providers must also comply with all applicable laws and regulations related to the services they provide.
                        </p>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Service Provider (Customer) agree to pay for the services booked through the platform. Payments are processed using the Good Provider third-party payment processors and completion of the services all the Services or site-related tasks - operation, taxes, and fees.
                        </p>
                    </div>

                    {/* Section 5 */}
                    <div className="mb-8">
                        <h2 className="text-[#1a1a1a] text-xl md:text-2xl font-bold mb-4">
                            5. Customer Responsibilities
                        </h2>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Booking Services: Customers are responsible for providing accurate information when booking services, including the details of the service being requested.
                        </p>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Customer Compliance: Customer's may cancel or reschedule a booking subject to the Service Provider's cancellation policy, which will be communicated at the time of booking. Good Reach may charge a cancellation fee if the booking is canceled without sufficient notice.
                        </p>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Payment: Customers are required to pay for the services at the time of booking or as agreed upon with the Service Provider. Good Reach is not liable for any issues related to payment disputes that arise between Customers and Service Providers.
                        </p>
                    </div>

                    {/* Section 6 */}
                    <div className="mb-8">
                        <h2 className="text-[#1a1a1a] text-xl md:text-2xl font-bold mb-4">
                            6. Service Providers
                        </h2>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Independent Service Providers: Service Providers are independent contractors and are assigned, partners, agents, or staff employees of Good Reach.
                        </p>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            No Employment Relationship: Good Provider does not employ any Service Providers used to may be liable agency, and their performance for reliability compliance, or qualification of any Service Provider.
                        </p>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Service Provider actions: Service Providers agree to perform any required licenses, insurance, and registration services with reasonable care and skill.
                        </p>
                    </div>

                    {/* Section 7 */}
                    <div className="mb-8">
                        <h2 className="text-[#1a1a1a] text-xl md:text-2xl font-bold mb-4">
                            7. Payment Terms
                        </h2>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Fees: Good Reach may charge a service fee for its use of the Platform or allow others of actions, offer services, promotions, or other benefits that may be applicable to certain services. These fees will be clearly disclosed at the time of booking.
                        </p>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Payment Processing: All payments are processed through our secure payment gateway. Good Reach does not for the behalf of any other contract. Included, service arrangement as a provider managing or may be charged for by Good Reach. We do generally willing to party your act all the terms of the services or the services provided for payment.
                        </p>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Refunds and Dispute Resolution: If a service is not performed as expected, Good Reach will work with both the Customer and Service Provider to resolve the issue. Refunds may be issued at Good Reach's discretion based on the outcome of the investigation.
                        </p>
                    </div>

                    {/* Section 8 */}
                    <div className="mb-8">
                        <h2 className="text-[#1a1a1a] text-xl md:text-2xl font-bold mb-4">
                            8. Cancellation Policy
                        </h2>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            By Customers:
                        </p>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            You agree to hold us liability services, and right upon any event Good Reach or its Liability for our Security/Self may be charged for any of the Service that are caused of them by are or upload of them Privacy or any request of the Business.
                        </p>
                    </div>

                    {/* Section 9 */}
                    <div className="mb-8">
                        <h2 className="text-[#1a4a4a] text-xl md:text-2xl font-bold mb-4">
                            9. Termination
                        </h2>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Preventing Use:
                        </p>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            We reserve the right to deny service, may right to use Good Reach to defects, or requests, an upgrade, toys or price, Save your data, liabilities, storage, or with us to hold four level acting from you control of them Privacy or any request of the Business.
                        </p>
                    </div>

                    {/* Section 10 */}
                    <div className="mb-8">
                        <h2 className="text-[#1a1a1a] text-xl md:text-2xl font-bold mb-4">
                            10. Limitation of Liability
                        </h2>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            To the Extent Permitted by Law:
                        </p>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Good Reach assumes that the act or omit our property in respect of them that you, if a needed a material, we will provide an data 30 days notice before the new terms take effect. By continuing to access or use the Service after these notices become effective, you agree to be bound by the revised terms.
                        </p>
                    </div>

                    {/* Section 11 */}
                    <div className="mb-8">
                        <h2 className="text-[#1a1a1a] text-xl md:text-2xl font-bold mb-4">
                            11. Contact Information
                        </h2>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            If you have any questions about these Terms, please contact us at:
                        </p>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Guest Ready Legal Department [Insert Support Email Address Here, e.g., support@guestready.com]
                        </p>
                        <p className="text-[#4a4a4a] text-base leading-relaxed mb-3">
                            Effective Date: November 2025
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}
