"use client";

import Form from "@/components/reusable/from";
import IconBox from "@/components/reusable/Icon-box";
import PictureUploader from "@/components/reusable/PictureUploader";
import SubTitle from "@/components/reusable/title";
import { Button } from "@/components/ui";
import { DownloadVendorDocIcon, SubmitDocIcon } from "@/icon";
import { varify_sc } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface UploadedFile {
  file: File | null;
  previewUrl: string | null;
}

const SubmitDocuments = () => {
  const [nationalId, setNationalId] = useState<UploadedFile>({
    file: null,
    previewUrl: null,
  });

  const [businessProof, setBusinessProof] = useState<UploadedFile>({
    file: null,
    previewUrl: null,
  });

  const from = useForm({
    resolver: zodResolver(varify_sc),
    defaultValues: {
      code: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };

  console.log(nationalId.file);
  return (
    <div className="w-11/12 lg:max-w-4xl bg-secondary rounded-figma-sm py-10 px-4  lg:px-10 my-30 mx-auto">
      <IconBox className="lg:size-14 mb-4">
        <SubmitDocIcon />
      </IconBox>
      <SubTitle text="Submit your documents" svg={false} />
      <p className="text-figma-secondary text-center max-w-xl mx-auto mt-2">
        {`Submit the required documents. National ID, proof of business, your photo etc.`}
      </p>
      <Form className="space-y-4 pt-8" from={from} onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <PictureUploader
            file={nationalId.file}
            previewUrl={nationalId.previewUrl}
            onChange={(file, url) => {
              setNationalId({
                file,
                previewUrl: url,
              });
            }}
            label="National ID Card"
            dropzoneClassName="w-full border border-dashed rounded-figma-sm! flex flex-col justify-center items-center bg-white h-[136px]"
            icon={<DownloadVendorDocIcon />}
            instructionText="Upload your national ID card "
          />

          {/* Business Proof */}
          <PictureUploader
            file={businessProof.file}
            previewUrl={businessProof.previewUrl}
            onChange={(file, url) => {
              setBusinessProof({
                file,
                previewUrl: url,
              });
            }}
            label="Business Proof"
            dropzoneClassName="w-full border border-dashed rounded-figma-sm! flex flex-col justify-center items-center bg-white h-[136px]"
            icon={<DownloadVendorDocIcon />}
            instructionText="Upload proof of business"
          />
        </div>

        <div>
          <Link href={"/auth/verify-code"}>
            <Button className="w-full" size="lg">
              Next
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SubmitDocuments;
