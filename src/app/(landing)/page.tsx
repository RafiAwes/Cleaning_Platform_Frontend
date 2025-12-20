"use client";

import CleaningServiceHome from "@/components/common/home/cleaning-service-home";
import Customer from "@/components/common/home/customer";
import Vendor from "@/components/common/home/vendor";
import Works from "@/components/common/home/works";
import About from "@/components/common/home/about";
import LoveGuest from "@/components/common/home/love-guest";
import FQA from "@/components/common/home/fqa";
import CustomersSay from "@/components/common/home/customers-say";
import VendorBox from "@/components/common/home/vender-home";
import TopService from "@/components/common/home/top-service";

import { useAppSelector } from "@/redux/hooks";

export default function Home() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <CleaningServiceHome />
      {user.role == "user" ? (
        <div>
          <TopService />
        </div>
      ) : (
        <div>
          <Customer />
          <Vendor />
        </div>
      )}

      <Works />
      <About />
      <LoveGuest />
      <FQA />
      <CustomersSay />
      <VendorBox />
    </>
  );
}
