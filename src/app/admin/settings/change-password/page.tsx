"use client";
import UpdatePassword from "@/components/common/super-dash/reuse/update-password";

export default function ChangePassword() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-6 mt-1">Change Password</h1>
      <UpdatePassword
        btnStyle2="flex w-full justify-end"
        btnStyle="w-fit rounded-lg h-10 px-6"
        className="space-y-8"
        inputStyle="rounded-xl h-11"
      />
    </div>
  );
}
