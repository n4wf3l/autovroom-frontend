
import { QRCodeCanvas } from "qrcode.react";
import { createRoot } from 'react-dom/client';

export const generateQRCodeCanvas = (data: string) => {
  // Créer un canvas temporaire
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  
  // Créer une racine React temporaire
  const root = createRoot(canvas);
  
  // Rendre le QR code
  root.render(<QRCodeCanvas value={data} size={128} level="H" />);
  
  // Attendre que le rendu soit terminé
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      const dataUrl = canvas.toDataURL();
      root.unmount(); // Nettoyer la racine React
      resolve(dataUrl);
    }, 100);
  });
};
