
import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsQR from "jsqr";

const ScanQR = () => {
  const [isScanning, setIsScanning] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const { toast } = useToast();
  const scanIntervalRef = useRef<number>();

  const processImage = (imageSrc: string) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
          toast({
            title: "QR Code détecté",
            description: "Les informations ont été récupérées avec succès.",
          });
          console.log("QR Code content:", code.data);
          setIsScanning(false); // Arrêter le scan une fois un QR code détecté
          clearInterval(scanIntervalRef.current);
        }
      }
    };
  };

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        processImage(imageSrc);
      }
    }
  };

  useEffect(() => {
    if (isScanning) {
      scanIntervalRef.current = window.setInterval(capture, 500);
      return () => {
        if (scanIntervalRef.current) {
          clearInterval(scanIntervalRef.current);
        }
      };
    }
  }, [isScanning]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Scanner QR</h1>
        <Button
          variant={isScanning ? "destructive" : "default"}
          onClick={() => setIsScanning(!isScanning)}
        >
          {isScanning ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Arrêter
            </>
          ) : (
            <>
              <Camera className="w-4 h-4 mr-2" />
              Scanner
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          {isScanning ? (
            <div className="aspect-video relative">
              <Webcam
                ref={webcamRef}
                className="rounded-lg w-full"
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  facingMode: "environment",
                  width: { ideal: 1280 },
                  height: { ideal: 720 }
                }}
              />
            </div>
          ) : (
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">
                Cliquez sur Scanner pour commencer
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScanQR;
