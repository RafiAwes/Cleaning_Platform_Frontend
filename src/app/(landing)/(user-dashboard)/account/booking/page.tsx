"use client";

import { ImgBox } from "@/components/reusable/Img-box";
import assets from "@/assets";
import { BookingHistoryIcon, DateDBIcon } from "@/icon";
import { TableCell, TableRow } from "@/components/ui";
import { PaymentTable } from "@/components/reusable/vendor-table";
import { useRouter } from "next/navigation";

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
    service: "House cleaning service for residential areas in New York City.",
    price: 250,
    customerName: "John Doe",
    customerEmail: "example@gmail.com",
    date: "10th Nov, 2025",
    status: "pending",
  },
  {
    id: 2,
    service: "House cleaning service for residential areas in New York City.",
    price: 250,
    customerName: "John Doe",
    customerEmail: "example@gmail.com",
    date: "10th Nov, 2025",
    status: "ongoing",
  },
  {
    id: 3,
    service: "House cleaning service for residential areas in New York City.",
    price: 250,
    customerName: "John Doe",
    customerEmail: "example@gmail.com",
    date: "10th Nov, 2025",
    status: "ongoing",
  },
  {
    id: 4,
    service: "House cleaning service for residential areas in New York City.",
    price: 250,
    customerName: "John Doe",
    customerEmail: "example@gmail.com",
    date: "10th Nov, 2025",
    status: "ongoing",
  },
];

const BookingPage = () => {
  const router = useRouter();

  const handleNavigate = (statusValue: string) => {
    if (statusValue === "pending") {
      router.push("/account/pending-package-history");
    } else if (statusValue === "ongoing") {
      router.push("/account/ongoing-package-history");
    }
  };

  return (
    <div className="px-2 sm:px-4 lg:px-0">
      {/* Header - Responsive */}
      <div className="mb-4 sm:mb-6 flex items-center justify-between">
        <h1 className="text-base sm:text-lg md:text-xl font-semibold">
          Ongoing bookings
        </h1>
        <BookingHistoryIcon
          onClick={() => router.push("/account/booking-history")}
          className="cursor-pointer"
        />
      </div>

      {/* Desktop Table View - Hidden on mobile/tablet */}
      <div className="hidden xl:block">
        <PaymentTable>
          {bookings?.map((item) => (
            <TableRow
              key={item.id}
              className="cursor-pointer"
              onClick={() => handleNavigate(item.status)}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div>
                    <ImgBox
                      src={assets.bookingPhoto}
                      alt="photo"
                      className="w-[72px] h-[72px] rounded-[10px] object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-gray-800 whitespace-normal wrap-break-word">
                      {item.service}
                    </p>
                    <p className="text-gray-900 font-semibold text-base">
                      ${item.price}
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
                    <h1 className="text-[#000000] text-[16px]">
                      {item.customerName}
                    </h1>
                    <h2 className="text-sm text-gray-600">
                      {item.customerEmail}
                    </h2>
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
                  <ul className="list-disc list-inside">
                    <li
                      className={`text-white font-medium text-center text-sm px-4 p-2 rounded-figma-sm ${
                        item.status === "pending"
                          ? "bg-[#2A7FFF]"
                          : item.status === "completed"
                            ? "bg-[#2D9D1E]"
                            : item.status === "ongoing"
                              ? "bg-[#8A38F5]"
                              : ""
                      }`}
                    >
                      {item.status}
                    </li>
                  </ul>
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
            onClick={() => handleNavigate(item.status)}
          >
            {/* Service Info with Image */}
            <div className="flex flex-col gap-3 mb-3 sm:mb-4">
              <ImgBox
                src={assets.bookingPhoto}
                alt="photo"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 text-sm sm:text-base  mb-1">
                  {item.service}
                </p>
                <p className="text-gray-900 font-semibold text-base sm:text-lg">
                  ${item.price}
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
                <h2 className="text-xs sm:text-sm text-gray-600 truncate">
                  {item.customerEmail}
                </h2>
              </div>
            </div>

            {/* Date and Status */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-gray-600">
                <DateDBIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="text-xs sm:text-sm">{item.date}</span>
              </div>

              <div
                className={`text-white font-medium text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-figma-sm whitespace-nowrap ${
                  item.status === "pending"
                    ? "bg-[#2A7FFF]"
                    : item.status === "completed"
                      ? "bg-[#2D9D1E]"
                      : item.status === "ongoing"
                        ? "bg-[#8A38F5]"
                        : ""
                }`}
              >
                <ul className="list-disc list-inside">
                  <li>{item.status}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
