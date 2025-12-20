"use client";
import { DeleteBtn, PreviewBtn } from "@/components/reusable/btn";
import AdminNavTitle from "@/components/common/super-dash/reuse/admin-nav";
import SearchBox from "@/components/common/super-dash/reuse/search-box";
import { TableNoItem } from "@/components/reusable/table-no-item";
import { TableSkeleton } from "@/components/reusable/table-skeleton";
import { CustomTable } from "@/components/reusable/custom-table";
import { Pagination } from "@/components/reusable/pagination";
import { Button, TableCell, TableRow } from "@/components/ui";
import useConfirmation from "@/provider/confirmation";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reusable/avater";
import { useGlobalState } from "@/hooks";
import Link from "next/link";
import { Check } from "lucide-react";
import Modal from "@/components/reusable/modal";
import FavIcon from "@/favicon/favicon";
import { ImgBox } from "@/components/reusable/Img-box";
import { ApproveVendorReqIcon, DeleteVendorReqIcon } from "@/icon";

const data = [
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    address: "47 W 13th St, New York, NY 10011, USA",
    totalPackage: 6,
    totalStuff: 20,
    actions: {
      view: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    address: "47 W 13th St, New York, NY 10011, USA",
    totalPackage: 6,
    totalStuff: 20,
    actions: {
      view: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    address: "47 W 13th St, New York, NY 10011, USA",
    totalPackage: 6,
    totalStuff: 20,
    actions: {
      view: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    address: "47 W 13th St, New York, NY 10011, USA",
    totalPackage: 6,
    totalStuff: 20,
    actions: {
      view: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    address: "47 W 13th St, New York, NY 10011, USA",
    totalPackage: 6,
    totalStuff: 20,
    actions: {
      view: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    address: "47 W 13th St, New York, NY 10011, USA",
    totalPackage: 6,
    totalStuff: 20,
    actions: {
      view: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    address: "47 W 13th St, New York, NY 10011, USA",
    totalPackage: 6,
    totalStuff: 20,
    actions: {
      view: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    address: "47 W 13th St, New York, NY 10011, USA",
    totalPackage: 6,
    totalStuff: 20,
    actions: {
      view: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    address: "47 W 13th St, New York, NY 10011, USA",
    totalPackage: 6,
    totalStuff: 20,
    actions: {
      view: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    address: "47 W 13th St, New York, NY 10011, USA",
    totalPackage: 6,
    totalStuff: 20,
    actions: {
      view: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    address: "47 W 13th St, New York, NY 10011, USA",
    totalPackage: 6,
    totalStuff: 20,
    actions: {
      view: true,
      delete: true,
    },
  },
];
const intState = {
  page: 1,
  isPreview: false,
};

export default function VendorRequests() {
  const { confirm } = useConfirmation();
  const [global, updateGlobal] = useGlobalState(intState);
  const headers = ["Name", "Email", "Address", "Action"];
  const isLoading = false;

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      title: "Delete Vendor Request?",
      description:
        "You are going to delete this vendor request. After deleting, this vendor request will no longer available in your platform",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div>
      <AdminNavTitle
        title="Vendor Requests"
        subTitle="You can manage all the vendor requests those wants to create an account in your platform."
      />
      <div className="flex flex-wrap space-y-3 lg:space-y-0 mt-2 items-center justify-between">
        <SearchBox
          placeholder="Search Vendor"
          onChange={(e) => console.log(e)}
        />
        <div className="flex gap-2">
          <Link href="/admin/vendors/requests">
            <Button size="lg" className="bg-[#2D9D1E]">
              <Check />
              Approve all
            </Button>
          </Link>
        </div>
      </div>
      <CustomTable
        headers={headers}
        pagination={
          <ul className="flex items-center flex-wrap justify-between py-3">
            <li className="flex">
              Total:
              <sup className="font-medium text-2xl relative -top-3 px-2 ">
                500
              </sup>
              vendors
            </li>
            <li>
              <Pagination
                onPageChange={(v: any) => updateGlobal("page", v)}
                {...dummyJson.meta}
              />
            </li>
          </ul>
        }
      >
        {isLoading ? (
          <TableSkeleton colSpan={headers?.length} tdStyle="!pl-2" />
        ) : data?.length > 0 ? (
          data?.map((item, index) => (
            <TableRow key={index} className="border">
              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src={""}
                    fallback={item.name}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <span>{item.name}</span>
                </div>
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                {" "}
                <h5>{item.address}</h5>
              </TableCell>

              <TableCell>
                <ul className="flex gap-2">
                  <li>
                    <PreviewBtn
                      onClick={() => updateGlobal("isPreview", true)}
                    />
                  </li>
                  <li>
                    <Button className="bg-secondary size-10">
                      <Check className="size-5 text-[#2D9D1E]" />
                    </Button>
                  </li>
                  <li>
                    <DeleteBtn onClick={() => handleDelete("4343")} />
                  </li>
                </ul>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableNoItem
            colSpan={headers?.length}
            title="No users are available at the moment"
            tdStyle="!bg-background"
          />
        )}
      </CustomTable>
      {/*  ================= is preview ============= */}
      <Modal
        open={global.isPreview}
        setIsOpen={(value) => updateGlobal("isPreview", value)}
        title="User Details"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <div className="space-y-6">
          <div className="border flex justify-between bg-secondary border-none items-center rounded-xl px-2 py-3">
            <div className="flex items-center space-x-2">
              <Avatars
                src={""}
                fallback={"T"}
                alt="profile"
                fallbackStyle="aStyle"
              />
              <div className="leading-5">
                <h1 className="font-semibold text-lg">Elizabeth Olson</h1>
                <h1 className="text-secondery-figma">example@gmail.com</h1>
              </div>
            </div>
          </div>
          <div className="border flex justify-between bg-secondary border-none items-center rounded-xl px-2 py-5">
            <h1 className="flex items-center space-x-2">
              <FavIcon name="bug_cc_sm" />
              <span className="ml-px">Business name goes here</span>
            </h1>
          </div>
          <div className="border flex justify-between bg-secondary border-none items-center rounded-xl px-2 py-5">
            <h1 className="flex items-center space-x-2">
              <FavIcon name="location_cc" />
              <span className="ml-px">
                70 Washington Square South, New York, NY 10012, United States
              </span>
            </h1>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <ImgBox
              src={"/images/vendor-request1.png"}
              alt="vendor request photo"
              className="w-full md:w-[50%] h-[130px] rounded-figma-sm!"
            />
            <ImgBox
              src={"/images/vendor-request2.png"}
              alt="vendor request photo"
              className="w-full md:w-[50%] h-[130px] rounded-figma-sm!"
            />
          </div>
          <div className=" flex flex-col md:flex-row items-center gap-2 ">
            <button className="cursor-pointer w-full md:w-[50%] flex items-center justify-center gap-2 h-12 text-white bg-[#FF5445] rounded-[10px]">
              <DeleteVendorReqIcon />
              Decline
            </button>
            <button className="cursor-pointer w-full md:w-[50%] h-12 flex items-center justify-center gap-2 text-white bg-[#2D9D1E] rounded-[10px]">
              <ApproveVendorReqIcon />
              Approve
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
