import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { childrenProps } from "@/types";

export default function LandingPageLayout({ children }: childrenProps) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
