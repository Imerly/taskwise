import { Badge } from "@/components/ui/badge";
import { Priority } from "@/lib/types";

interface PriorityBadgeProps {
  priority: Priority;
}

const config = {
  high: {
    label: "Alta",
    className: "bg-red-500/20 text-red-400 border-red-500/30",
  },
  medium: {
    label: "Media",
    className: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  low: {
    label: "Baja",
    className: "bg-green-500/20 text-green-400 border-green-500/30",
  },
};

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const { label, className } = config[priority];
  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}
