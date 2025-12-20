"use client";

import { cn } from "@/lib/utils";
import { ImageIcon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import Dropzone from "react-dropzone";

interface PictureUploaderProps {
  file: File | null;
  previewUrl: string | null;
  onChange: (file: File | null, url: string | null) => void;
  label?: string;
  className?: string;
  dropzoneClassName?: string;
  icon?: React.ReactNode;
  instructionText?: string;
}

const ImagePreview = ({
  url,
  onRemove,
  className,
}: {
  url: string;
  onRemove: () => void;
  className?: string;
}) => (
  <div className={cn("relative w-full h-full", className)}>
    <button
      className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-full hover:scale-110 transition-transform"
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      type="button"
    >
      <XCircleIcon className="h-6 w-6 fill-red-500 text-white drop-shadow-md" />
    </button>
    <Image
      src={url}
      fill
      alt="Uploaded preview"
      className="border border-border rounded-md object-cover"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  </div>
);

export default function PictureUploader({
  previewUrl,
  onChange,
  label = "Profile Picture",
  className = "",
  dropzoneClassName = "",
  icon,
  instructionText = "Drop image here or click to upload",
}: PictureUploaderProps) {
  const hasImage = !!previewUrl;

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("w-full h-full", !label && "mt-0", dropzoneClassName)}>
        {hasImage ? (
          <ImagePreview
            url={previewUrl!}
            onRemove={() => onChange(null, null)}
            className={dropzoneClassName}
          />
        ) : (
          <Dropzone
            onDrop={(acceptedFiles) => {
              const file = acceptedFiles[0];
              if (file) {
                const url = URL.createObjectURL(file);
                onChange(file, url);
              }
            }}
            accept={{
              "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"],
            }}
            maxFiles={1}
          >
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
              <div
                {...getRootProps()}
                className={cn(
                  "w-full h-full border-2 border-dashed rounded-figma-sm flex flex-col items-center justify-center cursor-pointer transition-all bg-white",
                  "hover:border-primary/70 hover:bg-gray-50",
                  isDragActive && isDragReject
                    ? "border-destructive bg-destructive/10"
                    : isDragActive
                      ? "border-primary bg-primary/5"
                      : "border-border",
                  dropzoneClassName
                )}
              >
                <input {...getInputProps()} id="profile" />
                {icon || (
                  <ImageIcon
                    className={cn(
                      "h-12 w-12 mb-2",
                      isDragActive && isDragReject
                        ? "text-destructive"
                        : isDragActive
                          ? "text-primary"
                          : "text-muted-foreground"
                    )}
                    strokeWidth={1.5}
                  />
                )}
                <p className="text-sm text-muted-foreground text-center px-4">
                  {instructionText}
                </p>
              </div>
            )}
          </Dropzone>
        )}
      </div>
    </div>
  );
}
