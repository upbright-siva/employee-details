import Image from "next/image";

interface LogoProps {
  className?: string;
}

// The real UPBRIGHT wordmark, exported with a transparent background so it
// sits cleanly on any surface. Source file: public/logo.png.
export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/logo.png"
        alt="UPBRIGHT"
        width={150}
        height={48}
        priority
        className="h-8 w-auto"
      />
    </span>
  );
}
