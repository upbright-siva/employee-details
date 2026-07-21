import QRCode from "qrcode";

interface DownloadEmployeeQrOptions {
  url: string;
  employeeId: string;
  fullName: string;
}

// Turns spaces/punctuation in a name into a filesystem-safe slug,
// e.g. "Sivakkanth Karunakaran" -> "Sivakkanth-Karunakaran".
function slugify(value: string): string {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Renders a QR code with the employee's name and ID printed underneath it
 * onto a single canvas, then triggers a PNG download named "id_name".
 */
export async function downloadEmployeeQr({
  url,
  employeeId,
  fullName,
}: DownloadEmployeeQrOptions): Promise<void> {
  const qrSize = 480;
  const padding = 32;
  const textBlockHeight = 96;

  // 1. Render the QR code onto its own canvas.
  const qrCanvas = document.createElement("canvas");
  await QRCode.toCanvas(qrCanvas, url, {
    width: qrSize,
    margin: 1,
    color: {
      dark: "#0B1E3F",
      light: "#FFFFFF",
    },
  });

  // 2. Compose QR + name + ID onto a taller canvas.
  const canvas = document.createElement("canvas");
  canvas.width = qrSize + padding * 2;
  canvas.height = qrSize + padding * 2 + textBlockHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context is not available");

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(qrCanvas, padding, padding, qrSize, qrSize);

  const textY = padding + qrSize + 40;
  ctx.textAlign = "center";
  ctx.fillStyle = "#0B1E3F";
  ctx.font = "700 24px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText(fullName, canvas.width / 2, textY);

  ctx.fillStyle = "#64748B";
  ctx.font = "500 18px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText(`ID ${employeeId}`, canvas.width / 2, textY + 30);

  // 3. Trigger the download as "id_name.png".
  const fileName = `${employeeId}_${slugify(fullName)}.png`;
  const dataUrl = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}