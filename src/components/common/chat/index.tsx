"use client";
import { useState } from "react";
import { ConversationList } from "./convartion";
import { ChatArea } from "./chat-area";

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  isActive?: boolean;
}

export interface Message {
  id: string;
  content: string;
  time: string;
  isSent: boolean;
  avatar: string;
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Aisha Patel",
    avatar: "/woman-dark-hair.png",
    lastMessage: "We conversed yesterday.",
    time: "10:45 AM",
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    avatar: "/bearded-man-portrait.png",
    lastMessage: "We assembled yesterday.",
    time: "10:45 AM",
  },
  {
    id: "3",
    name: "Zara Khan",
    avatar: "/diverse-woman-smiling.png",
    lastMessage: "We met up yesterday.",
    time: "10:45 AM",
  },
  {
    id: "4",
    name: "Ethan Brooks",
    avatar: "/young-man-casual.jpg",
    lastMessage: "We came together yesterday.",
    time: "10:45 AM",
  },
  {
    id: "5",
    name: "Nina Schmidt",
    avatar: "/professional-woman.png",
    lastMessage: "We connected yesterday.",
    time: "10:45 AM",
  },
  {
    id: "6",
    name: "Nina Schmidt",
    avatar: "/professional-woman.png",
    lastMessage: "We connected yesterday.",
    time: "10:45 AM",
  },
  {
    id: "7",
    name: "Jamal Robinson",
    avatar: "/smiling-man.png",
    lastMessage: "We got together yesterday.",
    time: "10:45 AM",
  },
  {
    id: "8",
    name: "Nina Schmidt",
    avatar: "/professional-woman.png",
    lastMessage: "We connected yesterday.",
    time: "10:45 AM",
  },
  {
    id: "9",
    name: "Jamal Robinson",
    avatar: "/smiling-man.png",
    lastMessage: "We got together yesterday.",
    time: "10:45 AM",
  },
  {
    id: "10",
    name: "Jamal Robinson",
    avatar: "/smiling-man.png",
    lastMessage: "We got together yesterday.",
    time: "10:45 AM",
  },
  {
    id: "11",
    name: "Jamal Robinson",
    avatar: "/smiling-man.png",
    lastMessage: "We got together yesterday.",
    time: "10:45 AM",
  },
];

const activeChat = {
  id: "lian",
  name: "Lian O'Sullivan",
  avatar: "/thoughtful-man-glasses.png",
  isOnline: true,
};

const messages: Message[] = [
  {
    id: "1",
    content: "Hi how are you?",
    time: "10:36 AM",
    isSent: false,
    avatar: "/thoughtful-man-glasses.png",
  },
  {
    id: "2",
    content: "Hellow I am fine",
    time: "10:36 AM",
    isSent: true,
    avatar: "/diverse-user-avatars.png",
  },
];

export function ChatBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex space-x-6 h-[calc(100vh-100px)] bg-background">
      <ConversationList
        conversations={conversations}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showSidebar={showSidebar}
        onCloseSidebar={() => setShowSidebar(false)}
      />
      <ChatArea
        activeChat={activeChat}
        messages={messages}
        messageInput={messageInput}
        onMessageChange={setMessageInput}
        onOpenSidebar={() => setShowSidebar(true)}
      />
    </div>
  );
}
