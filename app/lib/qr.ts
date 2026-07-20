import QRCode from "qrcode";

interface DownloadQrOptions {
  url: string;
  employeeId: string;
  size?: number;
}

/**
 * Generates a QR code PNG for the given URL and triggers a browser download,
 * without ever rendering the code on screen. Used for the quick "download"
 * action on directory cards, and reused by the visible QR on profile pages.
 */
export async function downloadEmployeeQr({
  url,
  employeeId,
  size = 512,
}: DownloadQrOptions): Promise<void> {
  const dataUrl = await QRCode.toDataURL(url, {
    width: size,
    margin: 2,
    color: {
      dark: "#0b331f",
      light: "#ffffff",
    },
  });

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `upbright-${employeeId}-qr.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
