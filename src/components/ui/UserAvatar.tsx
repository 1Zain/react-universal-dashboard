
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
  className?: string; // Added className prop
}

export function UserAvatar({ user, size = "md", showStatus = false, className }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className={cn("relative", className)}>
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
      </Avatar>
      {showStatus && user.online !== undefined && (
        <span
          className={`absolute bottom-0 end-0 h-3 w-3 rounded-full border-2 border-white ${
            user.online ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      )}
    </div>
  );
}
