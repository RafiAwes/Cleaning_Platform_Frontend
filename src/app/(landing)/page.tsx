"use client";

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
import BannerSection from "@/components/common/home/banner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { user } = useAppSelector((state) => state.auth);

  const [searchText, setSearchText] = useState("");
  
  return (
    <>
      <BannerSection />
      
      {/* Search Bar for Services - Visible when user is logged in as customer */}
      {user.role === "customer" && (
        <div className="container py-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-secondary rounded-[16px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by service name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10 py-6 rounded-[16px] border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      )}
      
      {user.role === "customer" ? (
        <div>
          <TopService />
          <Customer />
        </div>
      ) : (
        <div>
          <Customer />
          <Vendor />
        </div>
      )}

      <About />
      <Works />
      <LoveGuest />
      <FQA />
      <CustomersSay />
      <VendorBox />
    </>
  );
}
