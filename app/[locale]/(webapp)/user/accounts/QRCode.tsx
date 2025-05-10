"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";
import { WX_QRCODE } from "@/lib/constant";
import { Separator } from "@/components/ui/separator";

// 客服微信二维码组件
export const QRCode = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const t = useTranslations("Database");

  useEffect(() => {
    if (canvasRef.current) {
      setImgSrc(canvasRef.current.toDataURL());
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="space-y-2 text-center mb-4">
        <h2 className="text-xl font-bold">绑定成功</h2>
        <p className="text-muted-foreground">
          您已成功绑定数据库，感谢您的使用!
        </p>
      </div>
      <Separator className="max-w-sm mb-6" />
      <p className="mb-4 text-center">{t("scanQRCode")}</p>
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
      <p className="text-sm text-gray-500 text-center">{t("contactSupport")}</p>
    </div>
  );
};
