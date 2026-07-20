interface DepartmentTagProps {
  department: string;
  className?: string;
}

export default function DepartmentTag({ department, className = "" }: DepartmentTagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-brand-100 bg-brand-100/60 px-2.5 py-1 text-xs font-semibold text-brand-800 ${className}`}
    >
      {department}
    </span>
  );
}
