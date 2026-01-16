import { cn, PlaceholderImg } from "@/lib/utils";
import Image from "next/image";
import React, { useMemo, useState } from "react";

interface ImgProps {
  src: any;
  alt: string;
  className?: string;
  imgStyle?: string;
  children?: React.ReactNode;
}

export function ImgBox({ src, alt, className, imgStyle, children }: ImgProps) {
  const initialSrc = useMemo(() => {
    if (typeof src === 'string' && src) {
      return src;
    }
    return PlaceholderImg(600, 400);
  }, [src]);
  const [imgSrc, setImgSrc] = useState<string>(initialSrc);
  const [hasError, setHasError] = useState(false);

  // Use unoptimized for backend URLs
  const isBackendUrl = typeof imgSrc === 'string' && (imgSrc.includes('127.0.0.1') || imgSrc.includes('localhost') || imgSrc.includes('.com') || imgSrc.includes('.net'));

  return (
    <div
      className={cn(
        `w-[500px] h-[330px] relative overflow-hidden rounded-md`,
        className
      )}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        unoptimized={isBackendUrl || hasError}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg=="
        className={cn(`object-cover object-center`, imgStyle)}
        sizes="(max-width: 768px) 100vw, 50vw"
        onError={() => {
          setHasError(true);
          setImgSrc(PlaceholderImg(600, 400));
        }}
      />
      {children}
    </div>
  );
}
