import { Archive, Zap, Star, TrendingUp } from "lucide-react";
import type { CategoryIconName } from "@/lib/categories";

const ICON_MAP = {
  Archive,
  Zap,
  Star,
  TrendingUp,
} as const;

interface CategoryIconProps {
  name: CategoryIconName;
  size?: number;
  className?: string;
}

export default function CategoryIcon({
  name,
  size = 14,
  className,
}: CategoryIconProps) {
  const Icon = ICON_MAP[name];
  return <Icon size={size} className={className} />;
}
