"use client";

import assets from "@/assets";
import Form from "@/components/reusable/from";
import { FromTextArea2 } from "@/components/reusable/from-textarea";
import Modal2 from "@/components/reusable/modal2";
import { Button } from "@/components/ui";
import { useGlobalState } from "@/hooks";
import { FeedbackCheckIcon } from "@/icon";
import { new_delivery_request } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import IconBox from "@/components/reusable/Icon-box";
import SubTitle from "@/components/reusable/title";
import FavIcon from "@/favicon/favicon";

const intState = {
  isDReq: false,
  isFedb: false,
};

type RatingType = "Poor" | "Good" | "Better" | "Best" | "Excellent";

interface RatingOption {
  label: RatingType;
  stars: number;
}

const ratingOptions: RatingOption[] = [
  { label: "Poor", stars: 1 },
  { label: "Good", stars: 2 },
  { label: "Better", stars: 3 },
  { label: "Best", stars: 4 },
  { label: "Excellent", stars: 5 },
];

type NotificationType = "default" | "tapToView" | "success" | "error";

const notifications = [
  {
    title: "Order placed successfully",
    date: "10th Nov, 2025 at 05:30 PM",
    type: "default",
    hasImage: true,
    read: false,
  },
  {
    title: "Order completed successfully",
    date: "10th Nov, 2025 at 05:30 PM",
    type: "success",
    hasImage: true,
    read: false,
  },
  {
    title: 'Delivery request from "John Doe"',
    date: "10th Nov, 2025 at 05:30 PM",
    type: "tapToView",

    showTapToView: true,
    hasImage: true,
    read: false,
  },
  {
    title: "Your order has been accepted by the vendor",
    date: "10th Nov, 2025 at 05:30 PM",
    type: "success",
    hasText: true,
    read: false,
  },
  {
    title: "Your order has been declined by the vendor",
    date: "10th Nov, 2025 at 05:30 PM",
    type: "error",
    hasText: true,
    read: true,
  },
];

const getTextColor = (type: NotificationType) => {
  switch (type) {
    case "success":
      return "text-[#2D9D1E]";
    case "tapToView":
      return "text-[#008BC0]";
    case "error":
      return "text-[#FF5445]";
    default:
      return "text-foreground";
  }
};

