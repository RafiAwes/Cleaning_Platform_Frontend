"use client";
import VendorBookingChart from "@/components/common/chart/ven-booking-sta";
import { DeleteBtn, EditBtn } from "@/components/reusable/btn";
import useConfirmation from "@/provider/confirmation";
import IconBox from "@/components/reusable/Icon-box";
import Avatars from "@/components/reusable/avater";
import FavIcon from "@/favicon/favicon";
import { helpers } from "@/lib";
import Link from "next/link";

export default function PackageDetails() {
  const { confirm } = useConfirmation();

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      title: "Delete Package ?",
      description:
        "You are going to delete this Package. After deleting, this Package will no longer available in your platform",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div className="container space-y-10">
      <div className="bg-secondary flex justify-between items-center flex-wrap p-4 mt-10 rounded-md">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <Avatars
            src={""}
            fallback={"S"}
            alt="profile"
            fallbackStyle="aStyle rounded-md"
            className="rounded-md size-16 lg:size-12"
          />
          <div>
            <h2>House cleaning service for residential areas in New York </h2>
            <p className="font-semibold text-xl">$250</p>
          </div>
        </div>

        <div className="flex items-center mt-2 lg:mt-0 space-x-2">
          <Link href={`/vendor/packages/edit/1234`}>
            <EditBtn color="#000" className="bg-white" />
          </Link>

          <DeleteBtn
            onClick={() => handleDelete("1234")}
            className="bg-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
        <div className="border p-2 flex  space-x-3 rounded-md">
          <IconBox className="bg-secondary size-12 m-0 rounded-md">
            <FavIcon name="time_cc" />
          </IconBox>
          <div className="leading-5 ml-2">
            <h2 className="text-figma-gray">Ongoing booking of this package</h2>
            <p className="font-semibold text-xl">02</p>
          </div>
        </div>
        <div className="border p-2 flex  space-x-3 rounded-md">
          <IconBox className="bg-secondary size-12 m-0 rounded-md">
            <FavIcon name="calender_cc" />
          </IconBox>
          <div className="leading-5 ml-2">
            <h2 className="text-figma-gray">Total booking of this package</h2>
            <p className="font-semibold text-xl">26</p>
          </div>
        </div>
      </div>
      <div>
        <ul className="flex items-center flex-wrap  justify-between mb-5">
          <li className="text-xl font-bold">Booking Preference</li>
          <li className="border text-figma-gray py-1 px-2 text-sm rounded-sm">
            {helpers.formatDate(new Date())}
          </li>
        </ul>
        <VendorBookingChart />
      </div>
    </div>
  );
}
