
import { QRCodeCanvas } from "qrcode.react";
import { createRoot } from 'react-dom/client';

export const generateQRCodeCanvas = (data: string) => {
  const canvas = document.createElement("canvas");
  const root = createRoot(canvas);
  root.render(
    <QRCodeCanvas
      value={data}
      size={128}
      level="H"
    />
  );
  return canvas.toDataURL();
};
