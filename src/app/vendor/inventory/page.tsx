"use client";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reusable/avater";
import { DeleteBtn, PreviewBtn } from "@/components/reusable/btn";
import { FromInput } from "@/components/reusable/form-input";
import Form from "@/components/reusable/from";
import Modal2 from "@/components/reusable/modal2";
import { Pagination } from "@/components/reusable/pagination";
import SelectBox from "@/components/reusable/select-box";
import { TableNoItem } from "@/components/reusable/table-no-item";
import { TableSkeleton } from "@/components/reusable/table-skeleton";
import { VendorTable } from "@/components/reusable/vendor-table";
import { Button, Label, TableCell, TableRow } from "@/components/ui";
import FavIcon from "@/favicon/favicon";
import { useModalState } from "@/hooks";
import { useFileUpload } from "@/hooks/useFileUpload";
import { PlaceholderImg } from "@/lib";
import useConfirmation from "@/provider/confirmation";
import { Plus, X } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { ImgBox } from "@/components/reusable/Img-box";

const data = [
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
    quantity: "5",
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
    quantity: "5",
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
    quantity: "5",
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
    quantity: "5",
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
    quantity: "5",
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
    quantity: "5",
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
    quantity: "5",
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
    quantity: "5",
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
    quantity: "5",
  },
  {
    service: "House cleaning service for residential areas in New York City.",
    price: "$250",
    avatar: "/images/avatar.png",
    userName: "John Doe",
    userEmail: "example@gmail.com",
    dateTime: "10th Nov, 2025 at 05:30 PM",
    actionLink: true,
    assigned: {
      name: "John Doe",
      avatar: "/images/avatar.png",
      phone: "+564289653541",
    },
    quantity: "5",
  },
];

const intState = {
  isAdd: false,
  isPreview: false,
};

export default function Inventory() {
  const [state, setState] = useModalState(intState);
  const { confirm } = useConfirmation();
  const headers = ["Product", "Quantity", "Last updated", "Action"];

  const isLoading = false;

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      title: "Delete Inventory ?",
      description:
        "You are going to delete this Inventory. After deleting, this Inventory will no longer available in your platform",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div className="container mt-5">
      <div>
        <ul className="flex items-center flex-wrap gap-5 justify-between">
          <li className="hidden lg:opacity-0">0</li>
          <li className="text-xl font-semibold">Inventory Management</li>
          <li className="flex items-center gap-5">
            <SelectBox
              placeholder="Filter"
              icon={true}
              defaultValue="all"
              options={[
                { label: "All", value: "all" },
                { label: "Out of stock", value: "out_of_stock" },
                { label: "Huge quantity", value: "huge_quantity" },
                {
                  label: "Medium quantity",
                  value: "medium_quantity",
                },
                {
                  label: "Very low quantity",
                  value: "very_low_quantity",
                },
              ]}
              triggerClassName="bg-secondary border border-none py-5"
            />
            <Button
              onClick={() => setState("isAdd", true)}
              className="rounded-sm"
            >
              <Plus />
              Add New Product
            </Button>
          </li>
        </ul>
      </div>
      <VendorTable
        headers={headers}
        pagination={
          <ul className="flex items-center flex-wrap justify-between py-3">
            <li className="flex">
              Total:
              <sup className="font-medium text-2xl relative -top-3 px-2 ">
                500
              </sup>
              Inventory
            </li>
            <li>
              <Pagination
                onPageChange={(v: any) => console.log("")}
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
                    fallback={item.userName}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <div>
                    <h1 className="text-lg">{item.userName}</h1>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <h1 className="ml-5">{item.quantity}</h1>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <FavIcon name="calender_cc" />
                  <span className="text-figma-gray ml-1">{item.dateTime}</span>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center space-x-3">
                  <PreviewBtn
                    onClick={() => setState("isPreview", true)}
                    className="bg-white"
                  />
                  <DeleteBtn
                    onClick={() => handleDelete("12345")}
                    className="bg-white"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableNoItem
            colSpan={headers?.length}
            title="No Order are available at the moment"
            tdStyle="!bg-background"
          />
        )}
      </VendorTable>
      {/*  =========== add =============== */}
      <Modal2
        open={state.isAdd}
        setIsOpen={(v) => setState("isAdd", v)}
        title="Add New Product"
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <div
          onClick={() => setState("isAdd", false)}
          className="absolute cursor-pointer top-3 right-4"
        >
          <X />
        </div>
        <AddNewProduct />
      </Modal2>
      {/*  =========== ProductDetails =============== */}
      <Modal2
        open={state.isPreview}
        setIsOpen={(v) => setState("isPreview", v)}
        title="Product Details"
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <div
          onClick={() => setState("isPreview", false)}
          className="absolute cursor-pointer top-3 right-4"
        >
          <X />
        </div>
        <ProductDetails />
      </Modal2>
    </div>
  );
}

