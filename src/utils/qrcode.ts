
import { QRCodeCanvas } from "qrcode.react";
import React from "react";

export const generateQRCodeCanvas = (data: string) => {
  const canvas = document.createElement("canvas");
  React.render(
    React.createElement(QRCodeCanvas, {
      value: data,
      size: 128,
      level: "H",
    }),
    canvas
  );
  return canvas.toDataURL();
};
