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

// Two blob paths normalized to 0–1 (objectBoundingBox space). Because the
// clipPath uses clipPathUnits="objectBoundingBox", the shape automatically
// scales to fill whatever size its target element is — no fixed px math,
// no mismatch between container size and clip shape.
const BLOB_A_NORM =
  "M0.729,0.2085C0.772,0.252,0.8165,0.326,0.8355,0.407C0.8545,0.488,0.848,0.576,0.8105,0.649C0.773,0.722,0.7045,0.78,0.6255,0.8175C0.5465,0.855,0.457,0.872,0.3725,0.853C0.288,0.834,0.2085,0.779,0.161,0.704C0.1135,0.629,0.098,0.534,0.1155,0.447C0.133,0.36,0.1835,0.281,0.2515,0.237C0.3195,0.193,0.3995,0.184,0.484,0.1785C0.568,0.173,0.656,0.165,0.729,0.2085Z";
const BLOB_B_NORM =
  "M0.7105,0.2265C0.772,0.266,0.818,0.3345,0.841,0.412C0.864,0.4895,0.864,0.576,0.8295,0.6475C0.795,0.719,0.726,0.7755,0.6495,0.8095C0.573,0.8435,0.489,0.855,0.4045,0.8405C0.32,0.826,0.235,0.7855,0.1845,0.718C0.134,0.6505,0.118,0.556,0.132,0.468C0.146,0.38,0.19,0.2985,0.255,0.2575C0.32,0.2165,0.41,0.216,0.4945,0.2245C0.579,0.233,0.649,0.272,0.7105,0.2265Z";

export default function EmployeeBadge({ employee, profileUrl }: EmployeeBadgeProps) {
  return (
    <div className="ub-badge-notch group overflow-hidden rounded-2xl bg-brand-900 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-accent-500/10 [animation:badgeIn_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
      <style>{`
        @keyframes badgeIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.04); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.55); }
          50% { box-shadow: 0 0 0 4px rgba(52,211,153,0); }
        }
        .ub-blob-photo {
          transition: transform 0.4s ease;
        }
        .ub-blob-photo:hover { transform: scale(1.04); }
        .ub-stripe {
          background-image: linear-gradient(
            110deg,
            transparent 30%,
            rgba(255,255,255,0.18) 45%,
            rgba(255,255,255,0.18) 55%,
            transparent 70%
          );
          background-size: 200% 100%;
          animation: shimmer 3.2s ease-in-out infinite;
        }
        .ub-dot {
          animation: dotPulse 2.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ub-badge-notch, .ub-blob-photo, .ub-blob-ring, .ub-stripe, .ub-dot {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Shared clip shape — objectBoundingBox makes it scale to fill
          whatever element references it, at any size. Native <animate>
          morphs the shape with no client JS required. */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="employee-blob-clip" clipPathUnits="objectBoundingBox">
            <path d={BLOB_A_NORM}>
              <animate
                attributeName="d"
                values={`${BLOB_A_NORM};${BLOB_B_NORM};${BLOB_A_NORM}`}
                dur="12s"
                repeatCount="indefinite"
              />
            </path>
          </clipPath>
        </defs>
      </svg>

      <div className="ub-stripe h-1.5 w-full bg-accent-500" />

      <div className="flex flex-col items-center gap-4 px-6 pb-6 text-center">
        {/* Photo fills its container fully — blob shape scales with it */}
        <div className="relative aspect-square w-full max-w-[288px]">
          <div
            className="ub-blob-ring absolute -inset-3 bg-accent-500/40"
            style={{ clipPath: "url(#employee-blob-clip)", animation: "ringPulse 3.5s ease-in-out infinite" }}
          />
          <div
            className="ub-blob-photo relative h-full w-full overflow-hidden bg-brand-800"
            style={{ clipPath: "url(#employee-blob-clip)" }}
          >
            <Image
              src={employee.image}
              alt={`${employee.fullName} profile photo`}
              fill
              sizes="(max-width: 768px) 240px, 288px"
              className="object-cover mt-5"
              priority
            />
          </div>
        </div>

        <div>
          <h1 className="font-display text-xl font-bold text-white">
            {employee.fullName}
          </h1>
          <p className="mt-0.5 text-sm text-brand-100">{employee.jobTitle}</p>
        </div>

        <DepartmentTag
          department={employee.department}
          className="border-white/20 bg-white/10 text-white transition-colors duration-300 group-hover:border-white/30 group-hover:bg-white/15"
        />

        <div className="flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-emerald-300">
          <span className="ub-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
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

        <div className="mt-1 transition-transform duration-300 hover:scale-105">
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