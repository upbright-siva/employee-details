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
  "PIO",
  "Finance",
  "Media",
  "Academic",
  "UA",
  "Human Resources",
  "Management"
];

export const EMPLOYEES: Employee[] = [
  {
    employeeId: "001",
    fullName: "Mohamed Faiz Mohamed Asfar",
    jobTitle: "CEO",
    department: "Management",
    role: "CEO",
    email: "ceo@upbright.ai",
    phone: "+94 76 938 4934",
    location: "UPBRIGHT PVT LTD",
    joiningDate: "2020-08-25",
    employmentType: "Full-time",
    reportsTo: null,
    status: "Active",
    bio: "Leads company strategy and long-term vision across all business units.",
    image: "https://ezycourse.b-cdn.net/6126/cmrua2cnr585vluqqd230fxbn.jpeg",
  },
  {
    employeeId: "002",
    fullName: "Moahamed Zarook Mohamed Asaam",
    jobTitle: "CTO",
    department: "Management",
    role: "CTO",
    email: "cto@upbright.ai",
    phone: "+94 77 752 4393",
    location: "UPBRIGHT PVT LTD",
    joiningDate: "2020-08-25",
    employmentType: "Full-time",
    reportsTo: "",
    status: "Active",
    bio: "Oversees platform architecture and the engineering organization.",
    image: avatarFor("Dinuka Wickramasinghe"),
  },
  {
    employeeId: "003",
    fullName: "Nilawfer Mohamed Niflal",
    jobTitle: "UA Head",
    department: "UA",
    role: "UA Head",
    email: "niflal2644@gmail.com",
    phone: "+94 76 726 7176",
    location: "UPBRIGHT PVT LTD",
    joiningDate: "2021-08-01",
    employmentType: "Full-time",
    reportsTo: "",
    status: "Active",
    bio: "Leads the web platform team and owns the design system implementation.",
    image: "https://ezycourse.b-cdn.net/6126/cmrubfma16szay1phetzlc83k.jpeg",
  },
  {
    employeeId: "004",
    fullName: "Mohamed Salman",
    jobTitle: "Academic Administrator",
    department: "Academic",
    role: "Academic Administrator",
    email: "Thesalman.vision@gmail.com",
    phone: "+94 72 288 9817",
    location: "UPBRIGHT PVT LTD",
    joiningDate: "2024-04-20",
    employmentType: "Full-time",
    reportsTo: "",
    status: "Active",
    bio: "Builds and maintains core API services and internal tooling.",
    image: avatarFor("Mohamed Salman"),
  },
  {
    employeeId: "005",
    fullName: "Saraniya Kopalan",
    jobTitle: "Upbright Advisor",
    department: "UA",
    role: "Upbright Advisor",
    email: "saraniyakopalan30@gmail.com",
    phone: "+94 75 722 7429",
    location: "UPBRIGHT PVT LTD",
    joiningDate: "2025-01-24",
    employmentType: "Full-time",
    reportsTo: "",
    status: "Active",
    bio: "Owns test automation and release quality across the product suite.",
    image: avatarFor("Saraniya Kopalan"),
  },
  {
    employeeId: "006",
    fullName: "Sathikeen Fathima Afra",
    jobTitle: "Upbright Advisor",
    department: "UA",
    role: "Upbright Advisor",
    email: "afrahms2002@gmail.com",
    phone: "+94 75 201 5303",
    location: "UPBRIGHT PVT LTD",
    joiningDate: "2025-02-08",
    employmentType: "Full-time",
    reportsTo: "",
    status: "Active",
    bio: "Sets product strategy and roadmap priorities company-wide.",
    image: "https://ezycourse.b-cdn.net/6126/cmrubdmyf6rpsy1ph71di17kq.jpg",
  },
  {
    employeeId: "007",
    fullName: "Mohamed Muzammil Farha",
    jobTitle: "Social Media Manager",
    department: "Media",
    role: "Social Media Manager",
    email: "muzammilfarha54@gmail.com",
    phone: "+94 75 795 9889",
    location: "UPBRIGHT PVT LTD",
    joiningDate: "2020-08-03",
    employmentType: "Full-time",
    reportsTo: "",
    status: "Active",
    bio: "Manages the roadmap for the employee experience product line.",
    image: avatarFor("Mohamed Muzammil Farha"),
  },
  {
    employeeId: "008",
    fullName: "Balachandran vithushalini",
    jobTitle: "Upbright Advisor",
    department: "UA",
    role: "Upbright Advisor",
    email: "vithuupbright@gmail.com",
    phone: "+94 72 170 2201",
    location: "UPBRIGHT PVT LTD",
    joiningDate: "2025-05-05",
    employmentType: "Full-time",
    reportsTo: "",
    status: "Active",
    bio: "Leads the design team and maintains the UPBRIGHT visual identity.",
    image: avatarFor("Balachandran vithushalini"),
  },
  {
    employeeId: "009",
    fullName: "Abdul Kader Moahmmed Zaheer",
    jobTitle: "Upbright Advisor",
    department: "UA",
    role: "Upbright Advisor",
    email: "saheerarsha1925@gmail.com",
    phone: "+94 75 587 9854",
    location: "UPBRIGHT PVT LTD",
    joiningDate: "2025-07-04",
    employmentType: "Full-time",
    reportsTo: "",
    status: "Active",
    bio: "Designs interfaces for internal tools and customer-facing products.",
    image: avatarFor("Abdul Kader Moahmmed Zaheer"),
  },
  {
    employeeId: "010",
    fullName: "Jiffry Mohamed Afrith",
    jobTitle: "Social Media Manager",
    department: "Media",
    role: "Social Media Manager",
    email: "afrithkd25@gmail.com",
    phone: "+94 75 043 8477",
    location: "UPBRIGHT PVT LTD",
    joiningDate: "2025-10-29",
    employmentType: "Full-time",
    reportsTo: "",
    status: "Active",
    bio: "Runs brand, campaigns, and communications for UPBRIGHT.",
    image: avatarFor("Jiffry Mohamed Afrith"),
  },
  {
    employeeId: "011",
    fullName: "NAzeer Fathima Safna",
    jobTitle: "Academic Coordinator",
    department: "Academic",
    role: "Coordinator",
    email: "hellosaf03@gmail.com",
    phone: "+94 76 492 8111",
    location: "UPBRIGHT PVT LTD",
    joiningDate: "2025-11-24",
    employmentType: "Full-time",
    reportsTo: "",
    status: "Active",
    bio: "Plans and writes content across web, social, and product marketing.",
    image: "https://ezycourse.b-cdn.net/6126/cmru7duwt2r0exiph01ym666d.jpeg",
  },
  {
    employeeId: "012",
    fullName: "Mohamed Jawfer Fayarusa",
    jobTitle: "Accountant",
    department: "Finance",
    role: "Accountant",
    email: "fayarusa92@gmail.com",
    phone: "+94 75 413 2656",
    location: "UPBRIGHT PVT LTD",
    joiningDate: "2025-11-24",
    employmentType: "Full-time",
    reportsTo: "",
    status: "Active",
    bio: "Leads the sales organization and enterprise account strategy.",
    image: "https://ezycourse.b-cdn.net/6126/cmru7e8zg2vipmuqqfxnlhzz3.jpeg",
  },
  {
    employeeId: "013",
    fullName: "Sivakkanth Karunakaran",
    jobTitle: "Developer",
    department: "PIO",
    role: "Developer",
    email: "sivakkanthupbright@gmail.com",
    phone: "+94 77 356 4988",
    location: "UPBRIGHT PVT LTD",
    joiningDate: "2026-02-05",
    employmentType: "Full-time",
    reportsTo: "",
    status: "Active",
    bio: "Leads the web platform team and owns the design system implementation.",
    image: "https://ezycourse.b-cdn.net/6126/cmru7np9w33xqluqq77pacoal.png",
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
