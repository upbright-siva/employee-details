"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Loader2, QrCode } from "lucide-react";
import DepartmentTag from "./DepartmentTag";
import { Employee } from "../lib/employees";
import { useState } from "react";
import { downloadEmployeeQr } from "../lib/qr";

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {  
  const [downloading, setDownloading] = useState(false);
  
  async function handleDownloadQr(e: React.MouseEvent) {
    // The button sits inside the card's <Link> — stop it from also
    // navigating to the profile page.
    e.preventDefault();
    e.stopPropagation();
    if (downloading) return;

    setDownloading(true);
    try {
      await downloadEmployeeQr({
        url: `https://www.upbright.ai/employee/${employee.employeeId}`,
        employeeId: employee.employeeId,
      });
    } finally {
      setDownloading(false);
    }
  }

  return (
    <Link
      href={`https://www.upbright.ai/employee/${employee.employeeId}`}
      className="ub-card group relative flex flex-col overflow-hidden rounded-xl border border-line bg-white focus-visible:outline-offset-4"
    >
      <div className="ub-stripe" />

      <button
        type="button"
        onClick={handleDownloadQr}
        disabled={downloading}
        aria-label={`Download QR code for ${employee.fullName}`}
        title="Download QR code"
        className="absolute right-3 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-brand-800 shadow-sm transition-colors hover:border-brand-700 hover:bg-brand-100/60 focus-visible:outline-offset-4 disabled:opacity-60"
      >
        {downloading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <QrCode className="h-4 w-4" />
        )}
      </button>

      <div className="flex flex-1 flex-col items-center gap-3 px-6 py-7 text-center">
        <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-brand-100">
          <Image
            src={employee.image}
            alt={`${employee.fullName} profile photo`}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-display text-base font-bold text-ink">
            {employee.fullName}
          </h3>
          <p className="mt-0.5 text-sm text-slate-600">{employee.jobTitle}</p>
        </div>
        <DepartmentTag department={employee.department} />
        <p className="font-id text-xs text-slate-400">
          ID {employee.employeeId}
        </p>
      </div>
      <div className="flex items-center justify-center gap-1.5 border-t border-line bg-paper px-4 py-3 text-sm font-semibold text-brand-900 transition-colors group-hover:bg-brand-900 group-hover:text-white">
        View profile
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
