"use client";
import { Button, ScrollArea } from "@/components/ui";
import React, { useState } from "react";
import Avatars from "@/components/reusable/avater";
import SearchBox from "../super-dash/reuse/search-box";

const providers = [
  {
    id: 1,
    name: "Elizabeth Olson",
    email: "elizabeth1@gmail.com",
    profilePicture: "",
  },
  {
    id: 2,
    name: "Chris Evans",
    email: "chris.evans@gmail.com",
    profilePicture: "",
  },
  {
    id: 3,
    name: "Scarlett Johansson",
    email: "scarlett.johansson@gmail.com",
    profilePicture: "",
  },
  {
    id: 4,
    name: "Tom Hiddleston",
    email: "tom.hiddleston@gmail.com",
    profilePicture: "",
  },
  {
    id: 5,
    name: "Mark Ruffalo",
    email: "mark.ruffalo@gmail.com",
    profilePicture: "",
  },
  {
    id: 6,
    name: "Robert Downey Jr.",
    email: "robert.downey.jr@gmail.com",
    profilePicture: "",
  },
  {
    id: 7,
    name: "Chris Hemsworth",
    email: "chris.hemsworth@gmail.com",
    profilePicture: "",
  },
  {
    id: 8,
    name: "Natalie Portman",
    email: "natalie.portman@gmail.com",
    profilePicture: "",
  },
  {
    id: 9,
    name: "Jeremy Renner",
    email: "jeremy.renner@gmail.com",
    profilePicture: "",
  },
  {
    id: 10,
    name: "Samuel L. Jackson",
    email: "samuel.jackson@gmail.com",
    profilePicture: "",
  },
  {
    id: 11,
    name: "Benedict Cumberbatch",
    email: "benedict.cumberbatch@gmail.com",
    profilePicture: "",
  },
  {
    id: 12,
    name: "Tom Holland",
    email: "tom.holland@gmail.com",
    profilePicture: "",
  },
  {
    id: 13,
    name: "Paul Rudd",
    email: "paul.rudd@gmail.com",
    profilePicture: "",
  },
  {
    id: 14,
    name: "Cate Blanchett",
    email: "cate.blanchett@gmail.com",
    profilePicture: "",
  },
  { id: 15, name: "Hawkeye", email: "hawkeye@gmail.com", profilePicture: "" },
  {
    id: 16,
    name: "Bucky Barnes",
    email: "bucky.barnes@gmail.com",
    profilePicture: "",
  },
  {
    id: 17,
    name: "Wanda Maximoff",
    email: "wanda.maximoff@gmail.com",
    profilePicture: "",
  },
  { id: 18, name: "Vision", email: "vision@gmail.com", profilePicture: "" },
  {
    id: 19,
    name: "Doctor Strange",
    email: "doctor.strange@gmail.com",
    profilePicture: "",
  },
  {
    id: 20,
    name: "Black Panther",
    email: "black.panther@gmail.com",
    profilePicture: "",
  },
];

type SelectProviderProps = {
  selected: number[];
  onChange: (newList: number[]) => void;
};

export function SelectStuff({ selected, onChange }: SelectProviderProps) {
  const [isSearch, setIsSearch] = useState("");
  const handleToggleProvider = (id: number) => {
    if (selected?.includes(id)) {
      onChange(selected?.filter((providerId) => providerId !== id));
    } else {
      onChange([...selected, id]);
    }
  };
  // filteredProviders
  const filteredProviders = providers.filter((item) =>
    item.name.toLowerCase().includes(isSearch.toLowerCase())
  );

  const loading = false;

  return (
    <div className="space-y-3 mt-2">
      <SearchBox
        rightBtn={false}
        leftBtn={true}
        onChange={(e) => setIsSearch(e)}
        className="w-full mx-auto mb-3"
      />
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-3">
          {loading ? (
            "Loading.."
          ) : filteredProviders?.length > 0 ? (
            filteredProviders?.map((item) => {
              const isSelected = selected.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="border flex items-center justify-between rounded-lg p-2"
                >
                  <div className="flex items-center space-x-2">
                    <Avatars
                      src={item.profilePicture}
                      fallback={item.name}
                      alt={`profile-${item.id}`}
                      fallbackStyle="aStyle"
                    />
                    <div className="leading-5">
                      <h1>{item.name}</h1>
                      <h1 className="text-secondery-figma">{item.email}</h1>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleToggleProvider(item.id)}
                    className={`cursor-pointer border rounded-md ${isSelected ? "bg-primary" : "bg-transparent text-black"}`}
                    size="default"
                  >
                    {isSelected ? "Assigned" : "Assign"}
                  </Button>
                </div>
              );
            })
          ) : (
            <h1 className="text-fimga-secondery text-center py-10">
              No stuff found
            </h1>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
