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
import EmployeeCard from "../components/EmployeeCard";

interface ProfilePageProps {
  params: Promise<{ employeeId: string }>;
}

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

  const manager = getManager(employee);
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
              <InfoField icon={ShieldCheck} label="Role" value={employee.role} />
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
            </dl>
          </section>

          <section className="rounded-xl border border-line bg-white p-6">
            <h2 className="font-display text-lg font-bold text-ink">Contact</h2>
            <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <InfoField
                icon={Mail}
                label="Email"
                value={employee.email}
                href={`mailto:${employee.email}`}
              />
              <InfoField
                icon={Phone}
                label="Phone"
                value={employee.phone}
                href={`tel:${employee.phone.replace(/\s+/g, "")}`}
              />
            </dl>
          </section>
        </div>
      </div>
    </main>
  );
}
