"use client";
import TextEditor from "@/components/reusable/text-editor";
import { Button } from "@/components/ui";
import React, { useState } from "react";

export default function TermsConditions() {
  const [content, setContent] = useState<string>("");
  return (
    <div>
      <h1 className="text-xl font-semibold my-2">Terms & Conditions</h1>
      <TextEditor value={content} onChange={setContent} />
      <div className="flex justify-end pt-8">
        <Button size="lg" className="rounded-md">
          Save changes
        </Button>
      </div>
    </div>
  );
}
