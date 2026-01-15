"use client";

import Form from "@/components/reusable/from";
import IconBox from "@/components/reusable/Icon-box";
import PictureUploader from "@/components/reusable/PictureUploader";
import SubTitle from "@/components/reusable/title";
import { Button } from "@/components/ui";
import { DownloadVendorDocIcon, SubmitDocIcon } from "@/icon";


import Link from "next/link";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useUploadBusinessDocumentsMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    // No resolver needed since we're just uploading files
    defaultValues: {},
  });

  const router = useRouter();
  const [uploadDocuments, { isLoading }] = useUploadBusinessDocumentsMutation();

  const handleSubmit = async (values: FieldValues) => {
    try {
      // Validate that both files are uploaded
      if (!nationalId.file || !businessProof.file) {
        toast.error("Please upload both National ID and Business Proof documents");
        return;
      }
      
      // Debug: Log file information
      console.log('NID file:', {
        name: nationalId.file?.name,
        size: nationalId.file?.size,
        type: nationalId.file?.type
      });
      console.log('Business Proof file:', {
        name: businessProof.file?.name,
        size: businessProof.file?.size,
        type: businessProof.file?.type
      });
      
      // Create FormData to send files
      const formData = new FormData();
      formData.append('nid', nationalId.file);
      formData.append('pob', businessProof.file);
      
      // Debug: Log FormData entries
      console.log('FormData contents:', [...formData.entries()]);
      
      // Upload documents to backend
      const res = await uploadDocuments(formData).unwrap();
      
      toast.success(res.message || "Documents uploaded successfully!");
      
      // Redirect to vendor dashboard after successful upload
      // Since we have the document check in place, this will now redirect properly
      router.push('/vendor');
    } catch (err: any) {
      console.error("Document upload error:", err);
      // Log more details about the error
      console.error("Error details:", {
        message: err?.message,
        data: err?.data,
        status: err?.status,
        error: err?.error,
        raw_error: err
      });
      
      let errorMessage = "Failed to upload documents";
      if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.error) {
        errorMessage = err.error;
      } else if (err?.message) {
        errorMessage = err.message;
      }
      
      toast.error(errorMessage || "An unknown error occurred during document upload");
    }
  };

  // Remove debug log
  // console.log(nationalId.file);
  return (
    <div className="w-11/12 lg:max-w-4xl bg-secondary rounded-figma-sm py-10 px-4  lg:px-10 my-30 mx-auto">
      <IconBox className="lg:size-14 mb-4">
        <SubmitDocIcon />
      </IconBox>
      <SubTitle text="Submit your documents" svg={false} />
      <p className="text-figma-secondary text-center max-w-xl mx-auto mt-2">
        {`Submit the required documents. National ID, proof of business, your photo etc.`}
      </p>
      <form onSubmit={from.handleSubmit(handleSubmit)} className="space-y-4 pt-8">
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
          <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Submit Documents"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubmitDocuments;
