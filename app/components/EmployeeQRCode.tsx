import { QRCodeSVG } from "qrcode.react";

interface EmployeeQRCodeProps {
  url: string;
  employeeId: string;
}

export default function EmployeeQRCode({ url, employeeId }: EmployeeQRCodeProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg bg-white p-3">
      <QRCodeSVG
        value={url}
        size={112}
        bgColor="#ffffff"
        fgColor="#0b331f"
        level="M"
        includeMargin={false}
      />
      <p className="font-id text-center text-[10px] leading-tight text-slate-500">
        Scan to verify
        <br />
        ID {employeeId}
      </p>
    </div>
  );
}
