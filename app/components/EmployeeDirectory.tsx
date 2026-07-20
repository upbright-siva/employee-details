"use client";

import { useMemo, useState } from "react";
import { Search, Users } from "lucide-react";
import EmployeeCard from "./EmployeeCard";
import { Employee } from "../lib/employees";

interface EmployeeDirectoryProps {
  employees: Employee[];
  departments: string[];
  counts: Record<string, number>;
}

export default function EmployeeDirectory({
  employees,
  departments,
  counts,
}: EmployeeDirectoryProps) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return employees.filter((emp) => {
      const matchesDept = department === "All" || emp.department === department;
      if (!matchesDept) return false;
      if (!q) return true;
      return (
        emp.fullName.toLowerCase().includes(q) ||
        emp.employeeId.toLowerCase().includes(q) ||
        emp.jobTitle.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q)
      );
    });
  }, [employees, query, department]);

  const chips = ["All", ...departments];

  return (
    <div>
      {/* Search + filters */}
      <div className="flex flex-col gap-4 rounded-xl border border-line bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, employee ID, or title…"
            aria-label="Search employees"
            className="w-full rounded-lg border border-line bg-paper py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-slate-400 focus:border-brand-700 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by department">
        {chips.map((chip) => {
          const active = department === chip;
          return (
            <button
              key={chip}
              type="button"
              onClick={() => setDepartment(chip)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? "border-brand-900 bg-brand-900 text-white"
                  : "border-line bg-white text-slate-600 hover:border-brand-700 hover:text-brand-900"
              }`}
            >
              {chip}
              <span className={active ? "ml-1.5 text-accent-500" : "ml-1.5 text-slate-400"}>
                {counts[chip] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
        <p>
          Showing <span className="font-semibold text-ink">{filtered.length}</span>{" "}
          of {employees.length} employees
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((employee) => (
            <EmployeeCard key={employee.employeeId} employee={employee} />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-3 rounded-xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <Users className="h-8 w-8 text-slate-400" />
          <p className="font-display text-lg font-bold text-ink">No employees match your search</p>
          <p className="max-w-sm text-sm text-slate-600">
            Try a different name, employee ID, job title, or clear the department filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setDepartment("All");
            }}
            className="mt-1 rounded-lg bg-brand-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
