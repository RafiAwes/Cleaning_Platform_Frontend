"use client";

import Form from "@/components/reusable/from";
import IconBox from "@/components/reusable/Icon-box";
import PictureUploader from "@/components/reusable/PictureUploader";
import SubTitle from "@/components/reusable/title";
import { Button } from "@/components/ui";
import { DownloadVendorDocIcon, SubmitDocIcon } from "@/icon";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useUploadDocumentsMutation } from "@/redux/api/documentApi";

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

  const router = useRouter();
  const [uploadDocuments, { isLoading }] = useUploadDocumentsMutation();

  const from = useForm({
    defaultValues: {},
  });

  const handleSubmit = async (values: FieldValues) => {
    if (!nationalId.file || !businessProof.file) {
      alert("Please upload both National ID and Business Proof documents");
      return;
    }

    const formData = new FormData();
    formData.append('nid', nationalId.file);
    formData.append('pob', businessProof.file);

    try {
      const result = await uploadDocuments(formData).unwrap();
      console.log("Document upload successful", result);
      // Navigate to a confirmation page after successful upload
      router.push("/auth"); // Or wherever you want to redirect after document submission
    } catch (error: any) {
      console.error("Document upload failed", error);
      console.error("Full error details:", error);
      if (error?.data?.message) {
        alert("Upload failed: " + error.data.message);
      } else if (error?.status) {
        alert(`Upload failed with status: ${error.status}`);
      } else {
        alert("Document upload failed. Please try again. Error: " + JSON.stringify(error));
      }
    }
  };

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
          <Button 
            className="w-full" 
            size="lg" 
            type="submit"
            disabled={isLoading || !nationalId.file || !businessProof.file}
          >
            {isLoading ? "Uploading..." : "Submit Documents"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SubmitDocuments;