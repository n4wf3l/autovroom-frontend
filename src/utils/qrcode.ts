
import { QRCodeCanvas } from "qrcode.react";

export const generateQRCodeCanvas = (data: string) => {
  const canvas = document.createElement("canvas");
  QRCodeCanvas({
    value: data,
    size: 128,
    level: "H",
  });
  return canvas.toDataURL();
};
