import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchBatchByDate } from "@/lib/api";
import BatchFeed from "@/components/BatchFeed";
import { formatDate } from "@/lib/formatDate";

interface Props {
  params: { date: string };
}

export default async function BatchDatePage({ params }: Props) {
  let data;
  try {
    data = await fetchBatchByDate(params.date);
  } catch {
    notFound();
  }

  const { batch, ideas } = data;

  return (
    <main>
      <section className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 border-b-4 border-black">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <Link
            href="/batches"
            className="text-xs font-bold underline underline-offset-2 hover:text-black/70"
          >
            &larr; All batches
          </Link>
          <h1 className="mt-2 text-4xl font-black text-black">
            Batch: {formatDate(batch.date)}
          </h1>
          <p className="mt-1 text-base font-bold text-black/70">
            {ideas.length} blueprint{ideas.length !== 1 ? "s" : ""} from{" "}
            {batch.sources.filter((s) => !s.startsWith("http")).join(" & ")}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <BatchFeed batch={batch} ideas={ideas} />
      </div>
    </main>
  );
}
