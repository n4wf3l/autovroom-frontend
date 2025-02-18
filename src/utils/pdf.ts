
import { jsPDF } from "jspdf";
import { generateQRCodeCanvas } from "./qrcode";

export interface ProductData {
  photo: string;
  brand: string;
  model: string;
  year: string;
  engineType: string;
  partName: string;
  chassisNumber: string;
  referenceNumber: string;
  quantity: number;
  category: string;
  id: string;
}

export const generatePDF = (productData: ProductData) => {
  const doc = new jsPDF({
    format: [50, 30],
    unit: "mm",
  });
  
  const qrCodeDataUrl = generateQRCodeCanvas(JSON.stringify(productData));
  doc.addImage(qrCodeDataUrl, "PNG", 5, 2, 20, 20);
  doc.setFontSize(8);
  doc.text(productData.partName, 27, 8);
  doc.text(`${productData.brand} ${productData.model}`, 27, 12);
  doc.text(`Réf: ${productData.referenceNumber}`, 27, 16);
  
  doc.save(`label-${productData.referenceNumber}.pdf`);
};
