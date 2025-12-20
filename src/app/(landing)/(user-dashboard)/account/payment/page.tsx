"use client";

import { ImgBox } from "@/components/reusable/Img-box";
import assets from "@/assets";
import { DateDBIcon, PaymentHistoryIcon } from "@/icon";
import { TableCell, TableRow } from "@/components/ui";
import { PaymentTable } from "@/components/reusable/vendor-table";

interface Booking {
  id: number;
  service: string;
  price: number;
  customerName: string;
  customerEmail: string;
  date: string;
  rating?: number;
  status: "completed" | "pending" | "ongoing";
}

const bookings: Booking[] = [
  {
    id: 1,
    service: "Package title goes here",
    price: 250,
    customerName: "Vendor name",
    customerEmail: "example@gmail.com",
    date: "10th Nov, 2025",
    status: "pending",
  },
  {
    id: 2,
    service: "Package title goes here",
    price: 250,
    customerName: "Vendor name",
    customerEmail: "example@gmail.com",
    date: "10th Nov, 2025",
    status: "ongoing",
  },
  {
    id: 3,
    service: "Package title goes here",
    price: 250,
    customerName: "Vendor name",
    customerEmail: "example@gmail.com",
    date: "10th Nov, 2025",
    status: "ongoing",
  },
  {
    id: 4,
    service: "Package title goes here",
    price: 250,
    customerName: "Vendor name",
    customerEmail: "example@gmail.com",
    date: "10th Nov, 2025",
    status: "ongoing",
  },
];

const PaymentPage = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Payment settings</h1>
      {/* Desktop Table View - Hidden on mobile/tablet */}
      <div className="hidden xl:block">
        <PaymentTable>
          {bookings?.map((item) => (
            <TableRow key={item.id} className="cursor-pointer">
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div>
                    <PaymentHistoryIcon className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-base">
                      {item.service}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <div>
                    <ImgBox
                      src={assets.userPhoto1}
                      alt="photo"
                      className="rounded-full w-[50px] h-[50px]"
                    />
                  </div>
                  <div>
                    <h1 className="text-gray-900 font-semibold text-base">
                      {item.customerName}
                    </h1>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2 text-gray-600 ml-4">
                  <DateDBIcon />
                  <span className="text-sm whitespace-nowrap">{item.date}</span>
                </div>
              </TableCell>

              <TableCell className="text-right">
                <div>
                  <p className="text-gray-900 font-semibold text-base">
                    ${item.price}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </PaymentTable>
      </div>

      {/* Mobile/Tablet Card View - Visible on small/medium screens */}
      <div className="xl:hidden space-y-3 sm:space-y-4">
        {bookings?.map((item) => (
          <div
            key={item.id}
            className="bg-secondary rounded-xl p-3 sm:p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            {/* Service Info with Image */}
            <div className="flex flex-col gap-3 mb-3 sm:mb-4">
              <PaymentHistoryIcon className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 text-sm sm:text-base  mb-1">
                  {item.service}
                </p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200">
              <ImgBox
                src={assets.userPhoto1}
                alt="photo"
                className="rounded-full w-10 h-10 sm:w-12 sm:h-12 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h1 className="text-gray-900 text-sm sm:text-base font-medium truncate">
                  {item.customerName}
                </h1>
              </div>
            </div>

            {/* Date and Status */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-gray-600">
                <DateDBIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="text-xs sm:text-sm">{item.date}</span>
              </div>

              <div>
                <p className="text-gray-900 font-semibold text-base">
                  ${item.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPage;
