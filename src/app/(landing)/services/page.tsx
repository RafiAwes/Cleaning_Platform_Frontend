"use client";

import assets from "@/assets";
import { Button, Input } from "@/components/ui";
import { ArrowBlackRightIcon, ArrowRightIcon, FilterIcon } from "@/icon";
import { Star, ShoppingCart, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface Service {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

// Sample service data
const services: Service[] = [
  {
    id: 1,
    title: "House cleaning service for residential areas in New York City.",
    category: "Home Cleaning",
    price: 250,
    rating: 4.8,
    reviews: 128,
    image: "/images/service1.png",
  },
  {
    id: 2,
    title: "House cleaning service for residential areas in New York City.",
    category: "Deep Cleaning",
    price: 250,
    rating: 4.9,
    reviews: 256,
    image: "/images/service1.png",
  },
  {
    id: 3,
    title: "House cleaning service for residential areas in New York City.",
    category: "Carpet Care",
    price: 250,
    rating: 4.7,
    reviews: 89,
    image: "/images/service1.png",
  },
  {
    id: 4,
    title: "House cleaning service for residential areas in New York City.",
    category: "Carpet Care",
    price: 250,
    rating: 4.7,
    reviews: 89,
    image: "/images/service4.png",
  },
  {
    id: 5,
    title: "House cleaning service for residential areas in New York City.",
    category: "Carpet Care",
    price: 250,
    rating: 4.7,
    reviews: 89,
    image: "/images/service1.png",
  },
  {
    id: 6,
    title: "House cleaning service for residential areas in New York City.",
    category: "Carpet Care",
    price: 250,
    rating: 4.7,
    reviews: 89,
    image: "/images/service1.png",
  },
  {
    id: 7,
    title: "House cleaning service for residential areas in New York City.",
    category: "Carpet Care",
    price: 250,
    rating: 4.7,
    reviews: 89,
    image: "/images/service1.png",
  },
  {
    id: 8,
    title: "House cleaning service for residential areas in New York City.",
    category: "Carpet Care",
    price: 250,
    rating: 4.7,
    reviews: 89,
    image: "/images/service4.png",
  },
];

export default function ServicePage() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="container px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative bg-secondary md:w-[40%] rounded-[16px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 " />
          <Input
            placeholder="Search by vendor name or service title"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className=" pl-10  py-6 rounded-[16px]  border-none focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className=" flex items-center gap-1 bg-secondary p-2 rounded-[16px] w-[40%] md:w-[100px]">
            <FilterIcon /> Sort by
          </DropdownMenuTrigger>
          <DropdownMenuContent className="md:mr-4">
            <DropdownMenuLabel>Highest price</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Lowest price</DropdownMenuItem>
            <DropdownMenuItem>Highest rating</DropdownMenuItem>
            <DropdownMenuItem>Lowest rating </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Content */}
      <main className="">
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-secondary rounded-[16px] overflow-hidden  "
            >
              {/* Service Image */}
              <div className="relative w-full h-64 bg-muted overflow-hidden">
                <Image
                  src={service.image}
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
                      <h1 className="text-[#000000]  text-[16px]">John Doe</h1>

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
      </main>
    </div>
  );
}
