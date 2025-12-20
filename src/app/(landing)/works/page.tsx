import SubTitle from "@/components/reusable/title";
import Image from "next/image";

function WorkPage() {
  return (
    <div className="pt-[48px] mb-20">
      <div className="container px-4">
        <div className="pb-8">
          <SubTitle text="How it works" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 md:gap-6 xl:gap-3">
          <div className="space-y-2">
            <Image
              src="/images/works/work-photo1.png"
              alt="Photo"
              width={500}
              height={500}
              className="w-full h-[300px] md:h-[325px] xl:h-[400px] "
            />
            <div className="space-y-2 max-w-[95%]">
              <h1 className="text-[#000000] font-bold text-[16px] xl:text-[20px]">
                Browse Services
              </h1>
              <p className="font-medium text-[16px] text-[#535353]">
                Start by telling us what you need—from a quick studio refresh to
                a full commercial deep clean. Instantly browse verified local
                vendors and compare their profiles, ratings, and transparent
                prices.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Image
              src="/images/works/work-photo2.png"
              alt="Photo"
              width={500}
              height={500}
              className="w-full h-[300px] md:h-[325px] xl:h-[400px] "
            />
            <div className="space-y-2 max-w-[95%]">
              <h1 className="text-[#000000] font-bold text-[16px] xl:text-[20px]">
                Schedule & Confirm
              </h1>
              <p className="font-medium text-[16px] text-[#535353]">
                Choose the professional you trust, pick a date and time that
                fits your busy NYC schedule, and confirm your appointment in
                seconds. No calls or complicated quotes needed!
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Image
              src="/images/works/work-photo3.png"
              alt="Photo"
              width={500}
              height={500}
              className="w-full  h-[300px] md:h-[325px] xl:h-[400px] "
            />
            <div className="space-y-2 max-w-[95%]">
              <h1 className="text-[#000000] font-bold text-[16px] xl:text-[20px]">
                Direct communication
              </h1>
              <p className="font-medium text-[16px] text-[#535353]">
                Communicate directly with the cleaning team on any specific
                instructions.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Image
              src="/images/works/work-photo4.png"
              alt="Photo"
              width={500}
              height={500}
              className="w-full h-[300px] md:h-[325px] xl:h-[400px] "
            />
            <div className="space-y-2 max-w-[95%]">
              <h1 className="text-[#000000] font-bold text-[16px] xl:text-[20px]">
                Enjoy the Clean
              </h1>
              <p className="font-medium text-[16px] text-[#535353]">
                Your trusted professional handles the hard work. Payment is
                safe, secure, and processed through the platform only after the
                job is complete. Enjoy your spotless home or office!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkPage;
