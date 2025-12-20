"use client";

import React, { useState } from "react";
import photo1 from "@/assets/faqPhoto.png";

function FaqPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqList = [
    {
      q: "Question goes here?",
      a: "Lorem ipsum dolor sit amet consectetur. At netus viverra quis nisl a varius mauris. Mi pulvinar arcu eget id velit adipiscing. Tristique nibh eget interdum orci pharetra mauris imperdiet tortor neque. Elit rutrum scelerisque ac morbi id. Viverra dolor adipiscing sollicitudin nulla nunc ac dignissim. Ultrices pellentesque sed eu cursus. Turpis amet id egestas nunc. Duis dictum cursus id nulla congue est. Lectus sed senectus feugiat quis lectus velit vitae tempus vitae. Nisl consequat egestas sit adipiscing. Felis vulputate ultrices lacus turpis massa semper. Ac dolor vel pretium urna. Diam dui arcu libero diam semper massa. Tortor vestibulum ultricies gravida et nisi tincidunt sit. A mollis lorem nisi sit duis. Risus auctor a amet enim parturient. Vulputate suspendisse pharetra commodo et elementum accumsan. Risus volutpat nulla sit euismod non. Nisl sed velit aliquam ut nunc.",
    },
    {
      q: "Question goes here?",
      a: "Lorem ipsum dolor sit amet consectetur. At netus viverra quis nisl a varius mauris. Mi pulvinar arcu eget id velit adipiscing. Tristique nibh eget interdum orci pharetra mauris imperdiet tortor neque. Elit rutrum scelerisque ac morbi id. Viverra dolor adipiscing sollicitudin nulla nunc ac dignissim. Ultrices pellentesque sed eu cursus. Turpis amet id egestas nunc. Duis dictum cursus id nulla congue est. Lectus sed senectus feugiat quis lectus velit vitae tempus vitae. Nisl consequat egestas sit adipiscing. Felis vulputate ultrices lacus turpis massa semper. Ac dolor vel pretium urna. Diam dui arcu libero diam semper massa. Tortor vestibulum ultricies gravida et nisi tincidunt sit. A mollis lorem nisi sit duis. Risus auctor a amet enim parturient. Vulputate suspendisse pharetra commodo et elementum accumsan. Risus volutpat nulla sit euismod non. Nisl sed velit aliquam ut nunc.",
    },
    {
      q: "Question goes here?",
      a: "Lorem ipsum dolor sit amet consectetur. At netus viverra quis nisl a varius mauris. Mi pulvinar arcu eget id velit adipiscing. Tristique nibh eget interdum orci pharetra mauris imperdiet tortor neque. Elit rutrum scelerisque ac morbi id. Viverra dolor adipiscing sollicitudin nulla nunc ac dignissim. Ultrices pellentesque sed eu cursus. Turpis amet id egestas nunc. Duis dictum cursus id nulla congue est. Lectus sed senectus feugiat quis lectus velit vitae tempus vitae. Nisl consequat egestas sit adipiscing. Felis vulputate ultrices lacus turpis massa semper. Ac dolor vel pretium urna. Diam dui arcu libero diam semper massa. Tortor vestibulum ultricies gravida et nisi tincidunt sit. A mollis lorem nisi sit duis. Risus auctor a amet enim parturient. Vulputate suspendisse pharetra commodo et elementum accumsan. Risus volutpat nulla sit euismod non. Nisl sed velit aliquam ut nunc.",
    },
    {
      q: "Question goes here?",
      a: "Lorem ipsum dolor sit amet consectetur. At netus viverra quis nisl a varius mauris. Mi pulvinar arcu eget id velit adipiscing. Tristique nibh eget interdum orci pharetra mauris imperdiet tortor neque. Elit rutrum scelerisque ac morbi id. Viverra dolor adipiscing sollicitudin nulla nunc ac dignissim. Ultrices pellentesque sed eu cursus. Turpis amet id egestas nunc. Duis dictum cursus id nulla congue est. Lectus sed senectus feugiat quis lectus velit vitae tempus vitae. Nisl consequat egestas sit adipiscing. Felis vulputate ultrices lacus turpis massa semper. Ac dolor vel pretium urna. Diam dui arcu libero diam semper massa. Tortor vestibulum ultricies gravida et nisi tincidunt sit. A mollis lorem nisi sit duis. Risus auctor a amet enim parturient. Vulputate suspendisse pharetra commodo et elementum accumsan. Risus volutpat nulla sit euismod non. Nisl sed velit aliquam ut nunc.",
    },
    {
      q: "Question goes here?",
      a: "Lorem ipsum dolor sit amet consectetur. At netus viverra quis nisl a varius mauris. Mi pulvinar arcu eget id velit adipiscing. Tristique nibh eget interdum orci pharetra mauris imperdiet tortor neque. Elit rutrum scelerisque ac morbi id. Viverra dolor adipiscing sollicitudin nulla nunc ac dignissim. Ultrices pellentesque sed eu cursus. Turpis amet id egestas nunc. Duis dictum cursus id nulla congue est. Lectus sed senectus feugiat quis lectus velit vitae tempus vitae. Nisl consequat egestas sit adipiscing. Felis vulputate ultrices lacus turpis massa semper. Ac dolor vel pretium urna. Diam dui arcu libero diam semper massa. Tortor vestibulum ultricies gravida et nisi tincidunt sit. A mollis lorem nisi sit duis. Risus auctor a amet enim parturient. Vulputate suspendisse pharetra commodo et elementum accumsan. Risus volutpat nulla sit euismod non. Nisl sed velit aliquam ut nunc.",
    },
    {
      q: "Question goes here?",
      a: "Lorem ipsum dolor sit amet consectetur. At netus viverra quis nisl a varius mauris. Mi pulvinar arcu eget id velit adipiscing. Tristique nibh eget interdum orci pharetra mauris imperdiet tortor neque. Elit rutrum scelerisque ac morbi id. Viverra dolor adipiscing sollicitudin nulla nunc ac dignissim. Ultrices pellentesque sed eu cursus. Turpis amet id egestas nunc. Duis dictum cursus id nulla congue est. Lectus sed senectus feugiat quis lectus velit vitae tempus vitae. Nisl consequat egestas sit adipiscing. Felis vulputate ultrices lacus turpis massa semper. Ac dolor vel pretium urna. Diam dui arcu libero diam semper massa. Tortor vestibulum ultricies gravida et nisi tincidunt sit. A mollis lorem nisi sit duis. Risus auctor a amet enim parturient. Vulputate suspendisse pharetra commodo et elementum accumsan. Risus volutpat nulla sit euismod non. Nisl sed velit aliquam ut nunc.",
    },
    {
      q: "Question goes here?",
      a: "Lorem ipsum dolor sit amet consectetur. At netus viverra quis nisl a varius mauris. Mi pulvinar arcu eget id velit adipiscing. Tristique nibh eget interdum orci pharetra mauris imperdiet tortor neque. Elit rutrum scelerisque ac morbi id. Viverra dolor adipiscing sollicitudin nulla nunc ac dignissim. Ultrices pellentesque sed eu cursus. Turpis amet id egestas nunc. Duis dictum cursus id nulla congue est. Lectus sed senectus feugiat quis lectus velit vitae tempus vitae. Nisl consequat egestas sit adipiscing. Felis vulputate ultrices lacus turpis massa semper. Ac dolor vel pretium urna. Diam dui arcu libero diam semper massa. Tortor vestibulum ultricies gravida et nisi tincidunt sit. A mollis lorem nisi sit duis. Risus auctor a amet enim parturient. Vulputate suspendisse pharetra commodo et elementum accumsan. Risus volutpat nulla sit euismod non. Nisl sed velit aliquam ut nunc.",
    },
  ];

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className=" bg-white mb-10">
      <div className="container px-4 pt-4">
        <div
          className="relative h-[200px] md:h-[250px] xl:h-[380px] rounded-2xl"
          style={{
            backgroundImage: `url(${photo1.src})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 className="text-[#ffff] absolute bottom-0 p-6 xl:p-10 font-bold text-[16px] xl:text-[20px]">
            Frequently Asked Questions (FAQ)
          </h1>
        </div>

        {/* Main Content Section */}
        <div className="pt-8">
          <div className="bg-white">
            <div className="flex flex-col">
              <div className="">
                <div className="space-y-2">
                  {faqList.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-[16px] overflow-hidden transition-all duration-200"
                    >
                      <button
                        className="w-full p-5 flex justify-between items-center  transition-colors duration-200 text-left"
                        onClick={() => toggleItem(index)}
                      >
                        <span className="flex-1 text-base font-semibold text-gray-800 pr-3">
                          {item.q}
                        </span>
                        <span className="text-xl font-bold text-gray-500 cursor-pointer">
                          {activeIndex === index ? "−" : "+"}
                        </span>
                      </button>

                      {activeIndex === index && (
                        <div className="px-5 pb-5 bg-gray-50 animate-fade-in">
                          <p className="text-gray-600 leading-6 text-sm">
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqPage;
