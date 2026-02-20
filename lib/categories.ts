import type { IdeaCategory } from "./types";

export const CATEGORY_ORDER: IdeaCategory[] = [
  "BACKLOG",
  "CONSIDERABLE",
  "PROMISING",
  "LUCRATIVE",
];

export type CategoryIconName = "Archive" | "Zap" | "Star" | "TrendingUp";

export const CATEGORY_META: Record<
  IdeaCategory,
  {
    label: string;
    bg: string;
    hoverBg: string;
    border: string;
    badgeBg: string;
    badgeBorder: string;
    tintBg: string;
    iconName: CategoryIconName;
  }
> = {
  BACKLOG: {
    label: "Backlog",
    bg: "bg-gray-200",
    hoverBg: "hover:bg-gray-200",
    border: "border-gray-400",
    badgeBg: "bg-gray-200",
    badgeBorder: "border-gray-400",
    tintBg: "bg-gray-50",
    iconName: "Archive",
  },
  CONSIDERABLE: {
    label: "Considerable",
    bg: "bg-pink-300",
    hoverBg: "hover:bg-pink-300",
    border: "border-pink-400",
    badgeBg: "bg-pink-300",
    badgeBorder: "border-pink-400",
    tintBg: "bg-pink-50",
    iconName: "Zap",
  },
  PROMISING: {
    label: "Promising",
    bg: "bg-cyan-300",
    hoverBg: "hover:bg-cyan-300",
    border: "border-cyan-400",
    badgeBg: "bg-cyan-300",
    badgeBorder: "border-cyan-400",
    tintBg: "bg-cyan-50",
    iconName: "Star",
  },
  LUCRATIVE: {
    label: "Lucrative",
    bg: "bg-yellow-300",
    hoverBg: "hover:bg-yellow-300",
    border: "border-yellow-400",
    badgeBg: "bg-yellow-300",
    badgeBorder: "border-yellow-400",
    tintBg: "bg-yellow-50",
    iconName: "TrendingUp",
  },
};
