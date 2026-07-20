import type { Metadata } from "next";
import Link from "next/link";
import { SearchX, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Employee Not Found | UPBRIGHT",
  description: "We couldn't find an employee with that ID in the UPBRIGHT directory.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-900">
          <SearchX className="h-8 w-8 text-accent-500" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-ink">
          Employee not found
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          There&apos;s no employee record matching that ID in the UPBRIGHT
          directory. The ID may be mistyped, or this employee may no longer
          be with the company.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to directory
          </Link>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          If you believe this is an error, contact hr@upbright.com.
        </p>
      </div>
    </main>
  );
}
