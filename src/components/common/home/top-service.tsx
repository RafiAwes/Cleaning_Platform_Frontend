"use client";

import SubTitle from "@/components/reusable/title";
import { Button } from "@/components/ui";
import { ArrowBlackRightIcon } from "@/icon";
import { Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import photo1 from "@/assets/service1.png";
import photo3 from "@/assets/service3.png";
import photo4 from "@/assets/service4.png";
import assets from "@/assets";
import Link from "next/link";

interface Service {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: StaticImageData;
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
    image: photo1,
  },
  {
    id: 2,
    title: "House cleaning service for residential areas in New York City.",
    category: "Deep Cleaning",
    price: 250,
    rating: 4.9,
    reviews: 256,
    image: photo1,
  },
  {
    id: 3,
    title: "House cleaning service for residential areas in New York City.",
    category: "Carpet Care",
    price: 250,
    rating: 4.7,
    reviews: 89,
    image: photo3,
  },
  {
    id: 4,
    title: "House cleaning service for residential areas in New York City.",
    category: "Carpet Care",
    price: 250,
    rating: 4.7,
    reviews: 89,
    image: photo4,
  },
];

export default function TopService() {
  return (
    <div className="pt-[48px] xl:pt-[148px]">
      <div className="container px-4">
        <div className="pb-8">
          <SubTitle text="Top services" />
        </div>

        {/* Main Content */}
        <main className="">
          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-secondary rounded-[16px] overflow-hidden  transition "
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
        </main>
      </div>
    </div>
  );
}
