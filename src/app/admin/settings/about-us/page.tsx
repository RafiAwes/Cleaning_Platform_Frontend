"use client";
import TextEditor from "@/components/reusable/text-editor";
import { Button } from "@/components/ui";
import { useState } from "react";

export default function AboutUs() {
  const [content, setContent] = useState<string>("");
  return (
    <div>
      <h1 className="text-xl font-semibold my-2">About us</h1>
      <TextEditor
        className="border-none"
        value={content}
        onChange={setContent}
      />
      <div className="flex justify-end pt-8">
        <Button size="lg" className="rounded-md">
          Save changes
        </Button>
      </div>
    </div>
  );
}
