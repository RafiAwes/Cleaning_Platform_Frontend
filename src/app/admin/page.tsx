import AdminNavTitle from "@/components/common/super-dash/reuse/admin-nav";
import { BookingStatistics } from "@/components/common/super-dash/reuse/booking-chart";
import StatisticsChart from "@/components/common/super-dash/reuse/statistics-chart";
import SelectBox from "@/components/reusable/select-box";
import FavIcon from "@/favicon/favicon";

const totalStash = [
  {
    title: "Total user",
    value: 1200,
    icon: "users_cc",
  },
  {
    title: "Total Vendors",
    value: 300,
    icon: "vendors_cc",
  },
  {
    title: "Total bookings",
    value: 17000,
    icon: "bookings_cc",
  },
];

export default function AdminPage() {
  return (
    <div className="mb-10">
      <AdminNavTitle
        title="Dashboard"
        subTitle="Your overall dashboard overview. See the statistics, analytics and manage them"
      />
      <div className="bg-secondary p-5 rounded-xl">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-1 lg:col-span-2 p-4 relative">
            <ul className="lg:absolute bottom-0 left-0">
              <li className="font-semibold text-[28px]">Hello Abid!</li>
              <li className="text-figma-a_gray">
                Track and manage your application from here
              </li>
            </ul>
          </div>
          {totalStash.map((item, index) => (
            <StatsCard key={index} {...item} />
          ))}
        </div>
      </div>
      <div className="mt-10 space-y-10">
        <div>
          <div className="flex items-center justify-between flex-wrap mb-4">
            <h2 className="text-2xl font-medium">
              User and vendor registration statistics
            </h2>
            <SelectBox
              defaultValue="weekly"
              triggerClassName="w-[100px]"
              options={[
                { label: "Weekly", value: "weekly" },
                { label: "Monthly", value: "monthly" },
                { label: "Yearly", value: "yearly" },
              ]}
            />
          </div>
          <StatisticsChart />
        </div>
        <div>
          <div className="flex items-center justify-between flex-wrap mb-4">
            <h2 className="text-2xl font-medium">
              User and vendor registration statistics
            </h2>
            <SelectBox
              defaultValue="weekly"
              triggerClassName="w-[100px]"
              options={[
                { label: "Weekly", value: "weekly" },
                { label: "Monthly", value: "monthly" },
                { label: "Yearly", value: "yearly" },
              ]}
            />
          </div>

          <BookingStatistics />
        </div>
      </div>
    </div>
  );
}

export function StatsCard({ icon, title, value }: any) {
  return (
    <ul className="bg-white p-4  rounded-xl">
      <li className="size-[50px]  grid rounded-xl place-items-center  bg-black">
        <FavIcon
          stroke={icon == "users_cc" || "bookings_cc" ? "#fff" : ""}
          color={icon == "vendors_cc" ? "#fff" : ""}
          name={icon as any}
        />
      </li>
      <li className="text-figma-gray mt-2">{title}</li>
      <li className="font-bold text-xl leading-9 lg:text-[28px]">{value}</li>
    </ul>
  );
}
