
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
          setIsScanning(false);
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
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold">Scanner QR Code</h1>

      <Card className="overflow-hidden border-2">
        <CardContent className="p-0">
          {isScanning ? (
            <div className="relative">
              <Webcam
                ref={webcamRef}
                className="w-full"
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  facingMode: "environment",
                  width: { ideal: 1280 },
                  height: { ideal: 720 }
                }}
              />
              <div className="absolute inset-0 border-[3px] border-dashed border-primary/50 m-8 rounded-lg"></div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/75 text-white px-4 py-2 rounded-full text-sm">
                Placez le QR code dans le cadre
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-gray-100 flex flex-col items-center justify-center p-8 text-center">
              <Camera className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-lg text-gray-500 font-medium">
                Cliquez sur "Démarrer le scan" pour commencer
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Assurez-vous que le QR code est bien éclairé et centré
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="fixed bottom-6 left-0 right-0 flex justify-center px-4">
        <Button
          size="lg"
          variant={isScanning ? "destructive" : "default"}
          onClick={() => setIsScanning(!isScanning)}
          className="px-8 py-6 text-lg shadow-lg"
        >
          {isScanning ? (
            <>
              <X className="w-6 h-6 mr-2" />
              Arrêter le scan
            </>
          ) : (
            <>
              <Camera className="w-6 h-6 mr-2" />
              Scanner
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ScanQR;
