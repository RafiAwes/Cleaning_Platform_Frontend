import Image from "next/image";
import SubTitle from "@/components/reusable/title";
import { Button } from "@/components/ui";
import Link from "next/link";

function Vendor() {
  return (
    <div className="pt-[48px] xl:pt-[148px]">
      <div className="container px-4">
        <div className="pb-8">
          <SubTitle text="For Vendors" />
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="space-y-3">
            <h1 className="text-[#000000] font-bold text-[16px] xl:text-[20px]">
              Ready to Gro w Your Cleaning Business?
            </h1>
            <div>
              <p className="font-sans font-medium text-[16px] text-[#535353]">
                Focus on the excellent service you provide. We handle the
                demanding task of c lient acquisition, scheduling, and secure
                payments so your{" "}
              </p>
              <p className="font-sans font-medium text-[16px] text-[#535353]">
                business can thrive in the NYC market.
              </p>
            </div>

            <ul className="list-disc list-inside">
              <li className="">
                <span className="font-bold">Reliable Leads:</span> Get steady
                bookings in your service area.
              </li>

              <li>
                <span className="font-bold">Set Your Rates:</span> You control
                your pricing and schedule..
              </li>
              <li>
                <span className="font-bold">Simple Payouts:</span> Fast, secure
                payment processing.
              </li>
            </ul>
            <Link href={"/auth/vendor-register"}>
              <Button className="mt-4 xl:mt-0" size="lg" icon={true}>
                Continue as vendor
              </Button>
            </Link>
          </div>

          <div>
            <Image
              src="/images/vendor-web-photo.png"
              alt="Nexus Logo"
              width={500}
              height={500}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vendor;
