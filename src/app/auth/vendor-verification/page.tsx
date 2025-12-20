import Image from "next/image";

export default function VendorVerifaction() {
  return (
    <div className="container px-4 flex items-center justify-center">
      <div className=" xl:w-[80%] mx-auto bg-secondary rounded-[58px] my-8">
        {/* Main Card */}
        <div className=" rounded-3xl  p-8 md:p-12">
          {/* Profile Section */}
          <div className="flex flex-col items-center text-center mb-8">
            {/* Illustration */}
            <div className="mb-6">
              <Image
                src={"/images/vendor-verifi-photo.png"}
                alt="vendor verifi photo"
                width={200}
                height={200}
                className="w-[200] h-[200] rounded-full object-cover"
              />
            </div>

            {/* User Info */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              John Doe
            </h1>
            <p className="text-gray-500 mb-4">example@gmail.com</p>

            {/* Status Badge */}
            <span className="inline-flex items-center px-6 py-2 rounded-full text-sm font-semibold bg-purple-600 text-white">
              In Review
            </span>
          </div>

          {/* Status Section */}
          <div className="bg-[#FFFFFF] rounded-figma-sm p-6 md:p-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Your application is in review
            </h2>
            <p className="text-gray-600 mb-4">
              Thank you for sharing the info. You'll get an email once we're
              done reviewing.
            </p>
            <p className="text-gray-900 font-semibold">
              Review time: <span className="">48 hours</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
