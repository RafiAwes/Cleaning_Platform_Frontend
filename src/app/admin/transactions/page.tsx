"use client";
import AdminNavTitle from "@/components/common/super-dash/reuse/admin-nav";
import SearchBox from "@/components/common/super-dash/reuse/search-box";
import { TableNoItem } from "@/components/reusable/table-no-item";
import { TableSkeleton } from "@/components/reusable/table-skeleton";
import { CustomTable } from "@/components/reusable/custom-table";
import { Pagination } from "@/components/reusable/pagination";
import { TableCell, TableRow } from "@/components/ui";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reusable/avater";
import { DeleteBtn } from "@/components/reusable/btn";
import { useGlobalState } from "@/hooks";
import { Badge } from "@/components/ui/badge";
import { helpers } from "@/lib";
import FavIcon from "@/favicon/favicon";

const data = [
  {
    title: "Got percentage",
    entity: {
      // User name goes here
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    time: "10th Nov, 2025 at 05:30 PM",
    payment: "payment",
    amount: 250,
  },
  {
    title: "Payment",
    entity: {
      // User name goes here
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    time: "10th Nov, 2025 at 05:30 PM",
    payment: "withdrawn",
    amount: 250,
  },
  {
    title: "Withdrawn amount",
    entity: {
      // Vendor name goes here
      avatar: "/images/vendor.png",
      name: "John Doe",
    },
    time: "10th Nov, 2025 at 05:30 PM",
    payment: "withdrawn",
    amount: 250,
  },
  {
    title: "Got percentage",
    entity: {
      // User name goes here
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    time: "10th Nov, 2025 at 05:30 PM",
    payment: "payment",
    amount: 250,
  },
  {
    title: "Got percentage",
    entity: {
      // User name goes here
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    time: "10th Nov, 2025 at 05:30 PM",
    payment: "payment",
    amount: 250,
  },
  {
    title: "Payment",
    entity: {
      // User name goes here
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    time: "10th Nov, 2025 at 05:30 PM",
    payment: "payment",
    amount: 250,
  },
  {
    title: "Payment",
    entity: {
      // User name goes here
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    time: "10th Nov, 2025 at 05:30 PM",
    payment: "payment",
    amount: 250,
  },
  {
    title: "Payment",
    entity: {
      // User name goes here
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    time: "10th Nov, 2025 at 05:30 PM",
    payment: "payment",
    amount: 250,
  },
  {
    title: "Payment",
    entity: {
      // User name goes here
      avatar: "/images/avatar.png",
      name: "Elizabeth Olson",
    },
    time: "10th Nov, 2025 at 05:30 PM",
    payment: "withdrawn",
    amount: 250,
  },
  {
    title: "Withdrawn amount",
    entity: {
      // Vendor name goes here
      avatar: "/images/vendor.png",
      name: "John Doe",
    },
    time: "10th Nov, 2025 at 05:30 PM",
    payment: "withdrawn",
    amount: 250,
  },
];
const intState = {
  page: 1,
  isPreview: false,
};

export default function Transactions() {
  const [global, updateGlobal] = useGlobalState(intState);
  const headers = ["Title", "User / Vendor", "Time", "Amount"];
  const isLoading = false;

  return (
    <div>
      <AdminNavTitle
        title="All transactions"
        subTitle="You can see all the transactions of your platform from here"
      />
      <div className="flex flex-wrap space-y-3 lg:space-y-0 mt-2 items-center justify-between">
        <SearchBox
          placeholder="Search transaction"
          onChange={(e) => console.log(e)}
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
              transactions
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
              <TableCell>
                {" "}
                <h5 className="flex items-center space-x-2">
                  {item.payment == "payment" ? (
                    <FavIcon name="payment_cc" className="mr-2" />
                  ) : (
                    <FavIcon name="withdrawn_cc" className="mr-2" />
                  )}
                  {item.title}
                </h5>
              </TableCell>
              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src={""}
                    fallback={item.entity.name}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <span>{item.entity.name}</span>
                </div>
              </TableCell>
              <TableCell>{item.time}</TableCell>

              <TableCell>{item.amount}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableNoItem
            colSpan={headers?.length}
            title="No transactions are available at the moment"
            tdStyle="!bg-background"
          />
        )}
      </CustomTable>
    </div>
  );
}
