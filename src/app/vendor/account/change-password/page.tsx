"use client";
import UpdatePassword from "@/components/common/super-dash/reuse/update-password";
import SubTitle from "@/components/reusable/title";
import React from "react";

export default function ChangePassword() {
  return (
    <div className="2xl:mb-10">
      <h1 className="font-semibold text-lg mb-4">Change Password </h1>
      <UpdatePassword
        btnStyle2="flex w-full justify-end"
        btnStyle="w-fit rounded-lg h-10 px-6"
        className="space-y-8"
        inputStyle="rounded-xl h-11"
      />
    </div>
  );
}
