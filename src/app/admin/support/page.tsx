"use client";
import AdminNavTitle from "@/components/common/super-dash/reuse/admin-nav";
import SearchBox from "@/components/common/super-dash/reuse/search-box";
import { DeleteBtn, PreviewBtn } from "@/components/reusable/btn";
import { CustomTable } from "@/components/reusable/custom-table";
import { Pagination } from "@/components/reusable/pagination";
import { TableNoItem } from "@/components/reusable/table-no-item";
import { TableSkeleton } from "@/components/reusable/table-skeleton";
import { Button, Label, TableCell, TableRow, Textarea } from "@/components/ui";
import useConfirmation from "@/provider/confirmation";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reusable/avater";
import { useModalState } from "@/hooks";
import { useState } from "react";
import Modal2 from "@/components/reusable/modal2";
import FavIcon from "@/favicon/favicon";
import { X } from "lucide-react";

const data = [
  {
    user_vendor: "Elizabeth Olson",
    email: "example@gmail.com",
    time: "10th Nov, 2025 at 05:30 PM",
    actions: [
      { type: "View/Info", icon: "info" },
      { type: "Delete", icon: "delete" },
    ],
  },
  {
    user_vendor: "Elizabeth Olson",
    email: "example@gmail.com",
    time: "10th Nov, 2025 at 05:30 PM",
    actions: [
      { type: "View/Info", icon: "info" },
      { type: "Delete", icon: "delete" },
    ],
  },
  {
    user_vendor: "Elizabeth Olson",
    email: "example@gmail.com",
    time: "10th Nov, 2025 at 05:30 PM",
    actions: [
      { type: "View/Info", icon: "info" },
      { type: "Delete", icon: "delete" },
    ],
  },
  {
    user_vendor: "Elizabeth Olson",
    email: "example@gmail.com",
    time: "10th Nov, 2025 at 05:30 PM",
    actions: [
      { type: "View/Info", icon: "info" },
      { type: "Delete", icon: "delete" },
    ],
  },
  {
    user_vendor: "Elizabeth Olson",
    email: "example@gmail.com",
    time: "10th Nov, 2025 at 05:30 PM",
    actions: [
      { type: "View/Info", icon: "info" },
      { type: "Delete", icon: "delete" },
    ],
  },
  {
    user_vendor: "Elizabeth Olson",
    email: "example@gmail.com",
    time: "10th Nov, 2025 at 05:30 PM",
    actions: [
      { type: "View/Info", icon: "info" },
      { type: "Delete", icon: "delete" },
    ],
  },
  {
    user_vendor: "Elizabeth Olson",
    email: "example@gmail.com",
    time: "10th Nov, 2025 at 05:30 PM",
    actions: [
      { type: "View/Info", icon: "info" },
      { type: "Delete", icon: "delete" },
    ],
  },
  {
    user_vendor: "Elizabeth Olson",
    email: "example@gmail.com",
    time: "10th Nov, 2025 at 05:30 PM",
    actions: [
      { type: "View/Info", icon: "info" },
      { type: "Delete", icon: "delete" },
    ],
  },
  {
    user_vendor: "Elizabeth Olson",
    email: "example@gmail.com",
    time: "10th Nov, 2025 at 05:30 PM",
    actions: [
      { type: "View/Info", icon: "info" },
      { type: "Delete", icon: "delete" },
    ],
  },
  {
    user_vendor: "Elizabeth Olson",
    email: "example@gmail.com",
    time: "10th Nov, 2025 at 05:30 PM",
    actions: [
      { type: "View/Info", icon: "info" },
      { type: "Delete", icon: "delete" },
    ],
  },
];
const initState = {
  isPreview: false,
  isReplay: false,
};

