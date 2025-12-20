"use client";

import { Send, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatAreaProps {
  activeChat: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  messages: any[];
  messageInput: string;
  onMessageChange: (value: string) => void;
  onOpenSidebar: () => void;
}

export function ChatArea({
  activeChat,
  messages,
  messageInput,
  onMessageChange,
  onOpenSidebar,
}: ChatAreaProps) {
  return (
    <div className="flex-1 flex flex-col border rounded-md min-w-0">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 md:px-6 py-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9 shrink-0"
          onClick={onOpenSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage
            src={activeChat.avatar || "/placeholder.svg"}
            alt={activeChat.name}
          />
          <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {activeChat.name}
          </p>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
            <span className="text-xs text-muted-foreground">active</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="text-center mb-6">
          <span className="text-xs text-muted-foreground">10:36 AM</span>
        </div>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${message.isSent ? "justify-end" : "justify-start"}`}
            >
              {!message.isSent && (
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage
                    src={message.avatar || "/placeholder.svg"}
                    alt="User"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] sm:max-w-xs px-4 py-2 rounded-2xl text-sm ${
                  message.isSent
                    ? "bg-muted text-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {message.content}
              </div>
              {message.isSent && (
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage
                    src={message.avatar || "/placeholder.svg"}
                    alt="You"
                  />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 md:p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => onMessageChange(e.target.value)}
            className="flex-1 border border-border rounded-lg h-10"
          />
          <Button
            size="icon"
            className="h-10 w-10 rounded-lg bg-blue-500 hover:bg-blue-600 shrink-0"
          >
            <Send className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
