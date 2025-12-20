import Footer from "@/components/shared/Footer";
import VendorNav from "@/components/shared/vendor-nav";
import { childrenProps } from "@/types";

export default function VendorLayout({ children }: childrenProps) {
  return (
    <>
      <VendorNav />
      {children}
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
}