export default function Support() {
  const { confirm } = useConfirmation();
  const [state, setState] = useModalState(initState);
  const [isPage, setIsPage] = useState(1);
  const headers = ["User / Vendor", "Email", "Time", "Action"];
  const isLoading = false;

  const handleDelete = async (id: string) => {
    const con = await confirm({
      title: "Delete message ?",
      description:
        "After deleting, you won't be able to find this message anymore",
    });
    if (con) {
      console.log(id);
    }
  };

  return (
    <div>
      <AdminNavTitle
        title="Support"
        subTitle="You can manage all the support messages of your platform from here"
      />
      <div className="flex flex-wrap space-y-3 lg:space-y-0 mt-2 items-center justify-between">
        <SearchBox placeholder="Search hare" onChange={(e) => console.log(e)} />
      </div>
      <CustomTable
        headers={headers}
        pagination={
          <ul className="flex items-center flex-wrap justify-between py-3">
            <li className="flex">
              Total:
              <sup className="font-medium text-2xl relative -top-3 px-2 ">
                50
              </sup>
              messages
            </li>
            <li>
              <Pagination
                onPageChange={(v: any) => setIsPage(v)}
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
                    fallback={item.user_vendor}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <span>{item.user_vendor}</span>
                </div>
              </TableCell>

              <TableCell>{item.email}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>
                <ul className="flex gap-2">
                  <li>
                    <PreviewBtn onClick={() => setState("isPreview", true)} />
                  </li>
                  <li>
                    <DeleteBtn onClick={() => handleDelete("12345")} />
                  </li>
                </ul>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableNoItem
            colSpan={headers?.length}
            title="No messages are available at the moment"
            tdStyle="!bg-background"
          />
        )}
      </CustomTable>

      {/* ============ Preview Modal=========== */}
      <Modal2
        open={state.isPreview}
        setIsOpen={(v) => setState("isPreview", v)}
        title="Support Details"
        titleStyle="text-center"
        className="sm:max-w-2xl"
      >
        <div
          className="absolute top-3 right-5 cursor-pointer"
          onClick={() => {
            setState("isPreview", false);
            const timeout = setTimeout(() => {
              setState("isReplay", false);
            }, 200);
            return () => clearTimeout(timeout);
          }}
        >
          <X className="text-black" />
        </div>
        {state.isReplay ? (
          <div className="space-y-4">
            <div>
              <Label>Write your message here</Label>
              <Textarea
                className="resize-none min-h-30   mt-3  bg-secondary border-none"
                placeholder="Write additional note"
              />
            </div>

            <Button className="w-full">Send</Button>
          </div>
        ) : (
          <div className="p-1 space-y-3">
            <div className="border flex justify-between bg-secondary border-none items-center rounded-xl px-2 py-3">
              <div className="flex items-center space-x-2">
                <Avatars
                  src={""}
                  fallback={"T"}
                  alt="profile"
                  fallbackStyle="aStyle"
                />
                <div className="leading-5">
                  <h1>Elizabeth Olson</h1>
                  <h1 className="text-secondery-figma">
                    Sent support message 12 times
                  </h1>
                </div>
              </div>
              <div
                onClick={() => handleDelete("55")}
                className="bg-white cursor-pointer size-10 grid place-items-center rounded-md"
              >
                <FavIcon name="delete_cc" className="size-5" />
              </div>
            </div>
            <div className="bg-secondary rounded-xl p-5">
              <p className="text-fimga-secondery">
                Lorem ipsum dolor sit amet consectetur. Purus pellentesque lorem
                duis cras vel quam tellus. Amet egestas arcu volutpat velit
                turpis vitae. Lectus elit a tellus et fermentum pulvinar ornare.
                Orci amet faucibus volutpat nibh ultricies et est. Duis nibh
                aliquet amet mauris id. In libero est nisi venenatis eget nisl
                mi. Dui fermentum aliquam ullamcorper malesuada.
              </p>
            </div>
            <Button
              onClick={() => setState("isReplay", true)}
              className="w-full"
              size="lg"
            >
              Reply
            </Button>
          </div>
        )}
      </Modal2>
    </div>
  );
}
