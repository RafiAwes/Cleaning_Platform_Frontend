"use client";
import { Button, Label } from "@/components/ui";
import { ImgBox } from "../Img-box";
import { cn, PlaceholderImg } from "@/lib";
import FavIcon from "@/favicon/favicon";

export default function FilePreviewDesign({
  getInputProps,
  files,
  openFileDialog,
  className,
  title = "Upload Inventory Image",
}: any) {
  return (
    <Label
      htmlFor="image"
      className={cn(
        "relative mx-auto w-full border border-dashed h-[200px] rounded-md border-primary cursor-pointer",
        className
      )}
    >
      {files[0]?.preview ? (
        <ImgBox
          src={files[0]?.preview || PlaceholderImg() || "/blur.png"}
          alt="img"
          className="w-full h-full object-cover rounded-md"
        >
          <div className="size-10 grid place-items-center absolute rounded-md bg-white/20 backdrop-blur-[20px] right-4 top-4">
            <FavIcon name="upload_cc" />
          </div>
        </ImgBox>
      ) : (
        <div className="text-center mx-auto">
          <p className="text-blacks mb-2 text-sm">{title}</p>
          <p className="text-gray-400 font-medium mb-4 text-xs">OR</p>

          <Button onClick={openFileDialog} type="button">
            Browse files
          </Button>
        </div>
      )}

      <input
        {...getInputProps()}
        className="sr-only"
        aria-label="Upload image file"
        id="image"
      />
    </Label>
  );
}
