"use client";

import { LayoutGrid } from "lucide-react";
import type { IdeaCategory, CountsByCategory } from "@/lib/types";
import { CATEGORY_ORDER, CATEGORY_META } from "@/lib/categories";
import CategoryIcon from "./CategoryIcon";

interface CategoryTabsProps {
  selected: IdeaCategory | "ALL";
  counts: CountsByCategory;
  total: number;
  onSelect: (cat: IdeaCategory | "ALL") => void;
}

export default function CategoryTabs({
  selected,
  counts,
  total,
  onSelect,
}: CategoryTabsProps) {
  const countMap: Record<string, number> = {
    ALL: total,
    BACKLOG: counts.backlog,
    CONSIDERABLE: counts.considerable,
    PROMISING: counts.promising,
    LUCRATIVE: counts.lucrative,
  };

  const isAllSelected = selected === "ALL";

  return (
    <div className="flex flex-wrap gap-2">
      {/* All tab */}
      <button
        onClick={() => onSelect("ALL")}
        className={`
          inline-flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all
          ${
            isAllSelected
              ? "bg-white border-4 border-black shadow-[4px_4px_0_0_rgb(0,0,0)]"
              : "bg-white border-2 border-black hover:bg-gray-100 hover:shadow-[2px_2px_0_0_rgb(0,0,0)]"
          }
        `}
      >
        <LayoutGrid size={14} />
        All
        <span
          className={`
            inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 text-xs font-bold
            ${isAllSelected ? "bg-black text-white" : "bg-white text-black border border-black"}
          `}
        >
          {countMap.ALL}
        </span>
      </button>

      {/* Category tabs */}
      {CATEGORY_ORDER.map((cat) => {
        const meta = CATEGORY_META[cat];
        const isSelected = selected === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`
              inline-flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all
              ${
                isSelected
                  ? `${meta.bg} border-4 border-black shadow-[4px_4px_0_0_rgb(0,0,0)]`
                  : `bg-white border-2 border-black ${meta.hoverBg} hover:shadow-[2px_2px_0_0_rgb(0,0,0)]`
              }
            `}
          >
            <CategoryIcon name={meta.iconName} size={14} />
            {meta.label}
            <span
              className={`
                inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 text-xs font-bold
                ${isSelected ? "bg-black text-white" : "bg-white text-black border border-black"}
              `}
            >
              {countMap[cat]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
