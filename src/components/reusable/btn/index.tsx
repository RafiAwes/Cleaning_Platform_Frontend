import { Button } from "@/components/ui";
import FavIcon from "@/favicon/favicon";
import { cn } from "@/lib";

interface DeleteBtnProps {
  onClick?: () => void;
  className?: string;
  iconStyle?: string;
  color?: string;
}

//  =========  DeleteBtn ========
export function DeleteBtn({
  onClick,
  className,
  iconStyle,
  color,
}: DeleteBtnProps) {
  return (
    <Button className={cn("bg-secondary size-10", className)} onClick={onClick}>
      <FavIcon
        color={color}
        className={cn("size-4", iconStyle)}
        name="delete_cc"
      />
    </Button>
  );
}

// =======  EditBtn =======
export function EditBtn({
  onClick,
  className,
  iconStyle,
  color,
}: DeleteBtnProps) {
  return (
    <Button className={cn("bg-secondary size-10", className)} onClick={onClick}>
      <FavIcon
        color={color}
        className={cn("size-4", iconStyle)}
        name="edit_cc"
      />
    </Button>
  );
}
// =======  previewbtn =======
export function PreviewBtn({
  onClick,
  className,
  iconStyle,
  color,
}: DeleteBtnProps) {
  return (
    <Button className={cn("bg-secondary size-10", className)} onClick={onClick}>
      <FavIcon
        color={color}
        className={cn("size-5", iconStyle)}
        name="preview_cc"
      />
    </Button>
  );
}

// export function UploadBtn({ className }: any) {
//   return (
//     <div
//       className={cn(
//         "size-10 grid place-items-center cursor-pointer absolute rounded-md bg-white/20 backdrop-blur-[20px] right-4 top-4",
//         className
//       )}
//     >
//       <FavIcon name="upload22" />
//     </div>
//   );
// }
