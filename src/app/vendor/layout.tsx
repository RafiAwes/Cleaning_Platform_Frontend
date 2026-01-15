import Footer from "@/components/shared/Footer";
import VendorNav from "@/components/shared/vendor-nav";
import { childrenProps } from "@/types";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function VendorLayout({ children }: childrenProps) {
  return (
    <ProtectedRoute allowedRoles={["vendor"]}>
      <>
        <VendorNav />
        {children}
        <div className="mt-10">
          <Footer />
        </div>
      </>
    </ProtectedRoute>
  );
}
