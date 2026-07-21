import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="about" className="border-t border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Logo />
            <p className="mt-2 max-w-sm text-sm text-slate-600">
              The official UPBRIGHT employee directory — used for internal
              lookup and ID badge verification.
            </p>
          </div>
          <div className="text-sm text-slate-600">
            <p>hr@upbright.ai</p>
            <p>UPBRIGHT PVT LTD,</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} UPBRIGHT. All rights reserved.</p>
          <p>This directory is for internal and verified partner use only.</p>
        </div>
      </div>
    </footer>
  );
}