const Notification = () => {
  const [deliveryReModal, setDeliveryReModal] = useGlobalState(intState);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  // == add on ==
  const from = useForm({
    resolver: zodResolver(new_delivery_request),
    defaultValues: {
      name: "",
    },
  });

  const handleRatingClick = (stars: number) => {
    setSelectedRating(stars);
  };
  const handleStarClick = (starIndex: number) => {
    setSelectedRating(starIndex);
  };

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };
  const handleSubmit2 = async (values: FieldValues) => {
    console.log(values);
  };
  const packagePrice = 250;

  return (
    <div className="container px-4 mb-10">
      <SubTitle svg={false} className="text-2xl my-10" text="Notification" />

      <div className="space-y-3">
        {notifications.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              if (item.showTapToView) {
                setDeliveryReModal("isDReq", true);
              }
            }}
            className={`flex flex-col sm:flex-row sm:items-center justify-between 
                       bg-muted/50 py-4 px-4 rounded-lg gap-4 sm:gap-0  ${item.showTapToView ? "cursor-pointer" : ""}`}
          >
            {/* LEFT SIDE */}
            <div className="flex items-start sm:items-center gap-4">
              <IconBox>
                <FavIcon name="noti" />
              </IconBox>

              <div className="flex flex-col">
                <span
                  className={`font-medium ${getTextColor(
                    item.type as NotificationType
                  )}`}
                >
                  {item.title}
                </span>

                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span>{item.date}</span>

                  {item.showTapToView && (
                    <>
                      <span>•</span>
                      <span>Tap to view</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE ICON */}
            <div className="text-foreground flex sm:block justify-end w-full sm:w-auto">
              {item.read ? (
                <FavIcon name="message_read" />
              ) : (
                <FavIcon name="message_unread" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* add delivery req */}
      <Modal2
        open={deliveryReModal.isDReq}
        setIsOpen={(v: any) => setDeliveryReModal("isDReq", v)}
        title="Delivery request"
        titleStyle="text-center"
        className="sm:max-w-xl lg:max-w-2xl"
      >
        <div
          className="absolute top-3 right-4 cursor-pointer"
          onClick={() => setDeliveryReModal("isDReq", false)}
        >
          <X className="text-black" />
        </div>
        <Form className="space-y-4" from={from} onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:justify-between gap-2">
            <div className="bg-secondary p-3 rounded-figma-sm w-full xl:w-[60%]">
              <h3 className="text-sm font-semibold mb-3">Order details</h3>
              <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between">
                <div className="flex gap-3">
                  <Image
                    src={assets.bookingDetailsPhoto}
                    alt="House"
                    width={40}
                    height={40}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-1 wrap-break-word">
                      House cleaning service for residential areas in New York
                      City.
                    </p>
                    <p className="text-base font-semibold">${packagePrice}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className=" bg-secondary p-3 rounded-figma-sm w-full xl:w-[40%]">
              <h3 className="text-sm font-semibold mb-3">Vendor details</h3>
              <div className=" flex items-center gap-2">
                <div>
                  <Image
                    src={assets.userPhoto1}
                    alt={"photo"}
                    width={40}
                    height={40}
                    className="rounded-full w-[40px] h-[40px]"
                  />
                </div>
                <div>
                  <h1 className="text-[#000000]  text-[16px]">John Doe</h1>
                  <p>example@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* delivery_details */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Delivery details</h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index}>
                  <Image
                    src={assets.service1}
                    alt="House"
                    width={40}
                    height={40}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>
              ))}

              <div className="w-16 h-16 rounded-lg border flex justify-center items-center">
                <p className="text-xl font-semibold">+4</p>
              </div>
            </div>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur. Venenatis odio velit
              elementum gravida erat tincidunt enim bibendum. Adipiscing ut
              euismod maecenas duis ac turpis ut. Non odio malesuada pretium
              interdum facilisis. Volutpat leo scelerisque lacus lectus et
              donec. Enim vel auctor integer tincidunt. Amet sem nibh eget duis
              lectus venenatis nec. Ligula egestas consequat amet egestas
              consectetur nullam quisque arcu. Auctor gravida ac consequat velit
              egestas tellus vestibulum elementum. Arcu parturient quis tortor
              molestie massa dolor lectus nibh. Varius porta in consectetur.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-2 w-full">
            <Button
              onClick={() => setDeliveryReModal("isDReq", false)}
              className="w-full md:w-[50%] bg-[#FF5445]"
              size="lg"
            >
              Decline
            </Button>
            <Button
              onClick={() => {
                (setDeliveryReModal("isDReq", false),
                  setDeliveryReModal("isFedb", true));
              }}
              className="w-full md:w-[50%] bg-[#2D9D1E]"
              size="lg"
            >
              Accept
            </Button>
          </div>
        </Form>
      </Modal2>

      {/* add feedback */}
      <Modal2
        open={deliveryReModal.isFedb}
        setIsOpen={(v: any) => setDeliveryReModal("isFedb", v)}
        title="Your feedback"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <div
          className="absolute top-3 right-4 cursor-pointer"
          onClick={() => setDeliveryReModal("isFedb", false)}
        >
          <X className="text-black" />
        </div>
        <div className="flex flex-col justify-center items-center border-b mb-4 pb-4 space-y-2">
          <FeedbackCheckIcon />
          <h1 className="text-center xl:text-[20px] font-bold text-[#2D9D1E]">
            Payment successful
          </h1>
          <h1 className="text-center xl:text-[28px] font-bold">$250</h1>
        </div>

        <h1 className="text-center xl:text-[20px] font-bold py-2">
          Share your experience with John Doe
        </h1>
        <Form className="space-y-4" from={from} onSubmit={handleSubmit2}>
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
            onClick={() => setDeliveryReModal("isFedb", false)}
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

export default Notification;
