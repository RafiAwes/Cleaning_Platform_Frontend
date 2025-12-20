
import photo1 from '@/assets/privaciPolicyPhoto.png';

export default function PrivacyPolicy() {
    return (
        <div className=" bg-white">
            <div className="container px-4 pt-4">
                <div
                    className="relative h-[200px] md:h-[250px] xl:h-[380px] rounded-2xl"
                    style={{
                        backgroundImage: `url(${photo1.src})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <h1 className='text-[#ffff] absolute bottom-0 p-6 xl:p-10 font-bold text-[16px] xl:text-[20px]'>Privacy Policy</h1>
                </div>


                {/* Main Content Section */}
                <div className="w-full  py-12 sm:py-14 md:py-8">
                    <h1 className="text-base sm:text-lg text-slate-700 font-semibold mb-4 sm:mb-5">Guest Ready Privacy Policy</h1>
                    <div className="">
                        {/* Introduction Section */}
                        <section className="mb-10 sm:mb-12 md:mb-14">
                            <h2 className="text-sm sm:text-base text-slate-600 leading-6 sm:leading-7">Introduction</h2>
                            <p className="text-sm sm:text-base text-slate-600 leading-6 sm:leading-7">
                                Welcome to Guest Ready! We are committed to protecting your privacy and handling your data in an open and
                                responsible manner. This policy explains how we collect, use, and protect your personal information when
                                you use our website or services.
                            </p>
                        </section>

                        {/* Section 1: Information We Collect */}
                        <section className="mb-8 sm:mb-10 md:mb-12">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-3 sm:mb-4">
                                1. Information We Collect
                            </h3>
                            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600">
                                <p className="leading-6 sm:leading-7">
                                    We collect information primarily to provide and improve the cleaning service booking experience for both
                                    users and service providers.
                                </p>

                                <div className="mt-4 sm:mt-5">
                                    <h4 className="font-semibold text-slate-700 mb-2 sm:mb-3">A. Information You Provide Directly</h4>
                                    <ul className="list-disc list-inside space-y-2 ml-2 sm:ml-0">
                                        <li className="leading-6 sm:leading-7">
                                            <span className="font-medium">Account Registration:</span> Your name, email address, phone number,
                                            and password.
                                        </li>
                                        <li className="leading-6 sm:leading-7">
                                            <span className="font-medium">Booking Information:</span> Service type (e.g., house cleaning, car
                                            detailing), service address, preferred date/time, and any special instructions.
                                        </li>
                                        <li className="leading-6 sm:leading-7">
                                            <span className="font-medium">Payment Information:</span> Payment card details (processed securely
                                            by third-party payment providers) or other billing information.
                                        </li>
                                        <li className="leading-6 sm:leading-7">
                                            <span className="font-medium">Service Provider Information:</span> Business name, tax information,
                                            service area, certifications, and background check data.
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-4 sm:mt-5">
                                    <h4 className="font-semibold text-slate-700 mb-2 sm:mb-3">B. Information We Collect Automatically</h4>
                                    <p className="leading-6 sm:leading-7 mb-2 sm:mb-3">
                                        When you use our site, we automatically collect data related to your device and activity:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-2 sm:ml-0">
                                        <li className="leading-6 sm:leading-7">
                                            <span className="font-medium">Usage Data:</span> Details about how you use our services, including
                                            pages viewed, links clicked, and the frequency and duration of your activities.
                                        </li>
                                        <li className="leading-6 sm:leading-7">
                                            <span className="font-medium">Technical Data:</span> Your IP address, device type, operating system,
                                            browser type, and location data derived from your IP address.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: How We Use Your Information */}
                        <section className="mb-8 sm:mb-10 md:mb-12">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-3 sm:mb-4">
                                2. How We Use Your Information
                            </h3>
                            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600">
                                <p className="leading-6 sm:leading-7">We use the information we collect for the following purposes:</p>
                                <ul className="list-disc list-inside space-y-2 ml-2 sm:ml-0">
                                    <li className="leading-6 sm:leading-7">
                                        <span className="font-medium">Service Fulfillment:</span> To process your bookings, match you with
                                        appropriate service providers, and manage the completion of services.
                                    </li>
                                    <li className="leading-6 sm:leading-7">
                                        <span className="font-medium">Communication:</span> To send you booking confirmations, service
                                        reminders, receipts, and important updates about your account.
                                    </li>
                                    <li className="leading-6 sm:leading-7">
                                        <span className="font-medium">Improvement:</span> To analyze usage patterns and feedback, helping us
                                        enhance our website, service offerings, and user experience.
                                    </li>
                                    <li className="leading-6 sm:leading-7">
                                        <span className="font-medium">Security & Safety:</span> To verify the identity of users and service
                                        providers, conduct necessary background checks for providers, and prevent fraudulent activity.
                                    </li>
                                    <li className="leading-6 sm:leading-7">
                                        <span className="font-medium">Marketing:</span> To send you promotional materials and offers that we
                                        believe might interest you (you can opt-out of these communications at any time).
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 3: Sharing Your Information */}
                        <section className="mb-8 sm:mb-10 md:mb-12">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-3 sm:mb-4">
                                3. Sharing Your Information
                            </h3>
                            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600">
                                <p className="leading-6 sm:leading-7">
                                    We only share your information with third parties when necessary to deliver our service or comply with
                                    the law.
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-2 sm:ml-0">
                                    <li className="leading-6 sm:leading-7">
                                        <span className="font-medium">Service Providers:</span> We share necessary booking details (your name,
                                        service address, phone number, and instructions) with the service provider confirmed for your booking.
                                    </li>
                                    <li className="leading-6 sm:leading-7">
                                        <span className="font-medium">Payment Processors:</span> Your payment details are shared securely with
                                        established third-party payment gateways to process transactions.
                                    </li>
                                    <li className="leading-6 sm:leading-7">
                                        <span className="font-medium">Legal Compliance:</span> We may disclose your information if required to
                                        do so by law or in response to valid requests by public authorities.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 4: Data Security */}
                        <section className="mb-8 sm:mb-10 md:mb-12">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-3 sm:mb-4">4. Data Security</h3>
                            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600">
                                <p className="leading-6 sm:leading-7">
                                    We implement appropriate technical and organizational measures designed to protect your personal
                                    information against accidental loss, unauthorized access, alteration, or disclosure. However, no
                                    internet transmission or storage system can be guaranteed to be 100% secure.
                                </p>
                            </div>
                        </section>

                        {/* Section 5: Your Rights */}
                        <section className="mb-8 sm:mb-10 md:mb-12">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-3 sm:mb-4">5. Your Rights</h3>
                            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600">
                                <p className="leading-6 sm:leading-7">Depending on where you live, you may have the right to:</p>
                                <ul className="list-disc list-inside space-y-2 ml-2 sm:ml-0">
                                    <li className="leading-6 sm:leading-7">Access the personal data we hold about you.</li>
                                    <li className="leading-6 sm:leading-7">Request correction of inaccurate or incomplete data.</li>
                                    <li className="leading-6 sm:leading-7">Request deletion of your personal data.</li>
                                    <li className="leading-6 sm:leading-7">Object to or restrict our processing of your data.</li>
                                </ul>
                                <p className="leading-6 sm:leading-7 mt-3 sm:mt-4">
                                    You can usually exercise these rights through your account settings or by contacting us directly.
                                </p>
                            </div>
                        </section>

                        {/* Section 6: Changes to This Policy */}
                        <section className="mb-8 sm:mb-10 md:mb-12">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-3 sm:mb-4">
                                6. Changes to This Policy
                            </h3>
                            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600">
                                <p className="leading-6 sm:leading-7">
                                    We may update this Privacy Policy from time to time. We will notify you of any significant changes by
                                    posting the new policy on this page and updating the "Last Updated" date at the top.
                                </p>
                            </div>
                        </section>

                        {/* Section 7: Contact Us */}
                        <section className="mb-8 sm:mb-10 md:mb-12 pt-6 sm:pt-8 ">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-3 sm:mb-4">7. Contact Us</h3>
                            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600">
                                <p className="leading-6 sm:leading-7">
                                    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us
                                    at:
                                </p>
                                <p className="text-slate-600">Guest Ready Support Team [Insert Support Email Address Here, e.g., support@guestready.com] [Insert Physical Address or Business Location (Optional)]</p>
                            </div>
                        </section>

                        {/* Last Updated */}
                        <div className="">
                            <p className="text-xs sm:text-sm text-slate-500 font-medium">Last Updated: November 2025</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
