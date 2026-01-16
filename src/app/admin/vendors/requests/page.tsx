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
import { useGetPendingVendorsQuery, useApproveVendorMutation, useRejectVendorMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";
import { useState } from "react";

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
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const headers = ["Name", "Email", "Address", "Action"];
  
  // Fetch pending vendors from API
  const { data: vendorsData, isLoading, error } = useGetPendingVendorsQuery();
  const [approveVendor] = useApproveVendorMutation();
  const [rejectVendor] = useRejectVendorMutation();
  
  const vendors = vendorsData?.vendors || [];
  
  // Filter vendors based on search
  const filteredVendors = searchQuery 
    ? vendors.filter((v: any) => 
        v.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : vendors;
  
  const handleApprove = async (vendorId: number) => {
    const confirmed = await confirm({
      title: "Approve Vendor?",
      description: "This vendor will be approved and can start offering services.",
    });
    if (confirmed) {
      try {
        await approveVendor(vendorId.toString()).unwrap();
        toast.success("Vendor approved successfully");
        updateGlobal("isPreview", false);
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to approve vendor");
      }
    }
  };
  
  const handleReject = async (vendorId: number) => {
    const confirmed = await confirm({
      title: "Reject Vendor Request?",
      description: "This vendor request will be rejected and removed from the system.",
    });
    if (confirmed) {
      try {
        await rejectVendor(vendorId.toString()).unwrap();
        toast.success("Vendor rejected successfully");
        updateGlobal("isPreview", false);
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to reject vendor");
      }
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
          onChange={(e) => setSearchQuery(e)}
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
                {filteredVendors.length}
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
        ) : error ? (
          <TableNoItem
            colSpan={headers?.length}
            title="Failed to load vendor requests"
            tdStyle="!bg-background"
          />
        ) : filteredVendors?.length > 0 ? (
          filteredVendors?.map((vendor: any, index: number) => (
            <TableRow key={vendor.id || index} className="border">
              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src={vendor.user?.profile_picture || ""}
                    fallback={vendor.user?.name || "Vendor"}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <span>{vendor.user?.name || "N/A"}</span>
                </div>
              </TableCell>
              <TableCell>{vendor.user?.email || "N/A"}</TableCell>
              <TableCell>
                {" "}
                <h5>{vendor.address || "No address provided"}</h5>
              </TableCell>

              <TableCell>
                <ul className="flex gap-2">
                  <li>
                    <PreviewBtn
                      onClick={() => {
                        setSelectedVendor(vendor);
                        updateGlobal("isPreview", true);
                      }}
                    />
                  </li>
                  <li>
                    <Button 
                      className="bg-secondary size-10"
                      onClick={() => handleApprove(vendor.id)}
                    >
                      <Check className="size-5 text-[#2D9D1E]" />
                    </Button>
                  </li>
                  <li>
                    <DeleteBtn onClick={() => handleReject(vendor.id)} />
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
      {/*  ==========selectedVendor?.user?.profile_picture || ""}
                fallback={selectedVendor?.user?.name?.[0] || "V"}
                alt="profile"
                fallbackStyle="aStyle"
              />
              <div className="leading-5">
                <h1 className="font-semibold text-lg">{selectedVendor?.user?.name || "N/A"}</h1>
                <h1 className="text-secondery-figma">{selectedVendor?.user?.email || "N/A"}</h1>
              </div>
            </div>
          </div>
          <div className="border flex justify-between bg-secondary border-none items-center rounded-xl px-2 py-5">
            <h1 className="flex items-center space-x-2">
              <FavIcon name="bug_cc_sm" />
              <span className="ml-px">{selectedVendor?.business_name || "Business name not provided"}</span>
            </h1>
          </div>
          <div className="border flex justify-between bg-secondary border-none items-center rounded-xl px-2 py-5">
            <h1 className="flex items-center space-x-2">
              <FavIcon name="location_cc" />
              <span className="ml-px">
                {selectedVendor?.address || "No address provided"}
              </span>
            </h1>
          </div>
          {selectedVendor?.documents_info && (
            <div className="flex flex-col md:flex-row items-center gap-2">
              {selectedVendor.documents_info.nid_url && (
                <ImgBox
                  src={selectedVendor.documents_info.nid_url}
                  alt="NID document"
                  className="w-full md:w-[50%] h-[130px] rounded-figma-sm!"
                />
              )}
              {selectedVendor.documents_info.pob_url && (
                <ImgBox
                  src={selectedVendor.documents_info.pob_url}
                  alt="Proof of business"
                  className="w-full md:w-[50%] h-[130px] rounded-figma-sm!"
                />
              )}
            </div>
          )}
          <div className=" flex flex-col md:flex-row items-center gap-2 ">
            <button 
              onClick={() => selectedVendor && handleReject(selectedVendor.id)}
              className="cursor-pointer w-full md:w-[50%] flex items-center justify-center gap-2 h-12 text-white bg-[#FF5445] rounded-[10px]"
            >
              <DeleteVendorReqIcon />
              Decline
            </button>
            <button 
              onClick={() => selectedVendor && handleApprove(selectedVendor.id)}
              className="cursor-pointer w-full md:w-[50%] h-12 flex items-center justify-center gap-2 text-white bg-[#2D9D1E] rounded-[10px]"
            
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
