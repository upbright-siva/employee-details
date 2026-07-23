import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Briefcase,
  ShieldCheck,
  ArrowLeft,
  Users,
} from "lucide-react";
import { getAllEmployeeIds, getDirectReports, getEmployeeById, getManager } from "../lib/employees";
import { getSiteUrl } from "../lib/site";
import EmployeeBadge from "../components/EmployeeBadge";
import InfoField from "../components/InfoField";
import { formatDate } from "../lib/utils";

interface ProfilePageProps {
  params: Promise<{ employeeId: string }>;
}

// Official UPBRIGHT contact channels — not tied to any individual employee.
// TODO: replace with your real company phone/email (or import from lib/site.ts
// if you keep company-wide config there).
const COMPANY_PHONE = "+94 (074) 242 7711";
const COMPANY_EMAIL = "hr@upbright.ai";

// Pre-render a static page for every known employee ID at build time —
// this is what lets the directory scale to hundreds or thousands of
// employees without a slow first load on any profile.
export function generateStaticParams() {
  return getAllEmployeeIds().map((employeeId) => ({ employeeId }));
}

// New employee IDs added to lib/employees.ts that weren't in the build
// still resolve correctly, they're just rendered on first request.
export const dynamicParams = true;

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { employeeId } = await params;
  const employee = getEmployeeById(employeeId);
  if (!employee) {
    return { title: "Employee Not Found | UPBRIGHT" };
  }
  const title = `${employee.fullName} — ${employee.jobTitle} | UPBRIGHT`;
  const description = `${employee.fullName} (ID ${employee.employeeId}) is ${employee.jobTitle} in the ${employee.department} department at UPBRIGHT.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: employee.image }],
      type: "profile",
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [employee.image],
    },
  };
}

export default async function EmployeeProfilePage({ params }: ProfilePageProps) {
  const { employeeId } = await params;
  const employee = getEmployeeById(employeeId);

  if (!employee) {
    notFound();
  }

  const profileUrl = `${getSiteUrl()}/${employee.employeeId}`;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
        {/* Badge column */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <EmployeeBadge employee={employee} profileUrl={profileUrl} />
        </div>

        {/* Details column */}
        <div className="space-y-6">
          {/* <section className="rounded-xl border border-line bg-white p-6">
            <h2 className="font-display text-lg font-bold text-ink">About</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {employee.bio}
            </p>
          </section> */}

          <section className="rounded-xl border border-line bg-white p-6">
            <h2 className="font-display text-lg font-bold text-ink">
              Employment details
            </h2>
            <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <InfoField icon={Briefcase} label="Job title" value={employee.jobTitle} />
              <InfoField icon={Building2} label="Department" value={employee.department} />
              <InfoField
                icon={Users}
                label="Employment type"
                value={employee.employmentType}
              />
              <InfoField
                icon={Calendar}
                label="Joining date"
                value={formatDate(employee.joiningDate)}
              />
              <InfoField icon={MapPin} label="Location" value={employee.location} />
              <InfoField
                icon={Mail}
                label="Email"
                value={employee.email}
                href={`mailto:${employee.email}`}
              />
            </dl>
          </section>

          <section className="overflow-hidden rounded-xl border border-line bg-gradient-to-br from-ink to-slate-800 p-6 text-white">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <h2 className="font-display text-lg font-bold">Company contact</h2>
            </div>
            <p className="mt-1 text-sm text-slate-300">
              Official UPBRIGHT channels — not this employee&apos;s personal line.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={`tel:${COMPANY_PHONE}`}
                className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/10"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400/15">
                  <Phone className="h-5 w-5 text-emerald-400" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wide text-slate-400">
                    Phone
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {COMPANY_PHONE}
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/10"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400/15">
                  <Mail className="h-5 w-5 text-emerald-400" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wide text-slate-400">
                    Email
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {COMPANY_EMAIL}
                  </span>
                </span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}