import Link from "next/link";
import { ExternalLink, FileText, Cpu, Rocket, Layers, Award, BookOpen, Lightbulb } from "lucide-react";
import type { Idea } from "@/lib/types";
import { CATEGORY_META } from "@/lib/categories";
import CategoryIcon from "./CategoryIcon";
import { formatDate } from "@/lib/formatDate";

interface IdeaDetailProps {
  idea: Idea;
  researchThemes?: string[];
  onClose?: () => void;
  isModal?: boolean;
}

export default function IdeaDetail({
  idea,
  researchThemes,
  onClose,
  isModal = false,
}: IdeaDetailProps) {
  const meta = CATEGORY_META[idea.category];

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase border-2 border-black ${meta.badgeBg}`}
          >
            <CategoryIcon name={meta.iconName} size={12} />
            {meta.label}
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl font-black text-black leading-tight">
            {idea.startupName}
          </h1>
          <p className="mt-1 text-xs font-semibold text-black/50">
            Batch: {formatDate(idea.batchDate)}
          </p>
        </div>
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-4 border-black bg-white font-black text-xl hover:bg-black hover:text-white transition-colors"
            aria-label="Close"
          >
            &times;
          </button>
        )}
      </div>

      {/* 1. Concept */}
      <Section icon={<Lightbulb size={18} />} title="Concept" tint="bg-yellow-50">
        <p className="text-sm leading-relaxed">{idea.valueProposition}</p>
      </Section>

      {/* 2. Why This Paper */}
      <Section icon={<BookOpen size={18} />} title="Why This Paper" tint="bg-pink-50">
        <p className="text-sm leading-relaxed italic">{idea.whyThisPaper}</p>
      </Section>

      {/* 3. Technical Core */}
      <Section icon={<Cpu size={18} />} title="Technical Core" tint="bg-cyan-50">
        <p className="text-sm leading-relaxed">{idea.technicalCore}</p>
      </Section>

      {/* 4. Startup-Level Implementation */}
      <Section icon={<Rocket size={18} />} title="Startup-Level Implementation" tint="bg-yellow-50">
        <p className="text-sm leading-relaxed">{idea.implementation}</p>
      </Section>

      {/* 5. Modern Tech Stack */}
      <Section icon={<Layers size={18} />} title="Modern Tech Stack" tint="bg-gray-50">
        <div className="flex flex-wrap gap-2">
          {idea.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-black text-white text-xs font-bold"
            >
              {tech}
            </span>
          ))}
        </div>
      </Section>

      {/* 6. Resume Impact Bullets */}
      <Section icon={<Award size={18} />} title="Resume Impact Bullets" tint="bg-pink-50">
        <ul className="space-y-2">
          {idea.resumeBullets.map((bullet, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed">
              <span className="flex-shrink-0 font-black text-black">&#8226;</span>
              {bullet}
            </li>
          ))}
        </ul>
      </Section>

      {/* 7. Source Paper */}
      <Section icon={<FileText size={18} />} title="Source Paper" tint="bg-cyan-50">
        <div className="space-y-1.5">
          <a
            href={idea.paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold underline underline-offset-2 hover:text-black/70"
          >
            {idea.paper.title}
            <ExternalLink size={14} />
          </a>
          {idea.paper.authors && idea.paper.authors.length > 0 && (
            <p className="text-xs text-black/60">
              {idea.paper.authors.join(", ")}
            </p>
          )}
          {idea.paper.abstract && (
            <p className="text-xs text-black/60 leading-relaxed line-clamp-4">
              {idea.paper.abstract}
            </p>
          )}
          <div className="flex flex-wrap gap-3 text-xs text-black/50">
            {idea.paper.arxivId && <span>arXiv: {idea.paper.arxivId}</span>}
            {idea.paper.primaryCategory && (
              <span>Category: {idea.paper.primaryCategory}</span>
            )}
            {idea.paper.publishedAt && (
              <span>Published: {idea.paper.publishedAt}</span>
            )}
          </div>
        </div>
      </Section>

      {/* 8. Research Themes (from Batch) */}
      {researchThemes && researchThemes.length > 0 && (
        <Section icon={<Lightbulb size={18} />} title="Research Themes" tint="bg-yellow-50">
          <div className="flex flex-wrap gap-2">
            {researchThemes.map((theme) => (
              <span
                key={theme}
                className="px-3 py-1.5 bg-black/5 border-2 border-black text-xs font-bold"
              >
                {theme}
              </span>
            ))}
          </div>
        </Section>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-12"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose?.();
        }}
      >
        <div className="w-full max-w-2xl bg-white border-4 border-black shadow-neobrutal p-6 sm:p-8 mb-12">
          <div className="mb-4">
            <Link
              href={`/ideas/${idea.id}`}
              className="text-xs font-bold text-black/40 underline underline-offset-2 hover:text-black/70"
            >
              Open as page &rarr;
            </Link>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return <div className="w-full max-w-2xl mx-auto">{content}</div>;
}

function Section({
  icon,
  title,
  tint,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  tint: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`border-4 border-black ${tint}`}>
      <div className="flex items-center gap-2 px-4 py-2 bg-black/5 border-b-2 border-black">
        {icon}
        <h2 className="text-sm font-black uppercase tracking-wide">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
