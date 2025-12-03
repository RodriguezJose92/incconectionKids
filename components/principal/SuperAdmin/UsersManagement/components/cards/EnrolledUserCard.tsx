import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Profile } from "@/Stores/profilesStore";
import type { Enrolled } from "@/Stores/adminEnrolledStore";

interface EnrolledUserCardProps {
  enrolled: Enrolled;
  profile: Profile | null;
  periodName: string;
}

export const EnrolledUserCard = ({
  enrolled,
  profile,
  periodName,
}: EnrolledUserCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
          <AvatarFallback>
            {profile?.full_name?.charAt(0)?.toUpperCase() ||
              profile?.email?.charAt(0)?.toUpperCase() ||
              "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{profile?.full_name || "Sin nombre"}</div>
          <div className="text-sm text-muted-foreground">
            {profile?.email || "Sin correo"}
          </div>
          {profile?.phone && (
            <div className="text-xs text-muted-foreground">
              Tel: {profile.phone}
            </div>
          )}
          <div className="text-xs text-muted-foreground mt-1">
            Periodo: {periodName} • Matriculado:{" "}
            {new Date(enrolled.enrolled_at).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Badge
          variant={enrolled.is_active ? "default" : "secondary"}
          className={enrolled.is_active ? "bg-green-500" : ""}
        >
          {enrolled.is_active ? "Activo" : "Inactivo"}
        </Badge>
      </div>
    </div>
  );
};
