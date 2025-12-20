"use client";
import { SelectStuff } from "@/components/common/stuff-user";
import Avatars from "@/components/reusable/avater";
import Circle from "@/components/reusable/circle";
import FilePreviewDesign from "@/components/reusable/file-upload-design";
import Form from "@/components/reusable/from";
import { FromTextArea } from "@/components/reusable/from-textarea";
import { ImgBox } from "@/components/reusable/Img-box";
import Modal from "@/components/reusable/modal";
import SubTitle from "@/components/reusable/title";
import { Button, Label } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import FavIcon from "@/favicon/favicon";
import { useModalState } from "@/hooks";
import { useFileUpload } from "@/hooks/useFileUpload";
import { cn, RandomImg } from "@/lib";
import useConfirmation from "@/provider/confirmation";
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const initState = {
  isAssign: false,
  isDeliver: false,
};

export default function BookingDetails() {
  const { confirm } = useConfirmation();
  const [state, setState] = useModalState(initState);
  const [stuffIds, setStuffIds] = useState<any[]>([]);

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      title: "Delete Package ?",
      description:
        "You are going to delete this Package. After deleting, this Package will no longer available in your platform",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div className="my-10">
      <SubTitle text="Booking Details" svg={false} />
      <div className="max-w-5xl p-6 mx-auto bg-secondary mt-10 rounded-2xl  overflow-hidden">
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-black mb-2">Package</h2>
            <div className="flex flex-col lg:flex-row items-start gap-4">
              <ImgBox
                src={RandomImg()}
                className="size-20 lg:size-18 mx-auto lg:mx-0"
                alt="House cleaning service"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold  text-black leading-snug">
                  House cleaning service for residential areas in New York City.
                </h3>
                <h3 className="text-2xl font-semibold  text-black leading-snug">
                  $250
                </h3>
              </div>
              <Badge>New Order</Badge>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-black mb-2">
              Additional note{" "}
              <span className="font-normal text-xs">(Optional)</span>
            </h2>
            <p className="bg-white text-figma-gray p-2 rounded-md leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Laoreet sagittis massa
              aliquet tortor facilisis. Ac aliquet mi phareellus at. Elit
              aliquam odio at posuere quis diam sit integer. Urna feugiat et ut
              in adipiscing fermentum gravida. Eu augue nibh ultrices eu. Erat
              lacus dignissim tortor donec sed vitae vitae tristique. Blandit
              vestibulum tincidunt sagittis fermentum nisi nibh lectus. Vitae
              arcu et aliquet fames leo consequat sollicitudin lacus. Quisque id
              dui maecenas tempor velit arcu.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-black mb-2">
              {" "}
              User details
            </h2>

            <div className="flex flex-wrap space-y-2 lg:space-y-0 items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatars
                  src={""}
                  fallback={"Julfiker"}
                  alt="profile"
                  fallbackStyle="aStyle"
                />
                <ul className="leading-5 mb-1">
                  <li className="font-semibold">
                    John Doe
                    <span className="bg-white py-px rounded-full ml-1 text-sm  px-2 font-normal">
                      8 orders
                    </span>
                  </li>
                  <li className="text-figma-gray">example@gmail.com</li>
                </ul>
              </div>
              <Link href="/vendor/chat">
                <Button className="bg-white text-black rounded-md">
                  <FavIcon name="chat_cc" />
                  Message user
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-black mb-2">
              Scheduled Date
            </h2>

            <h3>17th November, 2025</h3>
          </div>
          <div>
            <div>
              <h2 className="text-lg font-semibold text-black mb-2">Add-ons</h2>
              <div className="flex flex-wrap  gap-3">
                <ul className="border flex space-x-2 items-center w-fit py-2 px-2 rounded-md">
                  <li>Add-on number 1</li>
                  <li className="text-lg flex items-center font-medium">
                    <Circle className="mr-1" />
                    $50
                  </li>
                </ul>
                <ul className="border flex space-x-2 items-center w-fit py-2 px-2 rounded-md">
                  <li>Add-on number 1</li>
                  <li className="text-lg flex items-center font-medium">
                    <Circle className="mr-1" />
                    $50
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Button
              onClick={() => handleDelete("12345")}
              className="bg-figma-danger w-full"
            >
              Decline Order
            </Button>
            <Button
              onClick={() => setState("isAssign", true)}
              className="bg-[#2D9D1E] w-full"
            >
              Accept & assign stuff
            </Button>
          </div>
        </div>
      </div>

      {/* ==================== assign ========== */}
      <Modal
        open={state.isAssign}
        setIsOpen={(v: any) => setState("isAssign", v)}
        title="Accept & assign stuff"
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <SelectStuff
          selected={stuffIds}
          onChange={(newIds) => {
            setStuffIds(newIds);
          }}
        />
      </Modal>
      {/*  ============= Deliver this order =========== */}
      <Modal
        open={state.isDeliver}
        setIsOpen={(v: any) => setState("isDeliver", v)}
        title="Deliver this order"
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <DeliverBox />
      </Modal>
    </div>
  );
}

//  ================ Pending ==================
function DeliverBox() {
  const [{ files }, { getInputProps, openFileDialog, clearFiles, removeFile }] =
    useFileUpload({
      accept: "image/*",
      multiple: true,
    });

  const form = useForm({
    defaultValues: {
      message: "",
      files: [],
    },
  });

  console.log(files);

  const handleProfileSubmit = async (values: FieldValues) => {
    console.log(values);
  };
  return (
    <Form from={form} className="space-y-6 mt-4" onSubmit={handleProfileSubmit}>
      <div>
        <Label
          htmlFor="image"
          className="relative mx-auto w-full border border-dashed h-[120px] rounded-md border-primary cursor-pointer"
        >
          <div className="text-center mx-auto">
            <p className="text-blacks mb-2 text-sm">Upload Photos</p>
            <p className="text-gray-400 font-medium mb-4 text-xs">OR</p>

            <Button onClick={openFileDialog} type="button">
              Browse files
            </Button>
          </div>

          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image file"
            id="image"
          />
        </Label>
        <div className="flex items-center gap-6 mt-5 flex-wrap">
          {files?.map((item, index) => (
            <ImgBox
              className="size-20"
              key={index}
              src={item.preview}
              alt="Uploaded"
            >
              <X
                onClick={() => removeFile(item.id)}
                className="absolute top-1 right-1 p-px cursor-pointer bg-white rounded-full"
                size={20}
              />
            </ImgBox>
          ))}
        </div>
      </div>
      <FromTextArea
        name="message"
        placeholder="Type your message here"
        className="min-h-30"
      />
      <Button size="lg" className="rounded-md w-full" type="submit">
        Deliver this order
      </Button>
    </Form>
  );
}
