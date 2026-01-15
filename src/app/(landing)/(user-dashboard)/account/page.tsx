"use client";

import { Button, Label } from "@/components/ui";
import {
  EmailInfIcon,
  LocationFieldIcon,
  PhoneIpfIcon,
  UserInfIcon,
} from "@/icon";

import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { booking_screma, PlaceholderImg } from "@/lib";
import Form from "@/components/reusable/from";
import { FromInput } from "@/components/reusable/form-input";
import { useFileUpload } from "@/hooks/useFileUpload";
import Image from "next/image";
import profile from "@/assets/profile.png";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { clearAuth } from "@/redux/features/authSlice";
import { helpers } from "@/lib/helpers";
import { authKey } from "@/lib/constants";
import { useLogoutMutation } from "@/redux/api/authApi";
import { toast } from "sonner";

const AccountSettings = () => {
  const [{ files }, { getInputProps }] = useFileUpload({
    accept: "image/*",
  });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap();
      // Clear auth cookie and Redux state
      helpers.removeAuthCookie(authKey);
      dispatch(clearAuth());
      router.push('/auth');
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error("Logout error:", err);
      // Even if backend logout fails, clear local state
      helpers.removeAuthCookie(authKey);
      dispatch(clearAuth());
      router.push('/auth');
      toast.success("Logged out successfully!");
    }
  };

  const from = useForm({
    resolver: zodResolver(booking_screma),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      address: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const value = {
      values,
      ...(files[0]?.file && { image: files[0]?.file }),
    };

    console.log(value);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6 ">Account settings</h1>
      <div>
        <Form from={from} onSubmit={handleSubmit}>
          <Label
            htmlFor="image"
            className="relative mx-auto size-28 rounded-full mb-6"
          >
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <FromInput
              label="Name"
              name="name"
              placeholder="Enter your full name here"
              icon={<UserInfIcon />}
              className="h-[50px]  bg-secondary  placeholder:text-muted-foreground"
              stylelabel="text-lg"
            />

            <FromInput
              label="Email"
              name="email"
              placeholder="Enter your email"
              icon={<EmailInfIcon />}
              className="h-[50px]  bg-secondary  placeholder:text-muted-foreground"
              stylelabel="text-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FromInput
              label="Phone number"
              name="phone_number"
              type="number"
              placeholder="Enter your phone number"
              icon={<PhoneIpfIcon />}
              className="h-[50px]  bg-secondary  placeholder:text-muted-foreground"
              stylelabel="text-lg"
            />

            <FromInput
              label="Address"
              name="address"
              placeholder="Enter your address"
              icon={<LocationFieldIcon />}
              className="h-[50px]  bg-secondary  placeholder:text-muted-foreground"
              stylelabel="text-lg"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-2 rounded-[10px] text-red-500 text-[18px] border border-red-500 p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 11.27L16.82 11H7V9H16.82L17 8.73C17.2 8.37 17.63 8.22 18.05 8.39C18.47 8.57 18.7 9 18.6 9.46L18.17 12L18.6 14.54C18.7 15 18.47 15.43 18.05 15.61C17.63 15.78 17.2 15.63 17 15.27L16.82 15H7V13H16.82L17 12.73C17.2 12.37 17.63 12.22 18.05 12.39C17.63 12.22 17.2 12.07 17 11.73L17 11.27ZM15 21H5V3H15V7H13V5H7V19H13V17H15V21ZM16 11V15C16 16.1 15.1 17 14 17H9V19H14C16.21 19 18 17.21 18 15V9C18 6.79 16.21 5 14 5H9V7H14C15.1 7 16 7.9 16 9V11Z" fill="currentColor"/>
              </svg>
              Logout
            </button>
            <Button type="submit" className="">
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AccountSettings;
