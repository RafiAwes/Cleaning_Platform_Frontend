"use client";

import { ImgBox } from "@/components/reusable/Img-box";
import assets from "@/assets";
import { DateDBIcon, FeedbackCheckIcon } from "@/icon";
import { Button, TableCell, TableRow } from "@/components/ui";
import { PaymentTable } from "@/components/reusable/vendor-table";
import { Star, X } from "lucide-react";
import { useGlobalState } from "@/hooks";
import Modal2 from "@/components/reusable/modal2";
import Form from "@/components/reusable/from";
import { FromInput } from "@/components/reusable/form-input";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { new_review } from "@/lib";
import { useState } from "react";
import {
  FromTextArea,
  FromTextArea2,
} from "@/components/reusable/from-textarea";

type RatingType = "Poor" | "Good" | "Better" | "Best" | "Excellent";

interface RatingOption {
  label: RatingType;
  stars: number;
}

interface Booking {
  id: number;
  service: string;
  price: number;
  customerName: string;
  customerEmail: string;
  date: string;
  rating?: null | number;
  hasRating?: boolean;
  status: "completed" | "pending" | "ongoing";
}
const bookings: Booking[] = [
  {
    id: 1,
    service:
      "House cleaning service for residential areas House cleaning service for residential areas",
    price: 250,
    customerName: "John Doe",
    customerEmail: "example@gmail.com",
    date: "10th Nov, 2025",
    rating: null,
    hasRating: false,
    status: "completed",
  },
  {
    id: 2,
    service:
      "House cleaning service for residential areas House cleaning service for residential areas",
    price: 250,
    customerName: "John Doe",
    customerEmail: "example@gmail.com",
    date: "10th Nov, 2025",
    rating: null,
    hasRating: false,
    status: "completed",
  },
  {
    id: 3,
    service:
      "House cleaning service for residential areas House cleaning service for residential areas areas House cleaning service for residential areas",
    price: 250,
    customerName: "John Doe",
    customerEmail: "example@gmail.com",
    date: "10th Nov, 2025",
    rating: 4.0,
    hasRating: true,
    status: "completed",
  },
  {
    id: 4,
    service:
      "House cleaning service for residential areas House cleaning service for residential areas areas House cleaning service for residential areas",
    price: 250,
    customerName: "John Doe",
    customerEmail: "example@gmail.com",
    date: "10th Nov, 2025",
    rating: 4.0,
    hasRating: true,
    status: "completed",
  },
  {
    id: 5,
    service:
      "House cleaning service for residential areas House cleaning service for residential areas areas House cleaning service for residential areas",
    price: 250,
    customerName: "John Doe",
    customerEmail: "example@gmail.com",
    date: "10th Nov, 2025",
    rating: 4.0,
    hasRating: true,
    status: "completed",
  },
];
const ratingOptions: RatingOption[] = [
  { label: "Poor", stars: 1 },
  { label: "Good", stars: 2 },
  { label: "Better", stars: 3 },
  { label: "Best", stars: 4 },
  { label: "Excellent", stars: 5 },
];

const intState = {
  isAdd: false,
  isEdit: false,
};

const BookingHistory = () => {
  const [reviewModal, setReviewModal] = useGlobalState(intState);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const from = useForm({
    resolver: zodResolver(new_review),
    defaultValues: {
      message: "",
    },
  });

  const handleRatingClick = (stars: number) => {
    setSelectedRating(stars);
  };
  const handleStarClick = (starIndex: number) => {
    setSelectedRating(starIndex);
  };

  const handleSubmit = async (values: FieldValues) => {
    // console.log(values);
    // console.log("selected rating value", selectedRating);
    from.reset();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold  ">Bookings history</h1>
      </div>

      <PaymentTable>
        {bookings?.map((item) => (
          <TableRow key={item.id} className="">
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <div>
                  <ImgBox
                    src={assets.bookingPhoto}
                    alt="photo"
                    className="w-[72px] h-[72px] rounded-[10px] object-cover"
                  />
                </div>

                <div className="">
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
              {" "}
              <div className="flex items-center gap-2">
                <div>
                  <ImgBox
                    src={assets.userPhoto1}
                    alt={"photo"}
                    className="rounded-full w-[50px] h-[50px]"
                  />
                </div>
                <div>
                  <h1 className="text-[#000000]  text-[16px]">
                    {item.customerName}
                  </h1>
                  <h2>{item.customerEmail}</h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              {" "}
              <div className="flex items-center gap-2 text-gray-600 ml-4">
                <DateDBIcon />
                <span className="text-sm whitespace-nowrap">{item.date}</span>
              </div>
            </TableCell>

            <TableCell>
              <div className="shrink-0">
                {item.hasRating ? (
                  <Button className="flex items-center gap-1.5 px-4 py-2 border bg-transparent rounded-lg">
                    <Star className="w-4 h-4 fill-[#FFA900] text-[#FFA900]" />
                    <span className="text-sm font-semibold text-gray-900">
                      {item.rating?.toFixed(1)}
                    </span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => setReviewModal("isAdd", true)}
                    className=" bg-[#FFA900] text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Give rating
                  </Button>
                )}
              </div>
            </TableCell>

            <TableCell className="text-right">
              <div>
                <ul className="list-disc list-inside">
                  <li
                    className={` text-white font-medium text-center text-sm px-4  p-2 rounded-figma-sm 
                         ${
                           item.status === "pending"
                             ? "bg-[#8A38F5]"
                             : item.status === "completed"
                               ? "bg-[#2D9D1E]"
                               : "bg-[#2A7FFF]"
                         }
                        `}
                  >
                    {item.status}
                  </li>
                </ul>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </PaymentTable>

      {/* ============== add on  ============== */}
      <Modal2
        open={reviewModal.isAdd}
        setIsOpen={(v: any) => setReviewModal("isAdd", v)}
        title="Your feedback"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <div
          className="absolute top-3 right-4 cursor-pointer"
          onClick={() => setReviewModal("isAdd", false)}
        >
          <X className="text-black" />
        </div>
        <h1 className="text-center xl:text-[20px] font-bold">
          Share your experience with John Doe
        </h1>
        <Form className="space-y-4" from={from} onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <svg
                  className={`w-12 h-12 ${
                    star <= selectedRating ? "fill-[#01aef0]" : "fill-gray-300"
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            ))}
          </div>

          {/* Rating Buttons */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {ratingOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => handleRatingClick(option.stars)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  selectedRating === option.stars
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Review Text Area */}
          <div className="mb-6">
            <FromTextArea2
              name="message"
              placeholder="Write your review here..."
              className="min-h-30 bg-secondary rounded-[10px]"
            />
          </div>

          <Button
            onClick={() => setReviewModal("isAdd", false)}
            size="lg"
            className="w-full"
          >
            Done
          </Button>
        </Form>
      </Modal2>
    </div>
  );
};

export default BookingHistory;
