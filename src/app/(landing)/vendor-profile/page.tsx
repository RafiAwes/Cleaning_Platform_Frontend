"use client";

import React, { useState } from "react";
import { Clock, Package, CheckCircle, Star } from "lucide-react";
import {
  ArrowBlackRightIcon,
  MessageIcon,
  TopVendorIcon,
  TotalOrderIcon,
  TotalPackageIcon,
  WatchIcon,
} from "@/icon";
import Image from "next/image";
import { Button } from "@/components/ui";
import Link from "next/link";
import assets from "@/assets";

interface VendorData {
  name: string;
  email: string;
  address: string;
  rating: number;
  availableFrom: string;
  availableTo: string;
  totalPackages: number;
  totalOrders: number;
  image: string;
  bio: string;
}

interface PackageItem {
  id: number;
  title: string;
  price: number;
  vendor: string;
  rating: number;
  image: string;
}

interface Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Service {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

const VendorProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"packages" | "reviews">(
    "packages"
  );

  // Sample vendor data
  const vendorData: VendorData = {
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    address: "Dhaka, Bangladesh",
    rating: 4.5,
    availableFrom: "09:00 AM",
    availableTo: "06:00 PM",
    totalPackages: 5,
    totalOrders: 160,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    bio: "Lorem ipsum dolor sit amet consectetur. Viverra pharetra maximus tortor facilisis erat amet dictum. Emc erat pulvinar amet id. Viverra tortor blandit faucibus enim consequat ligula lectus in. Ut at consequat velit sociis mauris tortor. Nunc ut molestie tristique id.",
  };

  // Sample service data
  const services: Service[] = [
    {
      id: 1,
      title: "House cleaning service for residential areas in New York City.",
      category: "Home Cleaning",
      price: 250,
      rating: 4.8,
      reviews: 128,
      image: "/assets/service1.png",
    },
    {
      id: 2,
      title: "House cleaning service for residential areas in New York City.",
      category: "Deep Cleaning",
      price: 250,
      rating: 4.9,
      reviews: 256,
      image: "/assets/service1.png",
    },
    {
      id: 3,
      title: "House cleaning service for residential areas in New York City.",
      category: "Carpet Care",
      price: 250,
      rating: 4.7,
      reviews: 89,
      image: "/assets/service1.png",
    },
    {
      id: 4,
      title: "House cleaning service for residential areas in New York City.",
      category: "Carpet Care",
      price: 250,
      rating: 4.7,
      reviews: 89,
      image: "/assets/service1.png",
    },
    {
      id: 5,
      title: "House cleaning service for residential areas in New York City.",
      category: "Carpet Care",
      price: 250,
      rating: 4.7,
      reviews: 89,
      image: "/assets/service1.png",
    },
  ];

  // Sample reviews data
  const reviews: Review[] = [
    {
      id: 1,
      customerName: "Sarah Johnson",
      rating: 5,
      comment:
        "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
      date: "2024-01-15",
    },
    {
      id: 2,
      customerName: "Mike Peters",
      rating: 4,
      comment:
        "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
      date: "2024-01-10",
    },
    {
      id: 3,
      customerName: "Emily Davis",
      rating: 5,
      comment:
        "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
      date: "2024-01-05",
    },
    {
      id: 4,
      customerName: "Emily Davis",
      rating: 5,
      comment:
        "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
      date: "2024-01-05",
    },
    {
      id: 5,
      customerName: "Emily Davis",
      rating: 5,
      comment:
        "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
      date: "2024-01-05",
    },
  ];

  return (
    <div className="bg-white pt-6 mb-10">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Vendor Profile */}
          <div className="lg:col-span-3">
            <div className="bg-secondary rounded-[16px] p-4 ">
              {/* Profile Image */}
              <div className="flex justify-center mb-4">
                <Image
                  src={vendorData.image}
                  alt={vendorData.name}
                  width={100}
                  height={100}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>

              {/* Vendor Name */}
              <h2 className="text-xl font-semibold text-gray-900 text-center mb-1">
                {vendorData.name}
              </h2>
              <p className="text-sm text-gray-500 text-center mb-1">
                {vendorData.email}
              </p>
              <p className="text-sm text-center font-bold mb-4">
                {vendorData.address}
              </p>

