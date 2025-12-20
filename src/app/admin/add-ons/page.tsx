"use client";
import AdminNavTitle from "@/components/common/super-dash/reuse/admin-nav";
import SearchBox from "@/components/common/super-dash/reuse/search-box";
import { TableNoItem } from "@/components/reusable/table-no-item";
import { TableSkeleton } from "@/components/reusable/table-skeleton";
import { CustomTable } from "@/components/reusable/custom-table";
import { Pagination } from "@/components/reusable/pagination";
import { Button, TableCell, TableRow } from "@/components/ui";
import { DeleteBtn, PreviewBtn } from "@/components/reusable/btn";
import { FromInput } from "@/components/reusable/form-input";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useConfirmation from "@/provider/confirmation";
import { dummyJson } from "@/components/dummy-json";
import Modal2 from "@/components/reusable/modal2";
import Form from "@/components/reusable/from";
import { useGlobalState } from "@/hooks";
import FavIcon from "@/favicon/favicon";
import { Plus, X } from "lucide-react";
import { new_addOn } from "@/lib";

const data = [
  {
    addOnName: "Add-on name",
    createdDate: "10th Nov, 2025 at 05:30 PM",
    usedBy: 25,
    actions: {
      edit: true,
      delete: true,
    },
  },
  {
    addOnName: "Add-on name",
    createdDate: "10th Nov, 2025 at 05:30 PM",
    usedBy: 25,
    actions: {
      edit: true,
      delete: true,
    },
  },
  {
    addOnName: "Add-on name",
    createdDate: "10th Nov, 2025 at 05:30 PM",
    usedBy: 25,
    actions: {
      edit: true,
      delete: true,
    },
  },
  {
    addOnName: "Add-on name",
    createdDate: "10th Nov, 2025 at 05:30 PM",
    usedBy: 25,
    actions: {
      edit: true,
      delete: true,
    },
  },
  {
    addOnName: "Add-on name",
    createdDate: "10th Nov, 2025 at 05:30 PM",
    usedBy: 25,
    actions: {
      edit: true,
      delete: true,
    },
  },
  {
    addOnName: "Add-on name",
    createdDate: "10th Nov, 2025 at 05:30 PM",
    usedBy: 25,
    actions: {
      edit: true,
      delete: true,
    },
  },
  {
    addOnName: "Add-on name",
    createdDate: "10th Nov, 2025 at 05:30 PM",
    usedBy: 25,
    actions: {
      edit: true,
      delete: true,
    },
  },
  {
    addOnName: "Add-on name",
    createdDate: "10th Nov, 2025 at 05:30 PM",
    usedBy: 25,
    actions: {
      edit: true,
      delete: true,
    },
  },
  {
    addOnName: "Add-on name",
    createdDate: "10th Nov, 2025 at 05:30 PM",
    usedBy: 25,
    actions: {
      edit: true,
      delete: true,
    },
  },
  {
    addOnName: "Add-on name",
    createdDate: "10th Nov, 2025 at 05:30 PM",
    usedBy: 25,
    actions: {
      edit: true,
      delete: true,
    },
  },
];
const intState = {
  page: 1,
  isAdd: false,
  isEdit: false,
};

export default function AddOn() {
  const { confirm } = useConfirmation();
  const [global, updateGlobal] = useGlobalState(intState);
  const headers = ["Add-on name", "Created date", "Used by", "Action"];

  // == add on ==
  const from = useForm({
    resolver: zodResolver(new_addOn),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };
  // == addon edit ==
  const from2 = useForm({
    resolver: zodResolver(new_addOn),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit2 = async (values: FieldValues) => {
    console.log(values);
  };

  const isLoading = false;

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      title: "Delete add-on ?",
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
        title="Add-on Management"
        subTitle="You can manage all the add-ons of your platform from here"
      />
      <div className="flex flex-wrap space-y-3 lg:space-y-0 mt-2 items-center justify-between">
        <SearchBox onChange={(e) => console.log(e)} />
        <Button onClick={() => updateGlobal("isAdd", true)} size="lg">
          <Plus />
          Add more
        </Button>
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
              add-ons
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
                <div className="flex items-center">
                  <div className="bg-primary/10 grid   place-items-center size-9 rounded-full">
                    <FavIcon className="size-5" name="add_ons_cc" />
                  </div>
                  <span className="ml-2">{item.addOnName}</span>
                </div>
              </TableCell>
              <TableCell>{item.createdDate}</TableCell>
              <TableCell>
                <h1 className="ml-6">{item.usedBy}</h1>
              </TableCell>
              <TableCell>
                <ul className="flex gap-2">
                  <li>
                    <PreviewBtn onClick={() => updateGlobal("isEdit", true)} />
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
      {/* ============== add on  ============== */}
      <Modal2
        open={global.isAdd}
        setIsOpen={(v: any) => updateGlobal("isAdd", v)}
        title="Add New add-on"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <div
          className="absolute top-3 right-4 cursor-pointer"
          onClick={() => updateGlobal("isAdd", false)}
        >
          <X className="text-black" />
        </div>
        <Form className="space-y-4" from={from} onSubmit={handleSubmit}>
          <FromInput
            className="h-10 bg-secondary rounded-[16px]"
            label="Add-on name"
            name="name"
            placeholder="Enter Your Add-on name"
          />
          <Button size="lg" className="w-full">
            Add
          </Button>
        </Form>
      </Modal2>

      {/* ============== addon edit  ============== */}
      <Modal2
        open={global.isEdit}
        setIsOpen={(v: any) => updateGlobal("isEdit", v)}
        title="Edit add-on"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <div
          className="absolute top-3 right-4 cursor-pointer"
          onClick={() => updateGlobal("isEdit", false)}
        >
          <X className="text-black" />
        </div>
        <Form className="space-y-4" from={from2} onSubmit={handleSubmit2}>
          <FromInput
            className="h-10 bg-secondary rounded-[16px]"
            label="Add-on name"
            name="name"
            placeholder="Enter Your Add-on name"
          />
          <Button size="lg" className="w-full">
            Save Changes
          </Button>
        </Form>
      </Modal2>
    </div>
  );
}
