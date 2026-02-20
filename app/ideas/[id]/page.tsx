import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchIdeaById, fetchBatchByDate } from "@/lib/api";
import IdeaDetail from "@/components/IdeaDetail";
import { formatDate } from "@/lib/formatDate";

interface Props {
  params: { id: string };
}

export default async function IdeaDetailPage({ params }: Props) {
  let idea;
  try {
    idea = await fetchIdeaById(params.id);
  } catch {
    notFound();
  }

  let researchThemes: string[] = [];
  try {
    const { batch } = await fetchBatchByDate(idea.batchDate);
    researchThemes = batch.researchThemes;
  } catch {
    // batch not found — render without themes
  }

  return (
    <main>
      <section className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 border-b-4 border-black">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Link
            href={`/batches/${idea.batchDate}`}
            className="text-xs font-bold underline underline-offset-2 hover:text-black/70"
          >
            &larr; Back to batch {formatDate(idea.batchDate)}
          </Link>
          <h1 className="mt-2 text-3xl sm:text-4xl font-black text-black">
            {idea.startupName}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <IdeaDetail
          idea={idea}
          researchThemes={researchThemes}
          isModal={false}
        />
      </div>
    </main>
  );
}
