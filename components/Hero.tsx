import { formatDate } from "@/lib/formatDate";

interface HeroProps {
  batchDate?: string;
}

export default function Hero({ batchDate }: HeroProps) {
  return (
    <section className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 border-b-4 border-black">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-black">
          MVPX<span className="font-black">iv</span>
        </h1>
        <p className="mt-2 text-xl sm:text-2xl font-bold text-black/80">
          arXiv &rarr; MVPs.{" "}
          <span className="inline-block bg-black px-3 py-0.5 text-yellow-300 font-black">
            Daily.
          </span>
        </p>
        <span className="mt-4 inline-block bg-black px-4 py-1.5 text-sm font-bold text-yellow-300 border-2 border-black">
          Built for builders.
        </span>
        {batchDate && (
          <p className="mt-4 text-base font-semibold text-black/70">
            Latest batch:{" "}
            <span className="font-black text-black">{formatDate(batchDate)}</span>
          </p>
        )}
      </div>
    </section>
  );
}
