"use client";
import { DeleteBtn, EditBtn } from "@/components/reusable/btn";
import { FromInput } from "@/components/reusable/form-input";
import Form from "@/components/reusable/from";
import { FromTextArea } from "@/components/reusable/from-textarea";
import Modal from "@/components/reusable/modal";
import { Button } from "@/components/ui";
import useConfirmation from "@/provider/confirmation";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const questionsData = [
  {
    title: "How do I create a new event?",
    content:
      "You can create a new event by clicking on the “Create Event” button in the dashboard. Fill in the event details such as name, date, time, and description, then save to publish.",
  },
  {
    title: "How can I edit an existing event?",
    content:
      "To edit an event, go to your Events page, select the event you want to update, make your changes, and click Save to update it.",
  },
  {
    title: "Can I delete an event?",
    content:
      "Yes, open the event details and click the Delete button. Confirm your action, and the event will be removed permanently.",
  },
  {
    title: "How can I share my event with others?",
    content:
      "After publishing your event, use the Share button to copy the event link or post it directly to your social media platforms.",
  },
];

export default function FQA() {
  const { confirm } = useConfirmation();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);

  const toggleAccordion = (index: number) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };

  // edit  question
  const editfrom = useForm({
    defaultValues: {
      question: "Sign Up and Onboard",
      answer:
        "Create your account and set up your first campaign with ease. Our user-friendly interface and guided setup process make it simple to get started",
    },
  });

  const editSubmit = async (values: FieldValues) => {
    console.log("Profile form:", values);
    editfrom.reset();
  };

  // add question
  const storefrom = useForm({
    defaultValues: {
      question: "",
      answer: "",
    },
  });
  const StoreSubmit = async (values: FieldValues) => {
    console.log("Profile form:", values);
    storefrom.reset();
  };

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete FAQ",
      title: "You are going to delete this FAQ",
      description:
        "After deleting, user's won't be able to find this FAQ on your system",
    });
    if (confirmed) {
      console.log(id);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold my-2">
        Frequently Asked Questions (FAQ)
      </h1>
      <div className="py-5" ref={containerRef}>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full">
            {questionsData.map((item, index) => (
              <div key={index} className="flex">
                <div className="py-2.5 px-5 mb-4 bg-secondary  rounded-sm cursor-pointer w-full">
                  <div
                    className="flex items-center justify-between"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h4 className="text-base font-medium text-[#1B1B1B]">
                      {item.title}
                    </h4>
                    <span>
                      {activeAccordion === index ? (
                        <ChevronUp
                          size={27}
                          className="text-black rounded-full p-1"
                        />
                      ) : (
                        <ChevronDown
                          size={27}
                          className="text-black rounded-full p-1"
                        />
                      )}
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      activeAccordion === index ? "max-h-full" : "max-h-0"
                    }`}
                    style={{
                      maxHeight: activeAccordion === index ? "500px" : "0px",
                    }}
                  >
                    <p className="text-sm lg:text-base mt-1">{item.content}</p>
                  </div>
                </div>
                <div className="ml-2 w-32 flex gap-2">
                  <EditBtn
                    onClick={() => setEditOpen(!editOpen)}
                    className="size-11"
                  />
                  <DeleteBtn
                    onClick={() => handleDelete(index)}
                    className="size-11"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => setStoreOpen(!storeOpen)}
            size="lg"
            className="rounded-md mt-7"
          >
            <Plus className="text-white size-5" />
            Add More
          </Button>
        </div>
      </div>
      {/* ==============  added question ============= */}
      <Modal
        open={storeOpen}
        setIsOpen={setStoreOpen}
        title="Add FAQ"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <Form
          from={storefrom}
          onSubmit={StoreSubmit}
          className="space-y-6 pt-4"
        >
          <FromInput
            label="Question"
            name="Question"
            placeholder="Enter your Question"
            className="h-11 bg-secondary rounded-xl"
          />
          <FromTextArea
            label="Answer"
            name="answer"
            placeholder="Enter your Answer"
            className="min-h-44 rounded-xl"
            stylelabel="bg-white"
          />
          <Button className="rounded-xl w-full" size="lg">
            Add
          </Button>
        </Form>
      </Modal>
      {/* ============ edit question ============= */}
      <Modal
        open={editOpen}
        setIsOpen={setEditOpen}
        title="Edit FAQ"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <Form from={editfrom} onSubmit={editSubmit} className="space-y-6 pt-4">
          <FromInput
            label="Question"
            name="question"
            placeholder="Enter your Question"
            className="h-11 rounded-xl bg-secondary"
          />
          <FromTextArea
            label="Answer"
            name="answer"
            placeholder="Enter your Answer"
            className="min-h-44 rounded-xl"
            stylelabel="bg-white"
          />
          <Button className="rounded-xl w-full" size="lg">
            Save changes
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
