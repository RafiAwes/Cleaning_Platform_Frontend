import { ChatBox } from "@/components/common/chat";
import ProtectedRoute from "@/components/common/ProtectedRoute";

const ChatPage = () => {
  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <div className="container px-4 my-10">
        <ChatBox />
      </div>
    </ProtectedRoute>
  );
};

export default ChatPage;
