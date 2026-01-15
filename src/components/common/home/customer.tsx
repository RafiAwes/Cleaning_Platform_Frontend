import Image from "next/image";
import { Button } from "@/components/ui";
import Link from "next/link";

function Customer() {
  return (
    <div className="pt-[48px]">
      <div className="px-4">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div>
            <Image
              src="/images/customer-web-photo2.png"
              alt="Nexus Logo"
              width={500}
              height={500}
              className="rounded-[30px] lg:h-[400px]"
            />
          </div>

          <div className="bg-secondary w-full lg:h-[400px] p-6 md:p-12 rounded-[30px] flex items-center ">
            <div className="space-y-4">
              <div className="leading-tight">
                <p>For customers</p>
                <h1 className="text-[#000000] font-bold text-[16px] xl:text-[36px]">
                  Need a Sparkle? Book the Best Cleaners in NYC.
                </h1>
              </div>

              <div>
                <p className="font-sans font-medium text-[16px] text-[#535353]">
                  Stop sacrificing your weekends. Instantly connect with
                  verified, top-rated cleaning professionals across all five
                  boroughs. Quality service is{" "}
                </p>
                <p className="font-sans font-medium text-[16px] text-[#535353]">
                  just a few clicks away.
                </p>
              </div>

              <div>
                <ul className="list-disc list-inside space-y-4">
                  <li className="">
                    <span className="font-bold">Verified Pros:</span> Vetted and
                    insured cleaners.
                  </li>
                  <li>
                    <span className="font-bold">Transparent Pricing:</span> No
                    surprises, ever.
                  </li>
                  <li>
                    <span className="font-bold">Flexible Booking:</span>{" "}
                    Schedule around your life.
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <Link href={"/auth"}>
                  <Button className="" size="lg" icon={true}>
                    Continue as user
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
