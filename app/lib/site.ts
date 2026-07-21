// Central place for the deployed site URL, used to build absolute profile
// links and the QR code payload on each employee page.
//
// Set NEXT_PUBLIC_SITE_URL in your Vercel project's Environment Variables
// once you know your domain, e.g. https://directory.upbright.com
// Falls back to Vercel's automatic URL, then to localhost during development.
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://www.upbright.ai/employee";
}

export const SITE_NAME = "UPBRIGHT Employee Directory";
