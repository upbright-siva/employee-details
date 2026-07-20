import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import DepartmentTag from "./DepartmentTag";
import EmployeeQRCode from "./EmployeeQRCode";
import { Employee } from "../lib/employees";
import { formatDate, tenure } from "../lib/utils";

interface EmployeeBadgeProps {
  employee: Employee;
  profileUrl: string;
}

export default function EmployeeBadge({ employee, profileUrl }: EmployeeBadgeProps) {
  return (
    <div className="ub-badge-notch overflow-hidden rounded-2xl bg-brand-900 shadow-xl">
      <div className="ub-stripe" />
      <div className="flex flex-col items-center gap-4 px-6 pb-6 pt-8 text-center">
        <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-accent-500/70">
          <Image
            src={employee.image}
            alt={`${employee.fullName} profile photo`}
            fill
            sizes="112px"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="font-display text-xl font-bold text-white">
            {employee.fullName}
          </h1>
          <p className="mt-0.5 text-sm text-brand-100">{employee.jobTitle}</p>
        </div>

        <DepartmentTag
          department={employee.department}
          className="border-white/20 bg-white/10 text-white"
        />

        <div className="flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-emerald-300">
          <BadgeCheck className="h-3.5 w-3.5" />
          Verified employee · {employee.status}
        </div>

        <div className="w-full border-t border-white/10 pt-4">
          <p className="font-id text-2xl font-bold tracking-widest text-accent-500">
            {employee.employeeId}
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-brand-100">
            Employee ID
          </p>
        </div>

        <div className="mt-1">
          <EmployeeQRCode url={profileUrl} employeeId={employee.employeeId} />
        </div>

        <p className="text-[11px] text-brand-100/80">
          With UPBRIGHT for {tenure(employee.joiningDate)} · since{" "}
          {formatDate(employee.joiningDate)}
        </p>
      </div>
    </div>
  );
}
