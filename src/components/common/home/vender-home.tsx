import { Button } from "@/components/ui";
import Link from "next/link";

function VendorBox() {
  return (
    <div className="pt-[48px] xl:pt-[148px]">
      <div className="container px-4">
        <div
          className="h-auto xl:h-[380px] mb-10 flex items-center rounded-2xl relative overflow-hidden"
          style={{
            backgroundImage: "url('/images/vendor-web-account.png')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark overlay for small devices */}
          <div className="absolute inset-0 bg-black/50 xl:bg-transparent"></div>

          <div className="relative z-10 p-4 md:p-8 xl:p-20 space-y-2 md:space-y-4 md:w-[80%] xl:w-[65%]">
            <h1 className="text-[#ffff] font-bold text-[20px] xl:text-[36px]">
              Focus on Cleaning. We Handle the Bookings.
            </h1>
            <p className="font-medium text-[12px] xl:text-[20px] text-[#ffff]">
              Join the fastest-growing platform connecting top-tier cleaning
              professionals with clients across New York City. Get reliable,
              quality leads directly to your business.
            </p>
            <Link href="/auth/vendor-register">
              <Button className="mt-4 xl:mt-0" size="lg" icon={true}>
                Create your vendor account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorBox;
