"use client";
import AdminNavTitle from "@/components/common/super-dash/reuse/admin-nav";
import Avatars from "@/components/reusable/avater";
import { DeleteBtn } from "@/components/reusable/btn";
import { ImgBox } from "@/components/reusable/Img-box";
import Modal from "@/components/reusable/modal";
import { Button, Table } from "@/components/ui";
import FavIcon from "@/favicon/favicon";
import { cn, RandomImg } from "@/lib";
import useConfirmation from "@/provider/confirmation";
import { useParams } from "next/navigation";
import { useState } from "react";

export const manageTabs = [
  { id: "packages", label: "Packages", icon: "package_cc" },
  { id: "stuffs", label: "stuffs", icon: "group_users_cc" },
];

const services = [
  {
    id: 1,
    title: "House cleaning service for residential areas in New York",
    price: 250,
  },
  {
    id: 2,
    title: "House cleaning service for residential areas in New York",
    price: 250,
  },
  {
    id: 3,
    title: "House cleaning service for residential areas in New York",
    price: 250,
  },
  {
    id: 4,
    title: "House cleaning service for residential areas in New York",
    price: 250,
  },
];

const addons = [
  { id: 1, name: "Add-on number 1", price: 50 },
  { id: 2, name: "Add-on number 2", price: 50 },
  { id: 3, name: "Add-on number 3", price: 50 },
  { id: 4, name: "Add-on number 4", price: 50 },
];

