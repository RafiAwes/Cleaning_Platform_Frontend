"use client";
import { DeleteBtn, PreviewBtn } from "@/components/reusable/btn";
import AdminNavTitle from "@/components/common/super-dash/reuse/admin-nav";
import SearchBox from "@/components/common/super-dash/reuse/search-box";
import { TableNoItem } from "@/components/reusable/table-no-item";
import { TableSkeleton } from "@/components/reusable/table-skeleton";
import { CustomTable } from "@/components/reusable/custom-table";
import { Pagination } from "@/components/reusable/pagination";
import SelectBox from "@/components/reusable/select-box";
import { Button, TableCell, TableRow } from "@/components/ui";
import useConfirmation from "@/provider/confirmation";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reusable/avater";
import { useGlobalState } from "@/hooks";
import Link from "next/link";
import FavIcon from "@/favicon/favicon";
import { useGetAllVendorsQuery, useGetPendingVendorsQuery } from "@/redux/api/adminApi";
import { useMemo, useState } from "react";

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

export default function Vendors() {
  const { confirm } = useConfirmation();
  const [global, updateGlobal] = useGlobalState(intState);
  const [searchQuery, setSearchQuery] = useState("");
  
  const headers = [
    "Name",
    "Email",
    "Address",
    "Total Package",
    "Total Stuff",
    "Action",
  ];
  
  // Fetch vendors from API
  const { data: vendorsData, isLoading, error } = useGetAllVendorsQuery(undefined);
  const { data: pendingData } = useGetPendingVendorsQuery(undefined);
  
  const vendors = vendorsData?.vendors || [];
  const pendingCount = pendingData?.vendors?.length || 0;
  
  // Filter vendors based on search
  const filteredVendors = useMemo(() => {
    if (!searchQuery) return vendors;
    return vendors.filter((vendor: any) => 
      vendor.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [vendors, searchQuery]);

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      title: "Delete vendor ?",
      description:
        "You are going to delete this vendor. After deleting, this vendor will no longer available in your platform",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div>
      <AdminNavTitle
        title="Vendor Management"
        subTitle="You can manage all the vendors of your platform from here"
      />
      <div className="flex flex-wrap space-y-3 lg:space-y-0 mt-2 items-center justify-between">
        <SearchBox onChange={(e) => setSearchQuery(e)} />
        <div className="flex gap-2">
          <Link href="/admin/vendors/requests">
            <Button size="lg">
              <FavIcon name="question_cc" />
              Requests:<span className="ml-px font-bold">{pendingCount}</span>
            </Button>
          </Link>
          <SelectBox
            placeholder="Filter"
            icon={true}
            options={[
              { label: "New vendors", value: "new_vendors" },
              { label: "Most package offered", value: "most_package_offered" },
              {
                label: "Least package offered",
                value: "least_package_offered",
              },
            ]}
            triggerClassName="bg-secondary border border-none py-5"
          />
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
            title="Failed to load vendors"
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
                {" "}
                <h5 className="ml-7">{vendor.packages?.length || 0}</h5>
              </TableCell>
              <TableCell>
                {" "}
                <h5 className="ml-6">{vendor.cleaners?.length || 0}</h5>
              </TableCell>
              <TableCell>
                <ul className="flex gap-2">
                  <li>
                    <Link href={`/admin/vendors/${vendor.id}`}>
                      {" "}
                      <PreviewBtn />
                    </Link>
                  </li>
                  <li>
                    <DeleteBtn onClick={() => handleDelete(vendor.id)} />
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
    </div>
  );
}
