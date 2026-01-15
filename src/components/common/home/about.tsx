import { Button } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div className="pt-[48px] xl:pt-[100px]">
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          <div>
            <Image
              src="/images/about-web-photo3.png"
              alt="Nexus Logo"
              width={500}
              height={500}
              className=""
            />
          </div>

          <div className="flex flex-col items-start">
            <div className="space-y-4">
              <div className="leading-tight ">
                <h2 className="">About us</h2>
                <h1 className="text-[#000000] font-bold text-[16px] xl:text-[36px]">
                  We Know NYC Cleaning,
                </h1>
              </div>

              <div className="">
                <p className="font-sans font-medium text-[16px] text-[#535353]">
                  We started Guest Ready because booking a quality cleaning
                  service shouldn't feel like a chore. Ever tried calling five
                  different cleaners,
                </p>
                <p className="font-sans font-medium text-[16px] text-[#535353]">
                  leaving voicemails, and waiting for quotes? It’s frustrating!
                  We knew there had to be a simpler, faster, and more
                  transparent way to connect
                </p>
                <p className="font-sans font-medium text-[16px] text-[#535353]">
                  people who need things clean with the amazing local
                  professionals who do the cleaning.
                </p>
              </div>

              <div className="">
                <ul className="list-disc list-inside space-y-4">
                  <li className="">
                    <span className="font-bold">For Our Customers:</span> We
                    focus on making the booking experience totally seamless.
                    Instant quotes, easy scheduling, and only working with the
                    best-rated professionals means you get high quality without
                    the high stress.
                  </li>

                  <li>
                    <span className="font-bold">For Our Providers:</span>We give
                    local cleaning experts the tools they need to succeed. Our
                    smart dashboard helps them manage their schedule, fill their
                    books, and grow their business—all in one clean place.
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <Link href={"/services"}>
                  <Button className="px-10!" size="lg" icon={true}>
                    Get a quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
