"use client";
import SidebarNav from "@/components/common/super-dash/reuse/sideber-nav";
import { DblogoutIcon } from "@/icon";
import LogoutButton from "./logout-button";
import { ReactNode } from "react";
import ProtectedRoute from "@/components/common/ProtectedRoute";

interface AccountLayoutProps {
  children: ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <ProtectedRoute allowedRoles={["customer", "user", "vendor", "admin"]} redirectTo="/auth">
      <div className="container px-4 ">
        <div className="pt-6 xl:pt-10 pb-10">
          <div className="flex flex-1 flex-col lg:flex-row gap-4  ">
            <div className="block w-full lg:w-[300px] lg:shrink-0 top-24 h-fit ">
              <SidebarNav items={sidebarNavItems} defaultPath="/account" />
              <div className="px-2">
                <LogoutButton />
              </div>
            </div>
            <div className="flex-1 border rounded-xl p-4">{children}</div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};
const sidebarNavItems = [
  {
    label: "Account",
    icon: "users_cc",
    act_io: "users_dc_i",
    to: "/account",
  },
  {
    label: "Change password",
    icon: "key_cc",
    act_io: "key_dc_i",
    to: "/account/change-password",
  },
  {
    label: "Bookings",
    icon: "booking_cc",
    act_io: "booking_cc_i",
    to: "/account/booking",
  },
  {
    label: "Payments",
    icon: "payment_dc",
    act_io: "payment_dc_i",
    to: "/account/payment",
  },
];
export default AccountLayout;
