// -----------------------------------------------------------------------------
// UPBRIGHT — Employee data layer
// -----------------------------------------------------------------------------
// This file is the single source of truth for employee records. In this demo
// it's a static array, but every access goes through the functions below —
// not through the array directly — so swapping the array for a real database
// (Postgres, MySQL, Airtable, an internal HR API, etc.) later only means
// rewriting the bodies of these functions. Nothing else in the app needs to
// change.
//
// TO ADD A NEW EMPLOYEE: append an object to EMPLOYEES following the Employee
// shape below. `employeeId` must be unique — it becomes the URL segment
// (upbright.com/{employeeId}) and the QR code payload for that person's badge.
// -----------------------------------------------------------------------------

export interface Employee {
  employeeId: string;
  fullName: string;
  jobTitle: string;
  department: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  joiningDate: string; // YYYY-MM-DD
  employmentType: string;
  reportsTo: string | null;
  status: string;
  bio: string;
  image: string;
}

export interface GetAllEmployeesOptions {
  query?: string;
  department?: string;
}

function avatarFor(name: string): string {
  const initials = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${initials}&background=0B1E3F&color=FFB020&size=256&bold=true&font-size=0.36`;
}

export const DEPARTMENTS: string[] = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Customer Success",
  "Human Resources",
  "Finance",
  "Operations",
  "Legal",
];

export const EMPLOYEES: Employee[] = [
  {
    employeeId: "1001",
    fullName: "Ishara Perera",
    jobTitle: "Chief Executive Officer",
    department: "Operations",
    role: "Executive Leadership",
    email: "ishara.perera@upbright.com",
    phone: "+94 77 100 1001",
    location: "Colombo, LK",
    joiningDate: "2018-01-15",
    employmentType: "Full-time",
    reportsTo: null,
    status: "Active",
    bio: "Leads company strategy and long-term vision across all business units.",
    image: avatarFor("Ishara Perera"),
  },
  {
    employeeId: "1002",
    fullName: "Dinuka Wickramasinghe",
    jobTitle: "VP of Engineering",
    department: "Engineering",
    role: "Director",
    email: "dinuka.w@upbright.com",
    phone: "+94 77 100 1002",
    location: "Colombo, LK",
    joiningDate: "2018-03-01",
    employmentType: "Full-time",
    reportsTo: "1001",
    status: "Active",
    bio: "Oversees platform architecture and the engineering organization.",
    image: avatarFor("Dinuka Wickramasinghe"),
  },
  {
    employeeId: "1003",
    fullName: "Nethmi Fernando",
    jobTitle: "Senior Frontend Engineer",
    department: "Engineering",
    role: "Team Lead",
    email: "nethmi.f@upbright.com",
    phone: "+94 77 100 1003",
    location: "Colombo, LK",
    joiningDate: "2019-06-10",
    employmentType: "Full-time",
    reportsTo: "1002",
    status: "Active",
    bio: "Leads the web platform team and owns the design system implementation.",
    image: avatarFor("Nethmi Fernando"),
  },
  {
    employeeId: "1004",
    fullName: "Kasun Jayasuriya",
    jobTitle: "Backend Engineer",
    department: "Engineering",
    role: "Individual Contributor",
    email: "kasun.j@upbright.com",
    phone: "+94 77 100 1004",
    location: "Kandy, LK",
    joiningDate: "2021-02-22",
    employmentType: "Full-time",
    reportsTo: "1002",
    status: "Active",
    bio: "Builds and maintains core API services and internal tooling.",
    image: avatarFor("Kasun Jayasuriya"),
  },
  {
    employeeId: "1005",
    fullName: "Sanduni Rathnayake",
    jobTitle: "QA Engineer",
    department: "Engineering",
    role: "Individual Contributor",
    email: "sanduni.r@upbright.com",
    phone: "+94 77 100 1005",
    location: "Colombo, LK",
    joiningDate: "2022-04-18",
    employmentType: "Full-time",
    reportsTo: "1002",
    status: "Active",
    bio: "Owns test automation and release quality across the product suite.",
    image: avatarFor("Sanduni Rathnayake"),
  },
  {
    employeeId: "2001",
    fullName: "Ruwan Gunawardena",
    jobTitle: "Head of Product",
    department: "Product",
    role: "Director",
    email: "ruwan.g@upbright.com",
    phone: "+94 77 200 2001",
    location: "Colombo, LK",
    joiningDate: "2019-01-09",
    employmentType: "Full-time",
    reportsTo: "1001",
    status: "Active",
    bio: "Sets product strategy and roadmap priorities company-wide.",
    image: avatarFor("Ruwan Gunawardena"),
  },
  {
    employeeId: "2002",
    fullName: "Hiruni Silva",
    jobTitle: "Product Manager",
    department: "Product",
    role: "Individual Contributor",
    email: "hiruni.s@upbright.com",
    phone: "+94 77 200 2002",
    location: "Colombo, LK",
    joiningDate: "2020-08-03",
    employmentType: "Full-time",
    reportsTo: "2001",
    status: "Active",
    bio: "Manages the roadmap for the employee experience product line.",
    image: avatarFor("Hiruni Silva"),
  },
  {
    employeeId: "3001",
    fullName: "Tharindu Karunaratne",
    jobTitle: "Lead Product Designer",
    department: "Design",
    role: "Team Lead",
    email: "tharindu.k@upbright.com",
    phone: "+94 77 300 3001",
    location: "Colombo, LK",
    joiningDate: "2019-11-12",
    employmentType: "Full-time",
    reportsTo: "2001",
    status: "Active",
    bio: "Leads the design team and maintains the UPBRIGHT visual identity.",
    image: avatarFor("Tharindu Karunaratne"),
  },
  {
    employeeId: "3002",
    fullName: "Amaya de Silva",
    jobTitle: "UI/UX Designer",
    department: "Design",
    role: "Individual Contributor",
    email: "amaya.d@upbright.com",
    phone: "+94 77 300 3002",
    location: "Galle, LK",
    joiningDate: "2022-01-17",
    employmentType: "Full-time",
    reportsTo: "3001",
    status: "Active",
    bio: "Designs interfaces for internal tools and customer-facing products.",
    image: avatarFor("Amaya de Silva"),
  },
  {
    employeeId: "4001",
    fullName: "Chamara Bandara",
    jobTitle: "Marketing Manager",
    department: "Marketing",
    role: "Team Lead",
    email: "chamara.b@upbright.com",
    phone: "+94 77 400 4001",
    location: "Colombo, LK",
    joiningDate: "2020-05-25",
    employmentType: "Full-time",
    reportsTo: "1001",
    status: "Active",
    bio: "Runs brand, campaigns, and communications for UPBRIGHT.",
    image: avatarFor("Chamara Bandara"),
  },
  {
    employeeId: "4002",
    fullName: "Yashodha Peris",
    jobTitle: "Content Strategist",
    department: "Marketing",
    role: "Individual Contributor",
    email: "yashodha.p@upbright.com",
    phone: "+94 77 400 4002",
    location: "Colombo, LK",
    joiningDate: "2023-02-06",
    employmentType: "Full-time",
    reportsTo: "4001",
    status: "Active",
    bio: "Plans and writes content across web, social, and product marketing.",
    image: avatarFor("Yashodha Peris"),
  },
  {
    employeeId: "5001",
    fullName: "Lakshan Wijesinghe",
    jobTitle: "Sales Director",
    department: "Sales",
    role: "Director",
    email: "lakshan.w@upbright.com",
    phone: "+94 77 500 5001",
    location: "Colombo, LK",
    joiningDate: "2018-09-14",
    employmentType: "Full-time",
    reportsTo: "1001",
    status: "Active",
    bio: "Leads the sales organization and enterprise account strategy.",
    image: avatarFor("Lakshan Wijesinghe"),
  },
  {
    employeeId: "5002",
    fullName: "Poornima Abeywickrama",
    jobTitle: "Account Executive",
    department: "Sales",
    role: "Individual Contributor",
    email: "poornima.a@upbright.com",
    phone: "+94 77 500 5002",
    location: "Kandy, LK",
    joiningDate: "2021-07-19",
    employmentType: "Full-time",
    reportsTo: "5001",
    status: "Active",
    bio: "Manages new business relationships across the central region.",
    image: avatarFor("Poornima Abeywickrama"),
  },
  {
    employeeId: "6001",
    fullName: "Isuru Madushanka",
    jobTitle: "Customer Success Manager",
    department: "Customer Success",
    role: "Team Lead",
    email: "isuru.m@upbright.com",
    phone: "+94 77 600 6001",
    location: "Colombo, LK",
    joiningDate: "2020-10-05",
    employmentType: "Full-time",
    reportsTo: "1001",
    status: "Active",
    bio: "Ensures customers get lasting value from the UPBRIGHT platform.",
    image: avatarFor("Isuru Madushanka"),
  },
  {
    employeeId: "7001",
    fullName: "Dilani Ekanayake",
    jobTitle: "HR Business Partner",
    department: "Human Resources",
    role: "Team Lead",
    email: "dilani.e@upbright.com",
    phone: "+94 77 700 7001",
    location: "Colombo, LK",
    joiningDate: "2019-04-29",
    employmentType: "Full-time",
    reportsTo: "1001",
    status: "Active",
    bio: "Manages hiring, onboarding, and employee relations company-wide.",
    image: avatarFor("Dilani Ekanayake"),
  },
  {
    employeeId: "7002",
    fullName: "Nuwan Senanayake",
    jobTitle: "Talent Acquisition Specialist",
    department: "Human Resources",
    role: "Individual Contributor",
    email: "nuwan.s@upbright.com",
    phone: "+94 77 700 7002",
    location: "Colombo, LK",
    joiningDate: "2023-06-01",
    employmentType: "Full-time",
    reportsTo: "7001",
    status: "Active",
    bio: "Sources and recruits new talent across engineering and product.",
    image: avatarFor("Nuwan Senanayake"),
  },
  {
    employeeId: "8001",
    fullName: "Anjali Rajapaksha",
    jobTitle: "Finance Manager",
    department: "Finance",
    role: "Team Lead",
    email: "anjali.r@upbright.com",
    phone: "+94 77 800 8001",
    location: "Colombo, LK",
    joiningDate: "2018-12-03",
    employmentType: "Full-time",
    reportsTo: "1001",
    status: "Active",
    bio: "Oversees budgeting, payroll, and financial reporting.",
    image: avatarFor("Anjali Rajapaksha"),
  },
  {
    employeeId: "9001",
    fullName: "Malith Gamage",
    jobTitle: "Operations Coordinator",
    department: "Operations",
    role: "Individual Contributor",
    email: "malith.g@upbright.com",
    phone: "+94 77 900 9001",
    location: "Colombo, LK",
    joiningDate: "2022-09-12",
    employmentType: "Full-time",
    reportsTo: "1001",
    status: "Active",
    bio: "Keeps day-to-day office and facilities operations running smoothly.",
    image: avatarFor("Malith Gamage"),
  },
  {
    employeeId: "9501",
    fullName: "Roshini Jayawardena",
    jobTitle: "Legal Counsel",
    department: "Legal",
    role: "Individual Contributor",
    email: "roshini.j@upbright.com",
    phone: "+94 77 950 9501",
    location: "Colombo, LK",
    joiningDate: "2021-03-15",
    employmentType: "Full-time",
    reportsTo: "1001",
    status: "Active",
    bio: "Handles contracts, compliance, and corporate legal matters.",
    image: avatarFor("Roshini Jayawardena"),
  },
];

/** Return every employee record, optionally filtered by search text and/or department. */
export function getAllEmployees({
  query = "",
  department = "All",
}: GetAllEmployeesOptions = {}): Employee[] {
  const q = query.trim().toLowerCase();
  return EMPLOYEES.filter((emp) => {
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
}

/** Look up a single employee by their employee ID (the URL / QR-code identifier). */
export function getEmployeeById(employeeId?: string | null): Employee | null {
  if (!employeeId) return null;
  return EMPLOYEES.find((emp) => emp.employeeId === String(employeeId)) ?? null;
}

/** Direct reports for org-chart style display on a profile page. */
export function getDirectReports(employeeId: string): Employee[] {
  return EMPLOYEES.filter((emp) => emp.reportsTo === String(employeeId));
}

/** Manager record for a given employee, if any. */
export function getManager(employee: Employee | null): Employee | null {
  if (!employee?.reportsTo) return null;
  return getEmployeeById(employee.reportsTo);
}

export function getAllEmployeeIds(): string[] {
  return EMPLOYEES.map((emp) => emp.employeeId);
}

export function getDepartmentCounts(): Record<string, number> {
  const counts: Record<string, number> = { All: EMPLOYEES.length };
  for (const dept of DEPARTMENTS) {
    counts[dept] = EMPLOYEES.filter((e) => e.department === dept).length;
  }
  return counts;
}
