import { FromInput } from "@/components/reusable/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/reusable/from";
import { Button } from "@/components/ui";
import { LockIcon } from "@/icon";
import { change_Pass, cn } from "@/lib";

export default function UpdatePassword({
  btnStyle,
  btnStyle2,
  className,
  inputStyle,
}: any) {
  const from2 = useForm({
    resolver: zodResolver(change_Pass),
    defaultValues: {
      current_password: "",
      new_password: "",
      c_password: "",
    },
  });

  const handlePasswordSubmit = async (values: FieldValues) => {
    console.log(values);
    // toast.success("Update Successful", {
    //   description: "Your profile has been updated successfully",
    // });
  };
  return (
    <Form from={from2} onSubmit={handlePasswordSubmit}>
      <div className={cn("space-y-2", className)}>
        <FromInput
          name="current_password"
          placeholder="Current Password"
          eye={true}
          className="h-11 rounded-xl bg-secondary"
          icon={<LockIcon />}
        />
        <FromInput
          name="new_password"
          placeholder="New Password"
          eye={true}
          className="h-11 rounded-xl bg-secondary"
          icon={<LockIcon />}
        />
        <FromInput
          name="c_password"
          placeholder="Confirm New Password"
          eye={true}
          className="h-11 rounded-xl bg-secondary"
          icon={<LockIcon />}
        />

        <div className={btnStyle2}>
          <Button className={cn("w-full", btnStyle)}>Save Changes</Button>
        </div>
      </div>
    </Form>
  );
}
