import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b-4 border-black bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-black tracking-tight hover:opacity-80"
        >
          <Image
            src="/rocket.png"
            alt="MVPXiv"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          MVPXiv
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-bold hover:underline underline-offset-2"
          >
            Latest
          </Link>
          <Link
            href="/batches"
            className="text-sm font-bold hover:underline underline-offset-2"
          >
            Archive
          </Link>
        </div>
      </nav>
    </header>
  );
}
