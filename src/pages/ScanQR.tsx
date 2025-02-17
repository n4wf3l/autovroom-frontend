
import { useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, X } from "lucide-react";

const ScanQR = () => {
  const [isScanning, setIsScanning] = useState(false);

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
              <Webcam className="rounded-lg w-full" />
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
