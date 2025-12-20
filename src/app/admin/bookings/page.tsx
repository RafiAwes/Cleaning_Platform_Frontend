"use client";
import AdminNavTitle from "@/components/common/super-dash/reuse/admin-nav";
import SearchBox from "@/components/common/super-dash/reuse/search-box";
import { TableNoItem } from "@/components/reusable/table-no-item";
import { TableSkeleton } from "@/components/reusable/table-skeleton";
import { CustomTable } from "@/components/reusable/custom-table";
import { Pagination } from "@/components/reusable/pagination";
import SelectBox from "@/components/reusable/select-box";
import { TableCell, TableRow } from "@/components/ui";
import useConfirmation from "@/provider/confirmation";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reusable/avater";
import { DeleteBtn } from "@/components/reusable/btn";
import { useGlobalState } from "@/hooks";
import { Badge } from "@/components/ui/badge";
import { helpers } from "@/lib";

const data = [
  {
    user: {
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    vendor: {
      avatar: "/images/vendor.png",
      name: "John Doe",
    },
    packageName: "Package name goes here",
    bookingTime: "10th Nov, 2025 at 05:30 PM",
    price: 250,
    status: "Pending",
    action: "delete",
  },
  {
    user: {
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    vendor: {
      avatar: "/images/vendor.png",
      name: "John Doe",
    },
    packageName: "Package name goes here",
    bookingTime: "10th Nov, 2025 at 05:30 PM",
    price: 250,
    status: "Ongoing",
    action: "delete",
  },
  {
    user: {
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    vendor: {
      avatar: "/images/vendor.png",
      name: "John Doe",
    },
    packageName: "Package name goes here",
    bookingTime: "10th Nov, 2025 at 05:30 PM",
    price: 250,
    status: "Pending",
    action: "delete",
  },
  {
    user: {
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    vendor: {
      avatar: "/images/vendor.png",
      name: "John Doe",
    },
    packageName: "Package name goes here",
    bookingTime: "10th Nov, 2025 at 05:30 PM",
    price: 250,
    status: "Ongoing",
    action: "delete",
  },
  {
    user: {
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    vendor: {
      avatar: "/images/vendor.png",
      name: "John Doe",
    },
    packageName: "Package name goes here",
    bookingTime: "10th Nov, 2025 at 05:30 PM",
    price: 250,
    status: "Ongoing",
    action: "delete",
  },
  {
    user: {
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    vendor: {
      avatar: "/images/vendor.png",
      name: "John Doe",
    },
    packageName: "Package name goes here",
    bookingTime: "10th Nov, 2025 at 05:30 PM",
    price: 250,
    status: "Ongoing",
    action: "delete",
  },
  {
    user: {
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    vendor: {
      avatar: "/images/vendor.png",
      name: "John Doe",
    },
    packageName: "Package name goes here",
    bookingTime: "10th Nov, 2025 at 05:30 PM",
    price: 250,
    status: "Pending",
    action: "delete",
  },
  {
    user: {
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    vendor: {
      avatar: "/images/vendor.png",
      name: "John Doe",
    },
    packageName: "Package name goes here",
    bookingTime: "10th Nov, 2025 at 05:30 PM",
    price: 250,
    status: "Pending",
    action: "delete",
  },
  {
    user: {
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    vendor: {
      avatar: "/images/vendor.png",
      name: "John Doe",
    },
    packageName: "Package name goes here",
    bookingTime: "10th Nov, 2025 at 05:30 PM",
    price: 250,
    status: "Completed",
    action: "delete",
  },
  {
    user: {
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    vendor: {
      avatar: "/images/vendor.png",
      name: "John Doe",
    },
    packageName: "Package name goes here",
    bookingTime: "10th Nov, 2025 at 05:30 PM",
    price: 250,
    status: "Pending",
    action: "delete",
  },
];

const intState = {
  page: 1,
  isPreview: false,
};

export default function Booking() {
  const { confirm } = useConfirmation();
  const [global, updateGlobal] = useGlobalState(intState);
  const headers = [
    "User",
    "Vendor",
    "Package name",
    "Booking time",
    "Price",
    "Status",
    "Action",
  ];
  const isLoading = false;

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      title: "Delete booking ?",
      description:
        "You are going to delete this booking. After deleting, this booking will no longer available in your platform",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div>
      <AdminNavTitle
        title="Booking management"
        subTitle="You can manage all the bookings of your platform from here"
      />
      <div className="flex flex-wrap space-y-3 lg:space-y-0 mt-2 items-center justify-between">
        <SearchBox
          placeholder="Search vendor"
          onChange={(e) => console.log(e)}
        />
        <SelectBox
          placeholder="Filter"
          icon={true}
          options={[
            { label: "All", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "Ongoing", value: "ongoing" },
            { label: "Completed", value: "completed" },
          ]}
          triggerClassName="bg-secondary border border-none py-5"
        />
      </div>
      <CustomTable
        headers={headers}
        pagination={
          <ul className="flex items-center flex-wrap justify-between py-3">
            <li className="flex">
              Total:
              <sup className="font-medium text-2xl relative -top-3 px-2 ">
                50
              </sup>
              bookings
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
                    fallback={item.user.name}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <span>{item.user.name}</span>
                </div>
              </TableCell>
              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src={""}
                    fallback={item.vendor.name}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <span>{item.vendor.name}</span>
                </div>
              </TableCell>
              <TableCell>{item.packageName}</TableCell>
              <TableCell>
                {" "}
                <h5>{item.bookingTime}</h5>
              </TableCell>
              <TableCell>
                {" "}
                <h5 className="ml-4">{item.price}</h5>
              </TableCell>
              <TableCell>
                <Badge variant={helpers.lowerCase(item.status) as any}>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>
                <ul className="flex gap-2">
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
    </div>
  );
}
