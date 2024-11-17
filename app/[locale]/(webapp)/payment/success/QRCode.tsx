"use client";

import { WX_QRCODE } from "@/lib/constant";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";

export const QRCode = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      setImgSrc(canvasRef.current.toDataURL());
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-center">扫描下方二维码，添加我的微信</p>
      <div className="w-48 h-48 relative bg-gray-200 flex items-center justify-center mb-4">
        {imgSrc && (
          <Image
            src={imgSrc}
            width={192}
            height={192}
            className="w-48 h-48"
            alt="微信二维码"
          />
        )}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white flex items-center justify-center">
          <Image src="/icon.png" width={32} height={32} alt="Logo" />
        </div>
        <QRCodeCanvas
          value={WX_QRCODE}
          size={192}
          ref={canvasRef}
          className="hidden"
        />
      </div>
      <p className="text-sm text-gray-500 text-center">
        如有任何问题，请随时与我联系
      </p>
    </div>
  );
};
