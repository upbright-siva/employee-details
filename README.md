# UPBRIGHT Employee Directory

A Next.js (App Router) + TypeScript employee directory and profile-verification site for UPBRIGHT.

## What's included

- **Homepage** (`app/page.tsx`) — searchable, filterable employee directory grid.
- **Dynamic profile pages** (`app/[employeeId]/page.tsx`) — `/{employeeId}` (e.g. `/1001`), statically generated for every employee at build time, with a per-employee QR code, SEO metadata, and Open Graph tags.
- **Employee Not Found page** (`app/not-found.tsx`) — shown for any invalid/unknown employee ID.
- **Centralized, typed data layer** (`lib/employees.ts`) — exports an `Employee` interface plus 20 sample employees across 10 departments; add/edit records here (see below).
- **Reusable, typed components** (`components/`) — `Navbar`, `Footer`, `Logo`, `EmployeeCard`, `EmployeeDirectory`, `EmployeeBadge`, `EmployeeQRCode`, `InfoField`, `DepartmentTag`, all `.tsx` with typed props.
- Fully responsive, brand-themed UI (green gradient sampled from the UPBRIGHT logo — see `app/globals.css`).

## Adding / updating employees

Open `lib/employees.ts` and add an object to the `EMPLOYEES` array (typed as `Employee[]`):

```ts
{
  employeeId: "1021",              // must be unique — becomes the URL /1021 and the QR code payload
  fullName: "Jane Doe",
  jobTitle: "Software Engineer",
  department: "Engineering",       // should match an entry in DEPARTMENTS
  role: "Individual Contributor",
  email: "jane.doe@upbright.com",
  phone: "+94 77 000 0000",
  location: "Colombo, LK",
  joiningDate: "2026-01-05",       // YYYY-MM-DD
  employmentType: "Full-time",
  reportsTo: "1002",               // employeeId of manager, or null
  status: "Active",
  bio: "One or two sentences about the role.",
  image: avatarFor("Jane Doe"),    // or a direct photo URL
}
```

TypeScript will flag any missing/mistyped field against the `Employee`
interface at the top of `lib/employees.ts`, so typos get caught before you
even run the app.

No other file needs to change — the homepage grid, search, filters, and the
employee's profile page at `/1021` will all pick it up automatically. When
you deploy again, Next.js will pre-render a static page for the new ID.

This array-based approach is a drop-in stand-in for a real database. To move
to Postgres/MySQL/an HR API later, only the function bodies in
`lib/employees.ts` (`getAllEmployees`, `getEmployeeById`, etc.) need to
change — every component already calls through those functions and the
`Employee` type.

## Brand assets

The real UPBRIGHT logo is already wired in:

- `public/logo.png` — the wordmark (icon + "UPBRIGHT" text), background
  removed so it drops cleanly onto the white navbar/footer. Used by
  `components/Logo.jsx`.
- `app/icon.png` / `app/apple-icon.png` — the circular icon mark, used by
  Next.js to auto-generate the site favicon and Apple touch icon.

The color tokens in `app/globals.css` (`--ub-brand-*`, `--ub-accent-*`) were
sampled directly from the logo's green gradient, so any new UI you add
stays on-brand automatically as long as it uses those tokens (`bg-brand-900`,
`text-accent-600`, etc.) instead of hardcoded hex values.

To update the logo later, replace `public/logo.png` / `app/icon.png` with
new files of the same name — no component code needs to change.

## Local development

```bash
npm install
npm run dev        # start dev server
npm run typecheck  # run TypeScript's type checker
npm run lint        # run ESLint
```

Visit `http://localhost:3000`.

## Deploying to Vercel

**Option A — Vercel CLI**

```bash
npm i -g vercel
vercel        # first deploy, follow the prompts
vercel --prod # promote to production
```

**Option B — GitHub + Vercel dashboard**

1. Push this project to a GitHub repository.
2. Go to vercel.com/new and import the repo.
3. Framework preset "Next.js" is auto-detected — no config needed.
4. Click Deploy.

**After your first deploy**, go to your Vercel project → Settings →
Environment Variables and add:

```
NEXT_PUBLIC_SITE_URL = https://your-actual-domain.vercel.app
```

then redeploy. This makes the QR codes and social preview links point at
your real, live domain instead of the Vercel-generated fallback.

## QR codes for ID badges

Every profile page has a stable, unique URL: `https://your-domain/{employeeId}`.
The profile page itself renders a QR code encoding that exact URL — you can
screenshot/export it from the page, or point any QR generator at the same
URL when producing physical ID cards.
