"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FavIcon from "@/favicon/favicon";
import IconBox from "../reusable/Icon-box";
import Avatars from "../reusable/avater";

export default function VendorNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: "home_ven", icon_i: "home_ven_i", href: "/vendor" },
    {
      name: "Bookings",
      icon: "bookings_ven",
      icon_i: "bookings_ven_i",
      href: "/vendor/bookings",
    },
    {
      name: "Packages",
      icon: "packages_ven",
      icon_i: "packages_ven_i",
      href: "/vendor/packages",
    },
    {
      name: "Stuffs",
      icon: "stuffs_ven",
      icon_i: "stuffs_ven_i",
      href: "/vendor/stuffs",
    },
    {
      name: "Inventory",
      icon: "inventory_ven",
      icon_i: "inventory_ven_i",
      href: "/vendor/inventory",
    },
    {
      name: "About Us",
      icon: "about_us_cc",
      icon_i: "about_us_cc_i",
      href: "/vendor/about-us",
    },
    {
      name: "How is works",
      icon: "work_cc",
      icon_i: "work_cc_i",
      href: "/vendor/works",
    },
  ];

  return (
    <nav className="bg-secondary sticky top-0 z-50 text-primary-foreground">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-17 py-3">
          {/* Logo */}
          <Image
            src="/images/logo.png"
            alt="Nexus Logo"
            width={50}
            height={50}
            className="rounded-md"
          />

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md font-medium transition 
                    flex items-center gap-2
                    ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-white text-[#535353]"
                    }`}
                >
                  <FavIcon name={isActive ? item.icon_i : (item.icon as any)} />
                  <span className="text-[15px] 2xl:text-base">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/vendor/chat">
              <IconBox className="rounded-md">
                <FavIcon name="chat_cc" />
              </IconBox>
            </Link>

            <Link href="/vendor/notifications">
              <IconBox className="rounded-md">
                <FavIcon name="noti" />
              </IconBox>
            </Link>

            <Link href="/vendor/account">
              <div className="flex items-center gap-3">
                <Avatars
                  src=""
                  fallback="P"
                  alt="profile"
                  className="rounded-md"
                  fallbackStyle="rounded-md bg-white text-black"
                />
                <div className=" text-black leading-5 mb-1">
                  <p className="font-semibold">Elizabeth Olson</p>
                  <p>example@gmail.com</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 cursor-pointer rounded-lg transition"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2 animate-slideDown">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-black rounded-md text-sm font-medium transition 
                    ${isActive && "bg-primary text-white"}`}
                >
                  <FavIcon name={isActive ? item.icon_i : (item.icon as any)} />
                  {item.name}
                </Link>
              );
            })}

            {/* Mobile Profile */}
            <div className="py-3 border-t border-primary-foreground/20 mt-2">
              <div className="flex items-center gap-3">
                <Avatars
                  src=""
                  fallback="P"
                  className="rounded-md"
                  fallbackStyle="rounded-md bg-white text-black"
                  alt="profile"
                />
                <div className=" text-black leading-5 mb-1">
                  <p className="font-semibold">Elizabeth Olson</p>
                  <p>example@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
