import { Button } from "@/components/ui";
import {
  ArrowBlackRightIcon,
  Banner_categorie_four_Icon,
  Banner_categorie_one_Icon,
  Banner_categorie_three_Icon,
  Banner_categorie_two_Icon,
} from "@/icon";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import SearchBox2 from "../super-dash/reuse/search-box2";

const BannerSection = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      {/*====================== Destop device============ */}
      <div
        className="relative min-h-[calc(100vh-104px)] hidden 2xl:block"
        style={{
          backgroundImage: `url('/images/bannerPhoto.png')`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-[1140px] flex flex-col justify-center min-h-[calc(100vh-104px)] 2xl:pl-20 space-y-8">
          <h1 className="text-[64px] font-bold text-white leading-[1.1]">
            The Easiest Way to Book Premium Cleaning Services.
          </h1>
          <div className=" text-[20px] text-white">
            <p className="">
              Effortless booking for clients. Guaranteed business growth for
              top-tier cleaning vendors. Find or offer the best cleaning
            </p>
            <p>services in NYC, all in one place.</p>
          </div>
          <div>
            {user?.role === "customer" ? (
              <>
                <div className="mb-10">
                  <SearchBox2 />
                </div>

                <div className="flex items-center gap-4">
                  <Link href={"/book-now"}>
                    <Button
                      icon={true}
                      size="lg"
                      className=" w-[300px] font-bold "
                    >
                      Book now
                    </Button>
                  </Link>
                  <Link href={"/services"}>
                    <Button
                      icon={false}
                      size="lg"
                      className="w-[270px] md:w-[200px]  lg:w-[300px]  bg-transparent text-white border"
                    >
                      Browse all services
                      <ArrowBlackRightIcon />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col lg:flex-row  items-center gap-4">
                  <Link href={"/auth"}>
                    <Button
                      icon={true}
                      size="lg"
                      className="w-[340px] font-bold "
                    >
                      Continue as user
                    </Button>
                  </Link>

                  <Link href={"/auth/vendor-register"}>
                    <Button
                      icon={false}
                      size="lg"
                      className="w-[340px] font-bold bg-transparent border border-gray-200 text-white"
                    >
                      Are You a Service Provider? Join Us!
                      <ArrowBlackRightIcon className="text-white" />
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ================== small device / medium device =========== */}
      <div
        className="relative h-auto py-10 md:h-[450px] lg:h-[586px] 2xl:hidden"
        style={{
          backgroundImage: `url('/images/screen/bannerPhoto-sm.png')`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          objectFit: "contain",
        }}
      >
        <div className="max-w-[1140px] flex flex-col justify-center  h-full pl-6 space-y-8">
          <h1 className="text-[24px] md:text-[40px] lg:text-[50px] font-bold text-white leading-[1.1]">
            The Easiest Way to Book Premium Cleaning Services.
          </h1>
          <div className=" text-[20px] text-white">
            <p className="text-sm md:text-[20px] lg:text-[25px] leading-[1.2]">
              Effortless booking for clients. Guaranteed business growth for
              top-tier cleaning vendors. Find or offer the best cleaning
            </p>
            <p className="text-sm md:text-[20px] lg:text-[25px] leading-[1.2]">
              services in NYC, all in one place.
            </p>
          </div>
          <div>
            {user?.role === "customer" ? (
              <>
                <div className="mb-10 w-[90%]">
                  <SearchBox2 />
                </div>

                <div className="flex flex-col  md:flex-row gap-4">
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
                      className="w-[270px] md:w-[200px]  lg:w-[300px]  bg-transparent text-white border"
                    >
                      Browse all services
                      <ArrowBlackRightIcon />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col md:flex-row  items-center gap-4">
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
                      className="w-[270px] md:w-[300px] lg:w-[320px] xl:w-[340px] md:font-bold bg-transparent border border-gray-200 text-white"
                    >
                      Are You a Service Provider? Join Us!
                      <ArrowBlackRightIcon className="text-white" />
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <BannerCategorie />
    </>
  );
};
export default BannerSection;

export const BannerCategorie = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* one */}
        <div className="border p-6 space-y-2">
          <Banner_categorie_one_Icon />
          <h1 className=" xl:text-[20px] font-semibold">
            Residential Cleaning
          </h1>
          <p className="text-[#535353]">
            We can clean your house, apartment, condo, penthouse, mansion, and
            more!
          </p>
        </div>
        {/* two */}
        <div className="border p-6 space-y-2">
          <Banner_categorie_two_Icon />
          <h1 className=" xl:text-[20px] font-semibold">Office Cleaning</h1>
          <p className="text-[#535353]">
            We can clean your office, or commercial space one time or on a
            recurring basis.
          </p>
        </div>
        {/* three */}
        <div className="border p-6 space-y-2">
          <Banner_categorie_three_Icon />
          <h1 className=" xl:text-[20px] font-semibold">Deep Cleaning</h1>
          <p className="text-[#535353]">
            We can do a deep detailed cleaning including things not included in
            a standard cleaning like baseboards, walls and more!
          </p>
        </div>
        {/* four */}
        <div className="border p-6 space-y-2">
          <Banner_categorie_four_Icon />
          <h1 className=" xl:text-[20px] font-semibold">
            Move In/Out Cleaning
          </h1>
          <p className="text-[#535353]">
            If you're moving in or moving out of a home, we can make it look
            brand new for you!
          </p>
        </div>
      </div>
    </div>
  );
};
