import Link from "next/link";
import { fetchBatches } from "@/lib/api";
import type { Batch } from "@/lib/types";
import { CATEGORY_ORDER, CATEGORY_META } from "@/lib/categories";
import CategoryIcon from "@/components/CategoryIcon";
import { formatDate } from "@/lib/formatDate";

export default async function BatchesPage() {
  const batches = await fetchBatches();

  return (
    <main>
      <section className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 border-b-4 border-black">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-4xl font-black text-black">Batch Archive</h1>
          <p className="mt-1 text-base font-bold text-black/70">
            Browse past daily batches of startup blueprints.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="space-y-4">
          {batches.map((batch) => (
            <BatchRow key={batch.id} batch={batch} />
          ))}
        </div>
      </div>
    </main>
  );
}

function BatchRow({ batch }: { batch: Batch }) {
  const total = batch.ideaIds.length;

  return (
    <Link href={`/batches/${batch.date}`} className="block group">
      <div
        className="
          flex flex-col sm:flex-row sm:items-center justify-between gap-3
          border-4 border-black bg-white p-5
          transition-shadow
          group-hover:shadow-[8px_8px_0_0_rgb(0,0,0)]
        "
      >
        <div>
          <h2 className="text-lg font-black">{formatDate(batch.date)}</h2>
          <p className="text-xs text-black/50 mt-0.5">
            {total} idea{total !== 1 ? "s" : ""} &middot;{" "}
            Sources: {batch.sources.filter((s) => !s.startsWith("http")).join(", ")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_ORDER.map((cat) => {
            const key = cat.toLowerCase() as keyof typeof batch.countsByCategory;
            const count = batch.countsByCategory[key];
            if (count === 0) return null;
            const m = CATEGORY_META[cat];
            return (
              <span
                key={cat}
                className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-bold border-2 border-black ${m.badgeBg}`}
              >
                <CategoryIcon name={m.iconName} size={12} />
                {m.label} {count}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
