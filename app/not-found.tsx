import Link from "next/link";

import { getDictionary } from "@/lib/dictionaries";

export default function NotFound() {
  const dictionary = getDictionary("en");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#101841] text-center text-white">
      <h1 className="text-5xl">{dictionary.notFound.title}</h1>
      <p className="text-3xl">{dictionary.notFound.description}</p>
      <Link
        className="inline-flex min-h-12 w-auto items-center justify-center rounded-full bg-[#57d9ff] px-6 text-sm font-semibold text-[#101841] transition hover:bg-white"
        href="/en"
      >
        {dictionary.notFound.ctaLabel}
      </Link>
    </div>
  );
}
