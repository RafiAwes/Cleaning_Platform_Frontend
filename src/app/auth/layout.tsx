import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { childrenProps } from "@/types";

export default function AuthLayout({ children }: childrenProps) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
