import Link from "next/link";
import type { Idea } from "@/lib/types";
import { CATEGORY_META } from "@/lib/categories";
import CategoryIcon from "./CategoryIcon";
import { formatDate } from "@/lib/formatDate";

interface IdeaCardProps {
  idea: Idea;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const meta = CATEGORY_META[idea.category];

  return (
    <Link href={`/ideas/${idea.id}`} className="block group">
      <article
        className="
          bg-white border-4 border-black p-5
          transition-shadow
          group-hover:shadow-[8px_8px_0_0_rgb(0,0,0)]
          group-focus-visible:shadow-[8px_8px_0_0_rgb(0,0,0)]
          h-full flex flex-col
        "
      >
        {/* Category badge with icon */}
        <span
          className={`
            inline-flex items-center gap-1.5 self-start px-3 py-1 text-xs font-black uppercase
            border-2 border-black ${meta.badgeBg}
          `}
        >
          <CategoryIcon name={meta.iconName} size={12} />
          {meta.label}
        </span>

        {/* Title */}
        <h3 className="mt-3 text-lg font-black leading-tight text-black">
          {idea.startupName}
        </h3>

        {/* Value proposition — clamped to 2 lines */}
        <p className="mt-2 text-sm text-black/80 line-clamp-2 leading-relaxed">
          {idea.valueProposition}
        </p>

        {/* Why this paper — clamped to 1 line */}
        <p className="mt-1.5 text-xs text-black/60 italic line-clamp-1">
          {idea.whyThisPaper}
        </p>

        {/* Tech tags preview */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {idea.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-black text-white text-xs font-bold"
            >
              {tech}
            </span>
          ))}
          {idea.techStack.length > 4 && (
            <span className="px-2 py-0.5 bg-black/10 text-black text-xs font-bold">
              +{idea.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Footer: batch date */}
        <div className="mt-auto pt-3 text-xs font-semibold text-black/50">
          {formatDate(idea.batchDate)}
        </div>
      </article>
    </Link>
  );
}
