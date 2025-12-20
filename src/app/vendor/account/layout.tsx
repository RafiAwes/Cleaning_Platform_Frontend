import SidebarNav from "@/components/common/super-dash/reuse/sideber-nav";
import { childrenProps } from "@/types";

export default function AccountLayout({ children }: childrenProps) {
  return (
    <div className="container mt-10">
      <div className="flex flex-1 flex-col lg:flex-row gap-4 space-x-10">
        <div className="block w-full lg:w-[280px] lg:shrink-0 lg:sticky  h-fit">
          <SidebarNav items={sidebarNavItems} defaultPath="/vendor/account" />
        </div>

        <div className="flex-1 border rounded-xl p-4">{children}</div>
      </div>
    </div>
  );
}

const sidebarNavItems = [
  {
    label: "Account",
    icon: "users_cc",
    act_io: "users_cc_i",
    to: "/vendor/account",
  },
  {
    label: "Change password",
    icon: "key_cc",
    act_io: "key_cc_ac",
    to: "/vendor/account/change-password",
  },
  {
    label: "balance",
    icon: "balance_cc",
    act_io: "balance_cc_ac",
    to: "/vendor/account/balance",
  },
];
