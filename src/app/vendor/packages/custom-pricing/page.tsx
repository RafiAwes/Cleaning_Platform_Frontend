import { DeleteBtn } from "@/components/reusable/btn";
import IconBox from "@/components/reusable/Icon-box";
import SubTitle from "@/components/reusable/title";
import { Button, Switch } from "@/components/ui";
import { Plus } from "lucide-react";

const sizes = [
  { label: "Less than 100 sq feet", price: 150 },
  { label: "100 to 200 sq feet", price: 150 },
  { label: "200 to 300 sq feet", price: 150 },
  { label: "300 to 400 sq feet", price: 0 },
  { label: "400 to 500 sq feet", price: 0 },
  { label: "More than 500 sq feet", price: 0 },
];

export default function CustomPricing() {
  return (
    <div className="container py-10">
      <SubTitle text="Custom Pricing Management" svg={false} />
      <div className="bg-secondary flex justify-between items-center flex-wrap p-4 mt-10 rounded-md">
        <div>
          <h2 className="text-xl font-semibold">Custom pricing</h2>
          <p>
            If enable, users will be able to create custom package and order it
            to you.
          </p>
        </div>

        <div className="flex items-center mt-2 lg:mt-0 space-x-2">
          <Switch className="cursor-pointer" id="airplane-mode" />
        </div>
      </div>
      <div className="bg-secondary mt-5 p-4 rounded-md">
        <ul className="flex items-center justify-between mb-10">
          <li className="text-lg font-semibold">Bedroom</li>
          <li>
            <DeleteBtn className="bg-figma-danger" color="#fff" />
          </li>
        </ul>
        <div className="space-y-2">
          {sizes.map((item, index) => (
            <div
              key={index}
              className="border flex justify-between items-center px-2 rounded-sm h-10"
            >
              <span className="text-base text-figma-gray">{item.label}</span>
              <span className="font-medium">${item.price}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3 mt-5">
        {["Bathroom", "Kitchen", "Yard"].map((item, idx) => (
          <div
            className="bg-secondary rounded-md px-3 w-full flex justify-between items-center p-2"
            key={idx}
          >
            <span className="w-fit">{item}</span>
            <span>
              <IconBox className="rounded-md cursor-pointer bg-primary">
                <Plus className="text-white" />
              </IconBox>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-end">
        <Button size="lg">Save changes</Button>
      </div>
    </div>
  );
}
