"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ConversationListProps {
  conversations: any[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showSidebar: boolean;
  onCloseSidebar: () => void;
}

export function ConversationList({
  conversations,
  searchQuery,
  onSearchChange,
  showSidebar,
  onCloseSidebar,
}: ConversationListProps) {
  return (
    <>
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onCloseSidebar}
        />
      )}

      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-[280px] bg-background border rounded-md border-border flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:z-0
      `}
      >
        <div className="p-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 bg-muted/50 border-0 h-9 rounded-lg"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={onCloseSidebar}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer"
              onClick={onCloseSidebar}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={conversation.avatar || "/placeholder.svg"}
                  alt={conversation.name}
                />
                <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {conversation.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {conversation.lastMessage}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {conversation.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
