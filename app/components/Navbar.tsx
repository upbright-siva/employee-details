import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40">
      <nav className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="rounded focus-visible:outline-offset-4">
            <Logo />
          </Link>
          <div className="hidden items-center gap-8 sm:flex">
            <Link
              href="/"
              className="text-sm font-medium text-ink transition-colors hover:text-accent-700"
            >
              Directory
            </Link>
            <a
              href="#about"
              className="text-sm font-medium text-ink transition-colors hover:text-accent-700"
            >
              About UPBRIGHT
            </a>
          </div>
          <Link
            href="/"
            className="rounded-md bg-brand-100 px-3 py-1.5 text-xs font-semibold text-brand-800 ring-1 ring-brand-100 transition-colors hover:bg-accent-500/20 sm:hidden"
          >
            Directory
          </Link>
        </div>
      </nav>
      <div className="ub-stripe" />
    </header>
  );
}
