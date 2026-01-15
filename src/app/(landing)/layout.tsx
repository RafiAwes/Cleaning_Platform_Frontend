"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import SubNav from "@/components/shared/Sub-Nav";
import { childrenProps } from "@/types";
import { usePathname } from "next/navigation";

export default function LandingPageLayout({ children }: childrenProps) {
  const pathname = usePathname();
  const subNavRouteShow = ["/"];
  const isShowSubNav = subNavRouteShow.includes(pathname);

  return (
    <>
      <div className=" flex flex-col">
        {isShowSubNav && <SubNav />}
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
