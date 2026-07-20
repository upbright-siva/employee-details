import type { LucideIcon } from "lucide-react";

interface InfoFieldProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

export default function InfoField({ icon: Icon, label, value, href }: InfoFieldProps) {
  const content = (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-100 text-brand-800">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </dt>
        <dd className="truncate text-sm font-semibold text-ink">{value}</dd>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="rounded-lg p-2 -m-2 transition-colors hover:bg-paper focus-visible:outline-offset-4"
      >
        {content}
      </a>
    );
  }

  return <div className="rounded-lg p-2 -m-2">{content}</div>;
}
