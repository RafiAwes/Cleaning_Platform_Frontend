import Image from "next/image";
import { Button } from "@/components/ui";
import Link from "next/link";

function Vendor() {
  return (
    <div className="pt-4">
      <div className="px-4">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div className="order-2 lg:order-1 bg-secondary w-full lg:h-[400px] p-6 md:p-12 rounded-[30px] flex items-center">
            <div className="space-y-4">
              <div className="leading-tight ">
                <p>For vendors</p>
                <h1 className="text-[#000000] font-bold text-[16px] xl:text-[36px]">
                  Ready to Grow Your Cleaning Business?
                </h1>
              </div>

              <div className="">
                <p className="font-sans font-medium text-[16px] text-[#535353]">
                  Focus on the excellent service you provide. We handle the
                  demanding task of c lient acquisition, scheduling, and secure
                  payments so your{" "}
                </p>
                <p className="font-sans font-medium text-[16px] text-[#535353]">
                  business can thrive in the NYC market.
                </p>
              </div>

              <div className=" ">
                <ul className="list-disc list-inside space-y-4">
                  <li className="">
                    <span className="font-bold">Reliable Leads:</span> Get
                    steady bookings in your service area.
                  </li>

                  <li>
                    <span className="font-bold">Set Your Rates:</span> You
                    control your pricing and schedule..
                  </li>
                  <li>
                    <span className="font-bold">Simple Payouts:</span> Fast,
                    secure payment processing.
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <Link href={"/auth/vendor-register"}>
                  <Button className="px-6!" size="lg" icon={true}>
                    Continue as vendor
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Image
              src="/images/vendor-web-photo2.png"
              alt="Nexus Logo"
              width={500}
              height={500}
              className="rounded-[30px] lg:h-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vendor;
