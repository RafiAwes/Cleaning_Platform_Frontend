"use client";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reusable/avater";
import { DeleteBtn, EditBtn, PreviewBtn } from "@/components/reusable/btn";
import { FromInput } from "@/components/reusable/form-input";
import Form from "@/components/reusable/from";
import Modal2 from "@/components/reusable/modal2";
import { Pagination } from "@/components/reusable/pagination";
import { TableNoItem } from "@/components/reusable/table-no-item";
import { TableSkeleton } from "@/components/reusable/table-skeleton";
import { VendorTable } from "@/components/reusable/vendor-table";
import { Button, Label, TableCell, TableRow } from "@/components/ui";
import { useModalState } from "@/hooks";
import { useFileUpload } from "@/hooks/useFileUpload";
import { helpers, PlaceholderImg } from "@/lib";
import useConfirmation from "@/provider/confirmation";
import { Plus, X } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { ImgBox } from "@/components/reusable/Img-box";
import SearchBox from "@/components/common/super-dash/reuse/search-box";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import profile from "@/assets/profile.png";
import Link from "next/link";
import { EditStuff } from "@/components/common/edit-stuff";

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
    address: "New York, NY 10001",
    status: "assigned",
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
    address: "New York, NY 10001",
    status: "assigned",
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
    address: "New York, NY 10001",
    status: "available",
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
    address: "New York, NY 10001",
    status: "available",
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
    address: "New York, NY 10001",
    status: "available",
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
    address: "New York, NY 10001",
    status: "assigned",
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
    address: "New York, NY 10001",
    status: "available",
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
    address: "New York, NY 10001",
    status: "available",
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
    address: "New York, NY 10001",
    status: "assigned",
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
    address: "New York, NY 10001",
    status: "available",
  },
];

const intState = {
  isAdd: false,
  isEdit: false,
  isPreview: false,
};

export default function Stuffs() {
  const [state, setState] = useModalState(intState);
  const { confirm } = useConfirmation();
  const headers = ["Stuff Name", "Phone Number", "Address", "Status", "Action"];

  const isLoading = false;

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      title: "Delete Stuffs ?",
      description:
        "You are going to delete this Stuffs. After deleting, this Stuffs will no longer available in your platform",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div className="container mt-5">
      <div>
        <ul className="flex items-center flex-wrap gap-5 justify-between">
          <li>
            <SearchBox
              className="rounded-md lg:min-w-xl!"
              onChange={(v) => console.log(v)}
              placeholder="Search by stuff name"
              leftBtn={true}
              rightBtn={false}
            />
          </li>
          <li>
            <Button
              onClick={() => setState("isAdd", true)}
              className="rounded-sm"
            >
              <Plus />
              Add New Stuff
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
              Shifts
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
                <h1 className="ml-5">{item.assigned.phone}</h1>
              </TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>
                {
                  <Badge variant={helpers.lowerCase(item.status) as any}>
                    {helpers.capitalize(item.status)}
                  </Badge>
                }
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Link href={`/vendor/stuffs/123`}>
                    <PreviewBtn className="bg-white" />
                  </Link>
                  <EditBtn
                    onClick={() => setState("isEdit", true)}
                    color="#000"
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
            title="No Stuffs are available at the moment"
            tdStyle="!bg-background"
          />
        )}
      </VendorTable>
      {/*  =========== add =============== */}
      <Modal2
        open={state.isAdd}
        setIsOpen={(v) => setState("isAdd", v)}
        title="Add Stuff"
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <div
          onClick={() => setState("isAdd", false)}
          className="absolute cursor-pointer top-3 right-4"
        >
          <X />
        </div>
        <AddNewStuff />
      </Modal2>
      {/*  =========== ProductDetails =============== */}
      <Modal2
        open={state.isEdit}
        setIsOpen={(v) => setState("isEdit", v)}
        title="Edit Stuff"
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <div
          onClick={() => setState("isEdit", false)}
          className="absolute cursor-pointer top-3 right-4"
        >
          <X />
        </div>
        <EditStuff />
      </Modal2>
    </div>
  );
}

//  =====================  AddNewProduct ===============
function AddNewStuff() {
  const [{ files }, { getInputProps, openFileDialog, clearFiles }] =
    useFileUpload({
      accept: "image/*",
    });

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
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
      <Label htmlFor="image" className="relative mx-auto size-28 rounded-full">
        <Image
          src={files[0]?.preview || PlaceholderImg() || "/blur.png"}
          alt={"title"}
          fill
          className={"object-cover rounded-full"}
        />
        <div className="grid place-items-center shadow-md  rounded-full absolute bottom-0 -right-2 cursor-pointer">
          <picture>
            <img className="size-10" src={profile.src} alt="profile" />
          </picture>
        </div>
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
          id="image"
        />
      </Label>

      <FromInput
        label="Name"
        name="name"
        placeholder="Stuff name"
        className="h-11 rounded-xl bg-secondary placeholder:text-muted-foreground"
      />
      <FromInput
        label="Phone number"
        name="phone"
        placeholder="Stuff phone number"
        className="h-11 rounded-xl bg-secondary placeholder:text-muted-foreground [&::-webkit-inner-spin-button]:appearance-auto!"
        type="number"
      />
      <FromInput
        label="Address"
        name="address"
        placeholder="Stuff address"
        className="h-11 rounded-xl bg-secondary placeholder:text-muted-foreground"
      />

      <Button size="lg" className="rounded-md w-full" type="submit">
        Add
      </Button>
    </Form>
  );
}

//  =====================  ProductDetails ===============
