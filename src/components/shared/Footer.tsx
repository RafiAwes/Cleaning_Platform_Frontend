"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FacebookIcon, InstagramIcon, TiktokIcon, TwitterIcon, YoutubeIcon } from "@/icon";
import { useForm } from "react-hook-form";
import { ImgBox } from "../reusable/Img-box";
import assets from "@/assets";
import Link from "next/link";

type FormData = {
  email: string;
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div
      className="bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/images/footer.png')" }}
    >
      <div className="container flex-1 flex items-center justify-center py-14">
        <div className="">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <ImgBox
              src={assets.logo}
              className="w-20 h-20 rounded-md"
              alt="logo"
            />
          </div>

          <div className="space-y-1 mb-8">
            {/* Heading */}
            <h1 className="text-[#ffff] font-bold text-[20px] text-center">
              Guest Ready: Trusted Local Cleaning Experts.
            </h1>

            {/* Subheading */}
            <p className="font-sans  text-[#ffff]  text-center">
              Quality service and outstanding cleaning expertise, all backed up
              with certificates and after-training
            </p>
          </div>

          {/* Email Subscription Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-3"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="text-white placeholder:text-white"
            />
            <Button type="submit" className="bg-white text-black px-8">
              Subscribe
            </Button>
          </form>


          {/* Social Media Icons */}
          <div className="flex gap-4 justify-center ">
            <Link href="#facebook">
              <FacebookIcon className="size-12" />
            </Link>
            <Link href="#Instagram">
              <InstagramIcon className="size-12" />
            </Link>
            <Link href="#Twitter">
              <TwitterIcon className="size-12" />
            </Link>
            <Link href="#Tiktok">
              <TiktokIcon className="size-12" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className=" text-white border-t border-white/10 py-2.5">
        <div className="container">
          {/* Footer Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-2">
            {/* Copyright */}
            <div className="flex flex-col  justify-center  sm:col-span-1">
              <p className="text-sm text-center font-medium mx-auto flex items-center gap-2 text-blue-50">
                <span className="text-lg">©</span>
                Copyrights of Guest ready {new Date().getFullYear()}
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 sm:col-span-1 lg:col-span-2 text-center sm:text-left">
              <Link
                href="/privacy-policy"
                className="text-sm hover:text-white transition-colors text-blue-50"
              >
                Privacy policy
              </Link>
              <Link
                href="/terms-and-condition"
                className="text-sm hover:text-white transition-colors text-blue-50"
              >
                Terms & conditions
              </Link>
              <Link
                href="/faq"
                className="text-sm hover:text-white transition-colors text-blue-50"
              >
                FAQ
              </Link>
              <Link
                href="/contact-us"
                className="text-sm hover:text-white transition-colors text-blue-50"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
