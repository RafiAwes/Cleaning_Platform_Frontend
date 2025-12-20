"use client";
import { EditStuff } from "@/components/common/edit-stuff";
import Avatars from "@/components/reusable/avater";
import { DeleteBtn, EditBtn } from "@/components/reusable/btn";
import IconBox from "@/components/reusable/Icon-box";
import Modal2 from "@/components/reusable/modal2";
import { TableNoItem } from "@/components/reusable/table-no-item";
import { TableSkeleton } from "@/components/reusable/table-skeleton";
import { VendorTable } from "@/components/reusable/vendor-table";
import { TableCell, TableRow } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import FavIcon from "@/favicon/favicon";
import useConfirmation from "@/provider/confirmation";
import { X } from "lucide-react";
import { useState } from "react";

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

export default function StuffDetails() {
  const { confirm } = useConfirmation();
  const [isEdit, setIsEdit] = useState(false);

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
  const isLoading = false;
  return (
    <div className="container mt-10">
      <h1 className="text-xl lg:text-2xl text-center font-semibold">
        Stuff Details
      </h1>
      <div className="bg-secondary flex justify-between items-center flex-wrap p-4 mt-10 rounded-md">
        <div className="flex items-center gap-3">
          <Avatars
            src={""}
            fallback={"S"}
            alt="profile"
            fallbackStyle="aStyle rounded-md"
            className="rounded-md"
          />
          <div>
            <h1 className="text-lg">Stuff name</h1>
          </div>
        </div>
        <h3>+23658954632</h3>
        <h2>Stuff location goes here</h2>
        <div className="flex items-center space-x-2">
          <EditBtn
            onClick={() => setIsEdit(true)}
            color="#000"
            className="bg-white"
          />
          <DeleteBtn
            onClick={() => handleDelete("1234")}
            className="bg-white"
          />
        </div>
      </div>
      {/* Ongoing order */}
      <div>
        <h2 className="text-lg font-semibold mt-10">Ongoing Orders</h2>
        <VendorTable headers={[]}>
          {data?.slice(0, 1).map((item, index) => (
            <TableRow key={index} className="border">
              <TableCell>
                <div className="flex">
                  <IconBox className="m-0">
                    <FavIcon className="size-5" name="bookings_cc" />
                  </IconBox>
                  <div className="ml-2">
                    <p>{item.service}</p>
                    <p className="text-xl font-semibold">{item.price}</p>
                  </div>
                </div>
              </TableCell>
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
                    <h1 className="text-figma-gray">{item.userEmail}</h1>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <FavIcon name="calender_cc" />
                  <span className="text-figma-gray ml-1">{item.dateTime}</span>
                </div>
              </TableCell>

              <TableCell>
                <Badge variant="pending">Pending</Badge>
              </TableCell>
            </TableRow>
          ))}
        </VendorTable>
      </div>
      {/* Completed orders */}
      <div>
        <h2 className="text-lg font-semibold mt-10">Completed Orders</h2>
        <VendorTable headers={[]}>
          {isLoading ? (
            <TableSkeleton colSpan={5} tdStyle="!pl-2" />
          ) : data?.length > 0 ? (
            data?.map((item, index) => (
              <TableRow key={index} className="border">
                <TableCell>
                  <div className="flex">
                    <IconBox className="m-0">
                      <FavIcon className="size-5" name="bookings_cc" />
                    </IconBox>
                    <div className="ml-2">
                      <p>{item.service}</p>
                      <p className="text-xl font-semibold">{item.price}</p>
                    </div>
                  </div>
                </TableCell>
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
                      <h1 className="text-figma-gray">{item.userEmail}</h1>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <FavIcon name="calender_cc" />
                    <span className="text-figma-gray ml-1">
                      {item.dateTime}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="relative">
                  <h1 className="border flex w-fit py-1  space-x-2 px-3 rounded-md">
                    <FavIcon name="rating_value" />
                    <span> 5.6</span>
                  </h1>
                </TableCell>

                <TableCell>
                  <Badge variant="completed">Completed</Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={5}
              title="No Order are available at the moment"
              tdStyle="!bg-background"
            />
          )}
        </VendorTable>
      </div>
      {/*  =========== add ========= */}
      <Modal2
        open={isEdit}
        setIsOpen={setIsEdit}
        title="Edit Stuff"
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <div
          onClick={() => setIsEdit(false)}
          className="absolute cursor-pointer top-3 right-4"
        >
          <X />
        </div>
        <EditStuff />
      </Modal2>
    </div>
  );
}
