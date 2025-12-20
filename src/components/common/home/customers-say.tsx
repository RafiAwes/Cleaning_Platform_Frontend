"use client";

import SubTitle from "@/components/reusable/title";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";

import { FreeMode, Autoplay } from "swiper/modules";
import { COOIcon } from "@/icon";
import Image from "next/image";

const CustomersSay = () => {
  const testimonialData = [
    {
      id: 1,
      message:
        "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
      name: "John D.",
      position: "Project Manager",
      image: "/images/logo.png",
    },
    {
      id: 2,
      message:
        "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
      name: "John D.",
      position: "Company CEO",
      image: "/images/logo.png",
    },
    {
      id: 3,
      message:
        "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
      name: "John D.",
      position: "Company CEO",
      image: "/images/logo.png",
    },
    {
      id: 4,
      message:
        "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
      name: "John D.",
      position: "Company CEO",
      image: "/images/logo.png",
    },
    {
      id: 5,
      message:
        "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
      name: "John D.",
      position: "Company CEO",
      image: "/images/logo.png",
    },
    {
      id: 6,
      message:
        "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
      name: "John D.",
      position: "Company CEO",
      image: "/images/logo.png",
    },
  ];

  return (
    <div className="pt-[48px] xl:pt-[148px] relative">
      <div className="container px-4">
        <div className="pb-8">
          <SubTitle text="See what our customers say" />
        </div>

        <Swiper
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Autoplay]}
          className="mySwiper"
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 16 },
          }}
        >
          {testimonialData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[#F8F8F8] space-y-4 rounded-[16px]">
                <div className="bg-white flex flex-col gap-4 py-8 px-8">
                  <span>
                    <COOIcon />
                  </span>
                  <p className="font-medium text-[16px] text-[#535353]">
                    {item.message}
                  </p>
                </div>

                <div className="flex justify-between py-4 px-8">
                  <div>
                    <h1 className="text-[#000000] font-bold text-[16px] xl:text-[20px]">
                      {item.name}
                    </h1>
                    <span className="text-[#777777] text-[14px]">
                      {item.position}
                    </span>
                  </div>
                  <div>
                    <Image
                      src={item.image}
                      alt="Photo"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CustomersSay;
