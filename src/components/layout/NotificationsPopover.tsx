import { useState } from "react";
import { Bell, Check, MailOpen, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { notifications } from "@/data/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@/components/ui/IconButton";

interface NotificationsPopoverProps {
  onClick?: () => void;
}

const NotificationsPopover = ({ onClick }: NotificationsPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [notificationsList, setNotificationsList] = useState(notifications);
  const navigate = useNavigate();
  
  const unreadCount = notificationsList.filter(n => !n.isRead).length;
  
  const handleMarkAllRead = () => {
    setNotificationsList(
      notificationsList.map(notification => ({
        ...notification,
        isRead: true,
      }))
    );
  };
  
  const handleMarkAsRead = (id: string) => {
    setNotificationsList(
      notificationsList.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };
  
  const handleNavigate = (link?: string) => {
    if (link) {
      navigate(link);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <IconButton
          icon={<Bell className="h-5 w-5" />}
          badge={unreadCount}
          aria-label="الإشعارات"
          onClick={() => {
            onClick?.();
            setOpen(true);
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-96" align="end">
        <div className="flex items-center justify-between py-2">
          <h4 className="font-medium text-sm">الإشعارات</h4>
          <Button 
            variant="ghost" 
            className="h-8 text-xs"
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
          >
            <Check className="ml-1 h-3 w-3" />
            Mark All Read
          </Button>
        </div>
        <Separator />
        <ScrollArea className="h-80">
          <div className="space-y-1 p-2">
            {notificationsList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <MailOpen className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">لا توجد إشعارات جديدة</p>
              </div>
            ) : (
              notificationsList.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-4 rounded-lg p-3 transition-colors",
                    notification.isRead 
                      ? "hover:bg-muted/50" 
                      : "bg-muted/50 hover:bg-muted",
                    notification.link && "cursor-pointer"
                  )}
                  onClick={() => {
                    handleMarkAsRead(notification.id);
                    handleNavigate(notification.link);
                  }}
                >
                  <div className={cn(
                    "rounded-full p-2 mt-1",
                    notification.type === 'error' && "bg-red-100 text-red-700",
                    notification.type === 'warning' && "bg-amber-100 text-amber-700",
                    notification.type === 'success' && "bg-green-100 text-green-700",
                    notification.type === 'info' && "bg-blue-100 text-blue-700",
                    !notification.type && "bg-gray-100 text-gray-700",
                  )}>
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title || "إشعار جديد"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.timestamp), { 
                        addSuffix: true,
                        locale: ar
                      })}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <Badge className="mr-auto mt-1" variant="secondary">جديد</Badge>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        <Separator className="mt-2" />
        <div className="py-2">
          <Button 
            variant="outline" 
            className="w-full text-sm" 
            onClick={() => {
              navigate('/notifications');
              setOpen(false);
            }}
          >
            عرض جميع الإشعارات
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
