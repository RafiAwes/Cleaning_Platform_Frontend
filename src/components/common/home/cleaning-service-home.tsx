"use client";

import { Button } from "@/components/ui";
import photo1 from "@/assets/foodePhoto.png";
import Image from "next/image";
import { ArrowBlackRightIcon } from "@/icon";
import Link from "next/link";
import SearchBox2 from "../super-dash/reuse/search-box2";

import { useAppSelector } from "@/redux/hooks";
import SubTitle2 from "@/components/reusable/title2";

const CleaningServiceHome = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="mt-[60px] lg:mt-[120px]">
      <div className="px-4 my-6">
        <div
          className={`relative bg-secondary rounded-[30px] md:rounded-[58px] py-4 md:py-10 lg:py-10 px-10  md:max-w-[600px] lg:max-w-[700px] xl:max-w-[1180px] mx-auto  flex flex-col justify-center items-center h-auto  ${user.role == "user" ? " xl:h-[400px]" : "xl:h-[300px]"}`}
        >
          <div className="space-y-6  ">
            <div className="flex flex-col lg:flex-row justify-center  md:gap-4 lg:gap-0">
              <h1 className="text-[20px] xl:text-[36px] text-center font-bold text-[#000000]">
                The Easiest Way to Book Premium
              </h1>
              <SubTitle2 text="Cleaning Services." className="pl-4" />
            </div>
            <p className="text-center md:max-w-[600px] lg:max-w-[700px] xl:max-w-[1180px] mx-auto px-4">
              Effortless booking for clients. Guaranteed business growth for
              top-tier cleaning vendors. Find or offer the best cleaning
              services in NYC, all in one place.
            </p>

            {user.role == "user" ? (
              <>
                <div className="">
                  <SearchBox2 />
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                  <Link href={"/book-now"}>
                    <Button
                      icon={true}
                      size="lg"
                      className="w-[270px] md:w-[200px]  lg:w-[300px] md:font-bold "
                    >
                      Book now
                    </Button>
                  </Link>
                  <Link href={"/services"}>
                    <Button
                      icon={false}
                      size="lg"
                      className="w-[270px] md:w-[200px]  lg:w-[300px]  bg-transparent text-black border"
                    >
                      Browse all services
                      <ArrowBlackRightIcon />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
                  <Link href={"/auth"}>
                    <Button
                      icon={true}
                      size="lg"
                      className="w-[270px] md:w-[300px] lg:w-[320px] xl:w-[340px] md:font-bold "
                    >
                      Continue as user
                    </Button>
                  </Link>

                  <Link href={"/auth/vendor-register"}>
                    <Button
                      icon={false}
                      size="lg"
                      className="w-[270px] md:w-[300px] lg:w-[320px] xl:w-[340px] md:font-bold bg-transparent border border-gray-200 text-black"
                    >
                      Are You a Service Provider? Join Us!
                      <ArrowBlackRightIcon className="text-black" />
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* food photo */}
          <Image
            src={photo1}
            alt="photo"
            width={400}
            height={400}
            className="absolute -top-11 md:-top-12 lg:-top-24 -z-10 -right-2 md:-right-10 lg:-right-26 w-[80px] md:w-[100px] lg:w-[200px] lg:h-[200px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CleaningServiceHome;
