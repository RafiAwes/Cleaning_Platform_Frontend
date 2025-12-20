"use client";

import { Button } from "@/components/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-screen bg-secondary flex justify-center items-center text-center">
      <div className="space-y-3">
        <div>
          <Image
            src="/images/404.png"
            alt="photo"
            width={500}
            height={500}
            className="w-[300px]"
          />
        </div>
        <p>Oops... page not found</p>

        <Button icon={true} onClick={() => router.back()}>
          Go back
        </Button>
      </div>
    </div>
  );
}
