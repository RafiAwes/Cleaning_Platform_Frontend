import AdminNavTitle from "@/components/common/super-dash/reuse/admin-nav";
import SidebarNav from "@/components/common/super-dash/reuse/sideber-nav";
import { childrenProps } from "@/types";

export default function SettingsLayout({ children }: childrenProps) {
  return (
    <div>
      <AdminNavTitle
        title="Settings"
        subTitle="You can manage all the settings of your platform from here."
      />
      <div className="flex flex-1 flex-col lg:flex-row gap-4 space-x-10">
        <div className="block w-full lg:w-[280px] lg:shrink-0 lg:sticky top-24 h-fit">
          <SidebarNav items={sidebarNavItems} defaultPath="/admin/settings" />
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
    to: "/admin/settings",
  },
  {
    label: "Change password",
    icon: "key_cc",
    act_io: "key_cc_ac",
    to: "/admin/settings/change-password",
  },
  {
    label: "About us",
    icon: "about_cc",
    act_io: "about_cc_ac",
    to: "/admin/settings/about-us",
  },
  {
    label: "FAQ",
    icon: "fqa_cc",
    act_io: "fqa_cc_ac",
    to: "/admin/settings/faq",
  },
  {
    label: "Privacy policy",
    icon: "privacy_cc",
    act_io: "privacy_cc_ac",
    to: "/admin/settings/privacy-policy",
  },
  {
    label: "Terms & Conditions",
    icon: "terms_cc",
    act_io: "terms_cc_ac",
    to: "/admin/settings/terms-conditions",
  },
];
