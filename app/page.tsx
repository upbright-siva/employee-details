import type { Metadata } from "next";
import { IdCard, QrCode, Building2 } from "lucide-react";
import { DEPARTMENTS, EMPLOYEES, getDepartmentCounts } from "./lib/employees";
import EmployeeDirectory from "./components/EmployeeDirectory";

export const metadata: Metadata = {
  title: "Employee Directory | UPBRIGHT",
  description:
    "Browse the official UPBRIGHT employee directory. Search by name, employee ID, or department, and open any employee's verified profile page.",
};

export default function HomePage() {
  const counts = getDepartmentCounts();

  return (
    <main>
      {/* Hero */}
      <section className="bg-brand-900">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="font-id text-xs uppercase tracking-[0.2em] text-accent-500">
            Official directory
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Every UPBRIGHT employee,
            <span className="ub-gradient-text"> one lookup away.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-brand-100 sm:text-base">
            Search the team, open a verified profile, or scan a badge QR code
            to confirm who you&apos;re talking to — instantly.
          </p>

          <dl className="mt-8 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div>
              <dt className="flex items-center gap-1.5 text-xs text-brand-100">
                <IdCard className="h-3.5 w-3.5" /> Employees
              </dt>
              <dd className="mt-1 font-display text-2xl font-bold text-white">
                {EMPLOYEES.length}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs text-brand-100">
                <Building2 className="h-3.5 w-3.5" /> Departments
              </dt>
              <dd className="mt-1 font-display text-2xl font-bold text-white">
                {DEPARTMENTS.length}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs text-brand-100">
                <QrCode className="h-3.5 w-3.5" /> Badge-ready
              </dt>
              <dd className="mt-1 font-display text-2xl font-bold text-white">
                100%
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Directory */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <EmployeeDirectory
          employees={EMPLOYEES}
          departments={DEPARTMENTS}
          counts={counts}
        />
      </section>
    </main>
  );
}
