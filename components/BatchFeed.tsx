"use client";

import { useState } from "react";
import type { Batch, Idea, IdeaCategory } from "@/lib/types";
import { CATEGORY_ORDER } from "@/lib/categories";
import CategoryTabs from "./CategoryTabs";
import IdeaCard from "./IdeaCard";
import IdeaDetail from "./IdeaDetail";
import ResearchThemes from "./ResearchThemes";

interface BatchFeedProps {
  batch: Batch;
  ideas: Idea[];
}

export default function BatchFeed({ batch, ideas }: BatchFeedProps) {
  const [selected, setSelected] = useState<IdeaCategory | "ALL">("ALL");
  const [modalIdea, setModalIdea] = useState<Idea | null>(null);

  const filtered =
    selected === "ALL"
      ? ideas
      : ideas.filter((i) => i.category === selected);

  const sorted = [...filtered].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a.category);
    const bi = CATEGORY_ORDER.indexOf(b.category);
    return ai - bi;
  });

  return (
    <>
      <div className="space-y-6">
        <ResearchThemes themes={batch.researchThemes} />

        <CategoryTabs
          selected={selected}
          counts={batch.countsByCategory}
          total={ideas.length}
          onSelect={setSelected}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((idea) => (
            <div
              key={idea.id}
              onClick={(e) => {
                e.preventDefault();
                setModalIdea(idea);
              }}
              className="cursor-pointer"
            >
              <IdeaCard idea={idea} />
            </div>
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="border-4 border-black bg-gray-50 p-8 text-center">
            <p className="text-sm font-bold text-black/50">
              No ideas in this category.
            </p>
          </div>
        )}
      </div>

      {modalIdea && (
        <IdeaDetail
          idea={modalIdea}
          researchThemes={batch.researchThemes}
          isModal
          onClose={() => setModalIdea(null)}
        />
      )}
    </>
  );
}
