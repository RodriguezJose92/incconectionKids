import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface UserCardProps {
  user: {
    id: string;
    full_name?: string | null;
    email?: string | null;
    avatar_url?: string | null;
  };
  onEdit?: (userId: string) => void;
}

export const UserCard = ({ user, onEdit }: UserCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={user.avatar_url || "/placeholder.svg"} />
          <AvatarFallback>
            {user.full_name?.charAt(0)?.toUpperCase() ||
              user.email?.charAt(0)?.toUpperCase() ||
              "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{user.full_name || "Sin nombre"}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </div>
      </div>
      {onEdit && (
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => onEdit(user.id)}>
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
