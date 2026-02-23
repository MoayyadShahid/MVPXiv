import { fetchLatestBatch } from "@/lib/api";
import Hero from "@/components/Hero";
import BatchFeed from "@/components/BatchFeed";

export const revalidate = 1800;

export default async function HomePage() {
  const result = await fetchLatestBatch();

  if (!result) {
    return (
      <main>
        <Hero batchDate={new Date().toISOString().slice(0, 10)} />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <div className="inline-block border-4 border-black bg-yellow-100 px-8 py-6 shadow-[8px_8px_0_0_rgb(0,0,0)]">
            <p className="text-xl font-bold">No batches yet.</p>
            <p className="mt-2 text-gray-600">
              The daily pipeline hasn&apos;t run yet. Check back after 9:30 PM ET.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const { batch, ideas } = result;

  return (
    <main>
      <Hero batchDate={batch.date} />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <BatchFeed batch={batch} ideas={ideas} />
      </div>
    </main>
  );
}
