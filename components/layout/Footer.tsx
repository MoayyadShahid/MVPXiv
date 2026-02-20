import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t-4 border-white bg-black py-6">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm font-medium text-white">
        Made with ❤️ by{" "}
        <Link
          href="https://github.com/MoayyadShahid"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-yellow-300 px-2 py-0.5 font-bold text-black underline underline-offset-2 hover:bg-yellow-200"
        >
          Moayyad
        </Link>
      </div>
    </footer>
  );
}
