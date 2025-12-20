import IconBox from "@/components/reusable/Icon-box";
import SubTitle from "@/components/reusable/title";
import FavIcon from "@/favicon/favicon";

type NotificationType = "default" | "success" | "error";

const notifications = [
  {
    title: "New order",
    date: "10th Nov, 2025 at 05:30 PM",
    type: "default",
    showTapToView: true,
    read: false,
  },
  {
    title: "Delivery requested accepted",
    date: "10th Nov, 2025 at 05:30 PM",
    type: "success",
    read: false,
  },
  {
    title: "Delivery requested declined",
    date: "10th Nov, 2025 at 05:30 PM",
    type: "error",
    read: true,
  },
];

const getTextColor = (type: NotificationType) => {
  switch (type) {
    case "success":
      return "text-green-500";
    case "error":
      return "text-red-500";
    default:
      return "text-foreground";
  }
};

export default function NotificationBox() {
  return (
    <div className="container">
      <SubTitle svg={false} className="text-2xl my-10" text="Notification" />

      <div className="space-y-3">
        {notifications.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between 
                       bg-muted/50 py-4 px-4 rounded-lg gap-4 sm:gap-0"
          >
            {/* LEFT SIDE */}
            <div className="flex items-start sm:items-center gap-4">
              <IconBox>
                <FavIcon name="noti" />
              </IconBox>

              <div className="flex flex-col">
                <span
                  className={`font-medium ${getTextColor(
                    item.type as NotificationType
                  )}`}
                >
                  {item.title}
                </span>

                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span>{item.date}</span>

                  {item.showTapToView && (
                    <>
                      <span>•</span>
                      <span>Tap to view</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE ICON */}
            <div className="text-foreground flex sm:block justify-end w-full sm:w-auto">
              {item.read ? (
                <FavIcon name="message_read" />
              ) : (
                <FavIcon name="message_unread" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
