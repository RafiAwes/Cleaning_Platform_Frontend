"use client";
import { useForm, FieldValues } from "react-hook-form";
import photo1 from "@/assets/contactUsPhoto.png";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/reusable/from";
import { FromInput } from "@/components/reusable/form-input";
import { Button } from "@/components/ui";
import { LocationIcon, MessageIconTwo, PhoneIcon, SendIcon } from "@/icon";
import { FromTextArea } from "@/components/reusable/from-textarea";
import { contact_us } from "@/lib";

const ContactUs = () => {
  const from = useForm({
    resolver: zodResolver(contact_us),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <div className=" bg-white pt-4">
      <div className="container px-4 mb-8">
        {/* Header Section */}
        <div
          className="relative h-[200px] md:h-[250px] xl:h-[380px] rounded-2xl"
          style={{
            backgroundImage: `url(${photo1.src})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 className="text-[#ffff] absolute bottom-0 p-6 xl:p-10 font-bold text-base xl:text-2xl">
            Contact Us
          </h1>
        </div>

        {/* Content Section */}
        <div className="mt-6 xl:mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:px-40">
            {/* Left Column - Contact Information */}
            <div className="space-y-4 bg-secondary flex flex-col justify-center px-4 md:px-8 py-6 rounded-2xl h-[350px]">
              {/* Address 1 */}
              <div className="flex items-center gap-4">
                <div className="self-start">
                  <LocationIcon className=" shrink-0" />
                </div>
                <div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    V-Manhattan Square North, New York, NY 10001, United States
                  </p>
                </div>
              </div>
              {/* Address 2 */}
              <div className="flex items-center gap-4">
                <div className="self-start">
                  <LocationIcon className=" shrink-0" />
                </div>
                <div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    P-Washington Square South, New York, NY 10012, United States
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center  gap-4">
                <PhoneIcon />
                <div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    +1234567890
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center  gap-4">
                <MessageIconTwo />
                <div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    example@gmail.com
                  </p>
                </div>
              </div>
            </div>
            <div className=" ">
              <Form className="space-y-3  " from={from} onSubmit={handleSubmit}>
                <FromInput
                  label="Name"
                  name="name"
                  placeholder="Enter your full name here"
                  className="h-[50px]  bg-secondary rounded-[10px] placeholder:text-muted-foreground"
                  stylelabel="text-lg"
                />

                <FromInput
                  label="Email"
                  name="email"
                  placeholder="Enter your email address"
                  className="h-[50px]  bg-secondary rounded-[10px] placeholder:text-muted-foreground"
                  stylelabel="text-lg"
                />
                <FromTextArea
                  label="Your message"
                  name="message"
                  placeholder="Write your message here"
                  className="min-h-30 bg-secondary rounded-[10px]"
                />

                <div className="flex justify-end ">
                  <Button
                    type="submit"
                    className="mt-0 xl:mt-0"
                    size="lg"
                    icon={false}
                  >
                    Get a quote
                    <SendIcon />
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
