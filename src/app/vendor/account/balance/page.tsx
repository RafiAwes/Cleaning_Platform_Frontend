import { TableNoItem } from "@/components/reusable/table-no-item";
import { TableSkeleton } from "@/components/reusable/table-skeleton";
import { VendorTable } from "@/components/reusable/vendor-table";
import { Button, ButtonGroupText, TableCell, TableRow } from "@/components/ui";
import FavIcon from "@/favicon/favicon";
import { ArrowRight } from "lucide-react";

const data = [
  {
    title: "House cleaning service for residential areas in New York City.",
    price: "$250",
    value: 986, // big orange badge shown in screenshot
    dateTime: "10th Nov, 2025 at 05:30 PM",
    type: "received", // green icon
  },
  {
    title: "House cleaning service for residential areas in New York City.",
    price: "$250",
    value: null, // no orange badge
    dateTime: "10th Nov, 2025 at 05:30 PM",
    type: "received",
  },
  {
    title: "House cleaning service for residential areas in New York City.",
    price: "$250",
    value: null,
    dateTime: "10th Nov, 2025 at 05:30 PM",
    type: "received",
  },
  {
    title: "House cleaning service for residential areas in New York City.",
    price: "$250",
    value: 552.5, // small orange badge in screenshot
    dateTime: "10th Nov, 2025 at 05:30 PM",
    type: "withdrawn", // red icon
  },
  {
    title: "House cleaning service for residential areas in New York City.",
    price: "$250",
    value: null,
    dateTime: "10th Nov, 2025 at 05:30 PM",
    type: "withdrawn",
  },
];

export default function BalanceBox() {
  const isLoading = false;
  return (
    <div>
      <h1 className="font-semibold text-lg mb-4">Account Balance </h1>
      <div className="bg-secondary p-4 rounded-lg relative">
        <ul className="mx-auto flex flex-col justify-center">
          <li className="mx-auto">
            <FavIcon name="bug_cc" />
          </li>
          <li className="text-center">Balance</li>
          <li className="text-xl text-center font-semibold">$ 25,360</li>
        </ul>
        <Button className="bg-white text-lg flex items-center mx-auto mt-1 text-black lg:absolute top-4 right-4">
          Go to<span className="text-[#635BFF] font-extrabold!">stripe</span>
          <ArrowRight />
        </Button>
      </div>
      <VendorTable headers={[]}>
        {isLoading ? (
          <TableSkeleton colSpan={2} tdStyle="!pl-2" />
        ) : data?.length > 0 ? (
          data?.map((item, index) => (
            <TableRow key={index} className="border">
              <TableCell>
                {" "}
                <div className="flex items-center space-x-3">
                  <FavIcon name="payment_cc" className="mr-2" />
                  <ul>
                    <li>{item.title}</li>
                    <li className="text-xl font-semibold">$250</li>
                  </ul>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center">
                  <FavIcon name="calender_cc" />
                  <span className="text-figma-gray ml-1">{item.dateTime}</span>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableNoItem
            colSpan={2}
            title="No Order are available at the moment"
            tdStyle="!bg-background"
          />
        )}
      </VendorTable>
    </div>
  );
}