              {/* Top Vendor Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-full flex justify-center items-center bg-white p-2 rounded-lg">
                  <TopVendorIcon />
                  <span className="flex items-center text-sm font-medium text-gray-700">
                    Top vendor
                  </span>
                </div>

                <div className=" bg-white px-4 py-2 rounded-lg">
                  <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {vendorData.rating}
                  </span>
                </div>
              </div>

              {/* Message Button */}
              <button className="w-full bg-white  text-gray-700 py-2 px-4 rounded-lg text-sm font-medium mb-6  transition-colors flex items-center justify-center gap-2">
                <span>
                  <MessageIcon />
                </span>
                <span>Message</span>
              </button>

              {/* Bio */}
              <p className="text-center text-xs text-gray-600 leading-relaxed  pb-6">
                {vendorData.bio}
              </p>

              {/* Available Between */}
              <div className=" bg-white p-4 rounded-lg flex items-center justify-between gap-2 mb-6">
                <div className=" flex items-center gap-2">
                  <WatchIcon />
                  <span className="text-sm font-medium text-gray-900">
                    Available between:
                  </span>
                </div>

                <p className=" text-[12px] text-gray-700 ">
                  {vendorData.availableFrom} - {vendorData.availableTo}
                </p>
              </div>

              {/* Total Package Offered */}
              <div className=" bg-white flex gap-2 p-4 rounded-lg mb-4">
                <TotalPackageIcon />
                <div>
                  <p className="text-xs text-gray-600">
                    {" "}
                    Total package offered
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {" "}
                    {vendorData.totalPackages}
                  </h2>
                </div>
              </div>

              {/* Total Order Completed */}
              <div className=" bg-white flex gap-2 p-4 rounded-lg mb-4">
                <TotalOrderIcon />
                <div>
                  <p className="text-xs text-gray-600">
                    {" "}
                    Total order completed
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {" "}
                    {vendorData.totalOrders}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Packages/Reviews */}
          <div className="lg:col-span-9">
            {/* Tabs */}
            <div className="bg-white ">
              <div className="flex border-b ">
                <button
                  onClick={() => setActiveTab("packages")}
                  className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                    activeTab === "packages"
                      ? "text-primary font-bold text-lg border-b-2 border-primary "
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Packages
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                    activeTab === "reviews"
                      ? "text-primary font-bold text-lg border-b-2 border-primary "
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Reviews
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-b-lg  py-6">
              {activeTab === "packages" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {services.slice(0, 4).map((service) => (
                    <div
                      key={service.id}
                      className="bg-secondary rounded-[16px] overflow-hidden  "
                    >
                      {/* Service Image */}
                      <div className="relative w-full h-64 bg-muted overflow-hidden">
                        <Image
                          src={assets.service1}
                          alt={"photo"}
                          fill
                          className="object-cover rounded-[16px] transition duration-300"
                        />
                      </div>

                      {/* Service Info */}
                      <div className="p-4">
                        {/* Category */}
                        <div className="flex justify-between">
                          <p className="max-w-[80%] ">{service.title}</p>
                          <span className="text-[#000000] font-bold text-[16px] xl:text-[20px]">
                            ${service.price}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between mt-4 pt-4 ">
                          <div className="flex items-center gap-2">
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
                              <h1 className="text-[#000000]  text-[16px]">
                                John Doe
                              </h1>

                              <div className="flex items-center gap-1">
                                {[...Array(1)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(service.rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                                {service.rating}
                              </div>
                            </div>
                          </div>

                          <Link href={`/services/${service.id}`}>
                            <Button
                              className=" bg-white text-black font-bold"
                              size={"lg"}
                              icon={false}
                            >
                              Order
                              <ArrowBlackRightIcon className="text-black" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 ">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-secondary rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2">
                        <div>
                          <Image
                            src={assets.userPhoto1}
                            alt={"photo"}
                            width={40}
                            height={40}
                            className="rounded-full w-[50px] h-[50px]"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h1 className="text-[#000000]  text-[16px]">
                              John Doe
                            </h1>
                            <ul className="list-disc list-inside">
                              <li className="text-[#535353]">2 days ago</li>
                            </ul>
                          </div>

                          <div className="flex items-center gap-1">
                            {[...Array(1)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(review.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                            {review.rating}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed pt-4">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