export default function VendorDetails() {
  const [isPreview, setIsPreview] = useState(false);
  const [isTab, setIsTab] = useState("packages");
  const { confirm } = useConfirmation();
  const { id } = useParams();

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      title: "Delete vendor ?",
      description:
        "You are going to delete this vendor. After deleting, this vendor will no longer available in your platform",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  const handleDeletePackage = async (id: any) => {
    const confirmed = await confirm({
      title: "Delete package ?",
      description:
        "You are going to delete this package. After deleting, user's won' t be able to find this package into your platform.",
    });
    if (confirmed) {
      console.log(id);
    }
  };

  return (
    <div>
      <AdminNavTitle
        title="Vendor Details"
        subTitle="You can see all the details of the vendor from here"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 mt-3">
        <div className="bg-secondary w-full p-4 rounded-lg">
          <div>
            <ImgBox
              src={RandomImg()}
              className="size-30 rounded-full mx-auto"
              alt="Profile"
            />
            <div className="flex items-center justify-center space-x-2 mt-3">
              <span className="font-medium text-base">Elizabeth Olson</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>example@gmail.com</span>
            </div>
          </div>
          <div className="font-semibold mt-2 flex items-center bg-white px-3 py-2 mx-auto rounded-md w-fit">
            <FavIcon name="top_seller" />
            Top Vendor
          </div>
          <div className="grid grid-cols-1 mt-6 lg:grid-cols-2 gap-5">
            <VendorSmallCard
              icon="package_cc"
              title="Total Package"
              count={"6"}
            />
            <VendorSmallCard
              icon="group_users_cc"
              title="Total stuff"
              count={"20"}
            />
            <VendorSmallCard
              icon="phone_cc"
              title="Phone number"
              count={"1256985642"}
            />
            <VendorSmallCard
              icon="earn_cc"
              title="Total earned"
              count={"$1200"}
            />
            <VendorSmallCard
              className="col-span-1 lg:col-span-2"
              icon="time_cc"
              title="Available time"
              count={"09:00 AM - 06:00 PM"}
            />
            <VendorSmallCard
              className="col-span-1 lg:col-span-2"
              icon="location_cc"
              title="Address"
              count={"70 Washington Square South, United States"}
            />
          </div>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => handleDelete("1234")}
              className="bg-white text-black font-semibold"
            >
              {" "}
              <FavIcon name="delete_cc" />
              Delete Vendor
            </Button>
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex items-center flex-wrap space-x-5 border-b-px mb-6">
            {manageTabs.map((item, index) => {
              const tabId = item.id;
              return (
                <div
                  onClick={() => setIsTab(tabId)}
                  key={index}
                  className="cursor-pointer font-medium text-lg"
                >
                  <span className="px-6 flex items-center">
                    <FavIcon name={item.icon as any} />
                    <span className="ml-2"> {item.label}</span>
                  </span>
                  <div
                    className={`w-full h-1 rounded-t-md ${
                      isTab === tabId ? "bg-primary" : "bg-transparent"
                    }`}
                  ></div>
                </div>
              );
            })}
          </div>
          {/*  ================ package ============== */}
          {isTab == "packages" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  mx-auto">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-secondary p-3 relative rounded-md"
                  onClick={() => setIsPreview(!isPreview)}
                >
                  <ImgBox
                    className="w-full h-[230px]"
                    src={RandomImg(1000, 600)}
                    alt={service.title}
                  >
                    <div
                      onClick={(e: any) => {
                        e.stopPropagation();
                        handleDeletePackage("1234");
                      }}
                      className="absolute z-10  right-3 top-3"
                    >
                      <DeleteBtn />
                    </div>
                  </ImgBox>
                  <div className="pt-3">
                    <h3 className="text-base "> {service.title}</h3>
                    <h4 className="text-xl font-bold">${service.price}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/*  ================ stuffs ============== */}
          {isTab == "stuffs" && <StuffsBox />}
        </div>
      </div>
      {/* =============== is previw ============ */}
      <Modal
        open={isPreview}
        setIsOpen={setIsPreview}
        titleStyle="text-center"
        title="Package Details"
        className="sm:max-w-xl"
      >
        <div className="mt-3 space-y-6 mb-5">
          <div className="border flex justify-between bg-secondary border-none items-center rounded-xl px-2 py-3">
            <div className="flex items-center space-x-2">
              <Avatars
                src={""}
                fallback={"T"}
                alt="profile"
                fallbackStyle="aStyle"
              />
              <div className="leading-5">
                <h1>
                  House cleaning service for residential areas in New York{" "}
                </h1>
                <h1 className="text-secondery-figma">$250</h1>
              </div>
            </div>
            <div
              onClick={() => handleDeletePackage("55")}
              className="bg-white cursor-pointer size-10 grid place-items-center rounded-md"
            >
              <FavIcon name="delete_cc" className="size-5" />
            </div>
          </div>
          <div className="border flex justify-between bg-secondary border-none items-center rounded-xl px-2 py-3">
            <div className="flex items-center space-x-2">
              <div className="size-11 rounded-full bg-white grid place-items-center">
                <FavIcon name="bookings_cc" />
              </div>
              <div className="leading-5">
                <h1>Ongoing bookings of this package</h1>
                <h1 className="text-secondery-figma">16</h1>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold mb-1">About this package</h1>
            <p className="text-figma-gray leading-relaxed text-base">
              Lorem ipsum dolor sit amet consectetur. Senectus condimentum
              dapibus aliquet gravida placerat molestie dui non lorem. Suscipit
              sed sed morbi consequat enim tincidunt facilisis enim faucibus.
              Sagittis lectus aliquet urna varius euismod. Dolor ornare
              facilisis eu egestas sed. Urna justo lobortis mattis netus at
              sagittis elefend. Pellentesque vulputate vitae pellentesque
              aliquam. Ornare in donec facilisi dictum. Euismod elementum
              scelerisque tristique feugiat enim maecenas ac morbi. Sodales
              aliquam eu purus ac dui adipiscing.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Service included</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Yard cleaning",
                "4 room cleaning",
                "2 bathroom cleaning",
                "Window cleaning",
                "Window cleaning",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex bg-secondary py-1 px-3 rounded-md items-center gap-2"
                >
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                  <span className="text-[#53535]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-1">
              {" "}
              Available add-ons with this package
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {addons.map((item) => (
                <div key={item.id} className="bg-secondary rounded-lg p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">{item.name}</span>
                    <span className="text-gray-900 font-medium">
                      ${item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// vendeor
function VendorSmallCard({
  icon,
  title,
  count,
  className,
}: {
  icon: string;
  title: string;
  count: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "p-3 flex  space-x-1 items-center bg-white rounded-xl space-y-0.5",
        className
      )}
    >
      <div className="grid size-11 bg-secondary rounded-full place-items-center">
        <FavIcon className="size-6" name={icon as any} />
      </div>
      <div>
        <p className="text-figma-black">{title}</p>
        <h2 className="text-xl font-bold">{count}</h2>
      </div>
    </div>
  );
}

// ============== Stuffs =============
function StuffsBox() {
  const data = [
    {
      id: 1,
      avatar: "/images/avatar.png",
      name: "Stuff name",
      phone: "+23689645632",
      location: "Stuff location goes here",
    },
    {
      id: 2,
      avatar: "/images/avatar.png",
      name: "Stuff name",
      phone: "+23689645632",
      location: "Stuff location goes here",
    },
    {
      id: 3,
      avatar: "/images/avatar.png",
      name: "Stuff name",
      phone: "+23689645632",
      location: "Stuff location goes here",
    },
    {
      id: 4,
      avatar: "/images/avatar.png",
      name: "Stuff name",
      phone: "+23689645632",
      location: "Stuff location goes here",
    },
    {
      id: 5,
      avatar: "/images/avatar.png",
      name: "Stuff name",
      phone: "+23689645632",
      location: "Stuff location goes here",
    },
  ];

  return (
    <div className="w-full">
      <Table className="w-full border-collapse">
        {/* <thead className="table-header-group">
          <tr className="table-row">
            <th className="px-6 py-3 text-sm text-left  font-semibold">Name</th>
            <th className="px-6 py-3 text-sm text-center font-semibold">
              Phone
            </th>
            <th className="px-6 py-3 ml-4 text-sm text-center font-semibold">
              Location
            </th>
          </tr>
        </thead> */}
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b  transition">
              {/* NAME + AVATAR */}
              <td className="px-6 py-3">
                <div className="flex items-center gap-3">
                  <Avatars
                    src={item.avatar}
                    alt="profile"
                    fallback={item.name}
                    className="rounded-md h-[45px] w-[45px]"
                    fallbackStyle="rounded-md"
                  />
                  <span className="font-medium text-[15px]">{item.name}</span>
                </div>
              </td>

              {/* PHONE */}
              <td className="px-6 py-3 text-sm text-center w-[250px]">
                {item.phone}
              </td>

              {/* LOCATION */}
              <td className="px-6 py-3 text-sm text-right w-[350px]">
                {item.location}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
