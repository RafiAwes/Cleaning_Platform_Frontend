import { SubNavGmailIcon, SubNavPhoneIcon } from "@/icon";

const SubNav = () => {
  return (
    <div className="bg-primary px-4 xl:px-20 py-3 md:py-0">
      <div className="flex flex-col md:flex-row items-center md:justify-between py-2 gap-3 xl:gap-0">
        <div className="">
          <h2 className="text-white">Contact with us anytime.</h2>
        </div>

        <div className=" flex flex-col md:flex-row items-center gap-2.5 xl:gap-8">
          <h2 className="flex items-center gap-2 text-white">
            <SubNavPhoneIcon /> 917-717-1054
          </h2>
          <h2 className="flex items-center gap-2 text-white">
            <SubNavGmailIcon /> admin@guestreadycleanings.com
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SubNav;