//  =====================  AddNewProduct ===============
function AddNewProduct() {
  const [{ files }, { getInputProps, openFileDialog, clearFiles }] =
    useFileUpload({
      accept: "image/*",
    });

  const form = useForm({
    defaultValues: {
      title: "",
      quantity: "",
    },
  });

  const handleProfileSubmit = async (values: FieldValues) => {
    const value = {
      name: values.name,
      ...(files[0]?.file && { image: files[0]?.file }),
    };

    console.log("Submitted Data:", value);
  };

  return (
    <Form from={form} className="space-y-6" onSubmit={handleProfileSubmit}>
      <Label
        htmlFor="image"
        className="relative mx-auto w-full border border-dashed h-[200px] rounded-md border-primary cursor-pointer"
      >
        {files[0]?.preview ? (
          <ImgBox
            src={files[0]?.preview || PlaceholderImg() || "/blur.png"}
            alt="img"
            className="w-full h-full object-cover rounded-md"
          >
            <div className="size-10 grid place-items-center absolute rounded-md bg-white/20 backdrop-blur-[20px] right-4 top-4">
              <FavIcon name="upload_cc" />
            </div>
          </ImgBox>
        ) : (
          <div className="text-center mx-auto">
            <p className="text-blacks mb-2 text-sm">Upload Inventory Image</p>
            <p className="text-gray-400 font-medium mb-4 text-xs">Or</p>

            <Button onClick={openFileDialog} type="button">
              Browse files
            </Button>
          </div>
        )}

        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
          id="image"
        />
      </Label>

      <FromInput
        label="Product title"
        name="title"
        placeholder="Product title goes here"
        className="h-11 rounded-xl bg-secondary placeholder:text-muted-foreground"
      />
      <FromInput
        label="Quantity"
        name="quantity"
        placeholder="00"
        className="h-11 rounded-xl bg-secondary placeholder:text-muted-foreground [&::-webkit-inner-spin-button]:appearance-auto!"
        type="number"
      />

      <Button size="lg" className="rounded-md w-full" type="submit">
        Add
      </Button>
    </Form>
  );
}

//  =====================  ProductDetails ===============
function ProductDetails() {
  const [{ files }, { getInputProps, clearFiles }] = useFileUpload({
    accept: "image/*",
  });

  const form = useForm({
    defaultValues: {
      title: "Lorem ipsum dolor sit amet ",
      quantity: "500",
    },
  });

  const handleProfileSubmit = async (values: FieldValues) => {
    const value = {
      name: values.name,
      ...(files[0]?.file && { image: files[0]?.file }),
    };

    console.log("Submitted Data:", value);
  };

  return (
    <Form from={form} className="space-y-6" onSubmit={handleProfileSubmit}>
      <Label
        htmlFor="image"
        className="relative mx-auto w-full border border-dashed h-[200px] rounded-md border-primary cursor-pointer"
      >
        <ImgBox
          src={files[0]?.preview || PlaceholderImg() || "/blur.png"}
          alt="img"
          className="w-full h-full object-cover rounded-md"
        >
          <div className="size-10 grid place-items-center absolute rounded-md bg-white/20 backdrop-blur-[20px] right-4 top-4">
            <FavIcon name="upload_cc" />
          </div>
        </ImgBox>

        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
          id="image"
        />
      </Label>

      <FromInput
        label="Product title"
        name="title"
        placeholder="Product title goes here"
        className="h-11 rounded-xl bg-secondary"
      />
      <FromInput
        label="Quantity"
        name="quantity"
        placeholder="00"
        className="h-11 rounded-xl bg-secondary [&::-webkit-inner-spin-button]:appearance-auto!"
        type="number"
      />

      <Button size="lg" className="rounded-md w-full" type="submit">
        Save Changes
      </Button>
    </Form>
  );
}
