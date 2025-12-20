"use client";
import { ImgBox } from "@/components/reusable/Img-box";
import { Button } from "@/components/ui";
import FavIcon from "@/favicon/favicon";
import { useModalState } from "@/hooks";
import { RandomImg } from "@/lib";
import { Plus } from "lucide-react";
import Link from "next/link";

const intState = {
  isAdd: false,
  isEdit: false,
  isPreview: false,
};

const services = [
  {
    id: 1,
    image: "/woman-cleaning-window-with-yellow-gloves-in-reside.jpg",
    title: "House cleaning service for residential areas in New York",
    price: "$250",
  },
  {
    id: 2,
    image: "/woman-cleaning-window-with-yellow-gloves-in-reside.jpg",
    title: "House cleaning service for residential areas in New York",
    price: "$250",
  },
  {
    id: 3,
    image: "/woman-cleaning-window-with-yellow-gloves-in-reside.jpg",
    title: "House cleaning service for residential areas in New York",
    price: "$250",
  },
  {
    id: 4,
    image: "/woman-cleaning-window-with-yellow-gloves-in-reside.jpg",
    title: "House cleaning service for residential areas in New York",
    price: "$250",
  },
];

export default function Packages() {
  const [state, setState] = useModalState(intState);
  return (
    <div className="container">
      <ul className="flex items-center flex-wrap mt-10 space-y-2 lg:space-y-0 justify-between">
        <li className="text-xl font-bold">4 Packages</li>
        <li className="space-x-3">
          <Link href="/vendor/packages/custom-pricing">
            <Button className="rounded-sm bg-white border">
              <FavIcon name="custom_pri" />
              <span className="text-black"> Custom pricing management</span>
            </Button>
          </Link>
          <Link href="/vendor/packages/store">
            <Button
              onClick={() => setState("isAdd", true)}
              className="rounded-sm"
            >
              <Plus />
              Add New Package
            </Button>
          </Link>
        </li>
      </ul>
      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
          {services.map((item, idx) => (
            <Link key={idx} href={`/vendor/packages/345`}>
              <div className="bg-secondary p-3 rounded-xl">
                <ImgBox
                  src={RandomImg()}
                  className="w-full h-[200px]"
                  alt="Package Image"
                ></ImgBox>
                <div className="mt-3">
                  <h2>{item.title}</h2>
                  <p className="font-semibold text-xl">{item.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
