"use client";
import AdminNavTitle from "@/components/common/super-dash/reuse/admin-nav";
import SearchBox from "@/components/common/super-dash/reuse/search-box";
import { TableNoItem } from "@/components/reusable/table-no-item";
import { TableSkeleton } from "@/components/reusable/table-skeleton";
import { CustomTable } from "@/components/reusable/custom-table";
import { Pagination } from "@/components/reusable/pagination";
import SelectBox from "@/components/reusable/select-box";
import { TableCell, TableRow } from "@/components/ui";
import useConfirmation from "@/provider/confirmation";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reusable/avater";
import { useGlobalState } from "@/hooks";
import { DeleteBtn, PreviewBtn } from "@/components/reusable/btn";
import Modal from "@/components/reusable/modal";
import FavIcon from "@/favicon/favicon";

const data = [
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    packageOrdered: 20,
    totalSpent: 200,
    actions: {
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    packageOrdered: 20,
    totalSpent: 200,
    actions: {
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    packageOrdered: 20,
    totalSpent: 200,
    actions: {
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    packageOrdered: 20,
    totalSpent: 200,
    actions: {
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    packageOrdered: 20,
    totalSpent: 200,
    actions: {
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    packageOrdered: 20,
    totalSpent: 200,
    actions: {
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    packageOrdered: 20,
    totalSpent: 200,
    actions: {
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    packageOrdered: 20,
    totalSpent: 200,
    actions: {
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    packageOrdered: 20,
    totalSpent: 200,
    actions: {
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    avatar: "/images/avatar.png",
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    packageOrdered: 20,
    totalSpent: 200,
    actions: {
      view: true,
      edit: true,
      delete: true,
    },
  },
];

const intState = {
  page: 1,
  isPreview: false,
};

export default function Users() {
  const { confirm } = useConfirmation();
  const [global, updateGlobal] = useGlobalState(intState);
  const headers = ["Name", "Email", "Package ordered", "Total spent", "Action"];
  const isLoading = false;

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      title: "Delete user ?",
      description:
        "You are going to delete this user. After deleting, this user will no longer available in your platform",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div>
      <AdminNavTitle
        title="User management"
        subTitle="You can manage all the users of your platform from here"
      />
      <div className="flex flex-wrap space-y-3 lg:space-y-0 mt-2 items-center justify-between">
        <SearchBox onChange={(e) => console.log(e)} />
        <SelectBox
          placeholder="Filter"
          icon={true}
          options={[
            { label: "Most spent", value: "most_spent" },
            { label: "Least spent", value: "least_spent" },
            { label: "Most package ordered", value: "most_package_ordered" },
            { label: "Least package ordered", value: "least_package_ordered" },
          ]}
          triggerClassName="bg-secondary border border-none py-5"
        />
      </div>
      <CustomTable
        headers={headers}
        pagination={
          <ul className="flex items-center flex-wrap justify-between py-3">
            <li className="flex">
              Total:
              <sup className="font-medium text-2xl relative -top-3 px-2 ">
                500
              </sup>
              users
            </li>
            <li>
              <Pagination
                onPageChange={(v: any) => updateGlobal("page", v)}
                {...dummyJson.meta}
              />
            </li>
          </ul>
        }
      >
        {isLoading ? (
          <TableSkeleton colSpan={headers?.length} tdStyle="!pl-2" />
        ) : data?.length > 0 ? (
          data?.map((item, index) => (
            <TableRow key={index} className="border">
              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src={""}
                    fallback={item.name}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <span>{item.name}</span>
                </div>
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                {" "}
                <h5 className="ml-6">{item.packageOrdered}</h5>
              </TableCell>
              <TableCell>
                {" "}
                <h5 className="ml-4">{item.totalSpent}</h5>
              </TableCell>
              <TableCell>
                <ul className="flex gap-2">
                  <li>
                    <PreviewBtn
                      onClick={() => updateGlobal("isPreview", true)}
                    />
                  </li>
                  <li>
                    <DeleteBtn onClick={() => handleDelete("4343")} />
                  </li>
                </ul>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableNoItem
            colSpan={headers?.length}
            title="No users are available at the moment"
            tdStyle="!bg-background"
          />
        )}
      </CustomTable>
      {/* ============== preview modal ============== */}
      <Modal
        open={global.isPreview}
        setIsOpen={(v: any) => updateGlobal("isPreview", v)}
        title="User Details"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between bg-secondary gap-2 p-2 rounded-xl">
            <div className="flex items-center gap-2">
              <Avatars
                src={""}
                fallback={"Julfiker"}
                alt="profile"
                fallbackStyle="aStyle"
              />
              <ul className="leading-5 mb-1">
                <li className="font-semibold">Md. Abid Hasan</li>
                <li className="text-figma-a_gray">example@gmail.com</li>
              </ul>
            </div>
            <DeleteBtn
              className="bg-white"
              onClick={() => handleDelete("4343")}
            />
          </div>
          <div className="bg-secondary flex items-center space-x-2 py-5 px-3  rounded-xl">
            <FavIcon name="location_cc" />{" "}
            <h1>
              70 Washington Square South, New York, NY 10012, United States
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <EventCardSm icon="pc_or_cc" title="Package ordered" value="16" />
            <EventCardSm icon="total_sp_cc" title="Total spent" value="$1200" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

function EventCardSm({ icon, title, value }: any) {
  return (
    <div className="flex *:text-black items-center bg-secondary p-3 rounded-xl gap-2 text-muted-foreground">
      <span className="bg-white size-12 rounded-full grid place-items-center">
        {" "}
        <FavIcon name={icon} />
      </span>
      <div className="flex flex-col">
        <span className="text-base leading-4">{title}</span>
        <span className="text-xl font-medium">{value}</span>
      </div>
    </div>
  );
}
